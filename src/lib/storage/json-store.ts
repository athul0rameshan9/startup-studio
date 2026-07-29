import "server-only";

import { constants } from "node:fs";
import { access, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny JSON-file persistence layer.
 *
 * The site ships without a database on purpose: content and leads live in
 * `data/*.json` so the project runs anywhere with `npm start`. Everything goes
 * through this module, so swapping in Postgres/SQLite later means rewriting
 * the two repositories in `lib/content` and `lib/leads` and nothing else.
 */

export const DATA_DIR = path.join(process.cwd(), "data");

/** Serialises writes per file so two concurrent saves can't interleave. */
const writeQueues = new Map<string, Promise<unknown>>();

function resolve(fileName: string): string {
  const target = path.join(DATA_DIR, fileName);
  if (path.dirname(target) !== DATA_DIR) {
    throw new Error(`Refusing to touch a path outside the data dir: ${fileName}`);
  }
  return target;
}

async function ensureDataDir(): Promise<void> {
  try {
    await access(DATA_DIR, constants.F_OK);
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

/** Reads and parses a JSON file, returning `null` when it does not exist. */
export async function readJson<T>(fileName: string): Promise<T | null> {
  try {
    const raw = await readFile(resolve(fileName), "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return null;
    if (error instanceof SyntaxError) {
      console.error(`[json-store] ${fileName} is not valid JSON — ignoring it.`);
      return null;
    }
    throw error;
  }
}

/** Atomically writes a JSON file (temp file + rename), queued per file. */
export async function writeJson<T>(fileName: string, value: T): Promise<void> {
  const previous = writeQueues.get(fileName) ?? Promise.resolve();

  const next = previous
    .catch(() => undefined)
    .then(async () => {
      await ensureDataDir();
      const target = resolve(fileName);
      const temp = `${target}.${process.pid}.tmp`;
      await writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
      await rename(temp, target);
    });

  writeQueues.set(fileName, next);

  try {
    await next;
  } finally {
    if (writeQueues.get(fileName) === next) writeQueues.delete(fileName);
  }
}
