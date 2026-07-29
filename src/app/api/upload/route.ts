import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { getSession } from "@/lib/auth/session";

const MAX_BYTES = 5 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

/**
 * Admin-only image upload. Files are written to `public/uploads`, which means
 * this needs a writable filesystem — on a read-only/serverless host, point the
 * image fields at an external URL instead.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const extension = EXTENSIONS[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Use a PNG, JPEG, WebP, GIF or SVG image." },
      { status: 415 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "That file is larger than 5 MB." },
      { status: 413 },
    );
  }

  const fileName = `${randomUUID()}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads");

  try {
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, fileName),
      Buffer.from(await file.arrayBuffer()),
    );
  } catch (error) {
    console.error("[upload] Could not write the file:", error);
    return NextResponse.json(
      { error: "The server could not save that file." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
