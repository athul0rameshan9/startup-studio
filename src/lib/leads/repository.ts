import "server-only";

import { randomUUID } from "node:crypto";

import {
  leadsFileSchema,
  type Lead,
  type LeadInput,
  type LeadStatus,
} from "@/lib/leads/schema";
import { readJson, writeJson } from "@/lib/storage/json-store";

const LEADS_FILE = "leads.json";

async function readAll(): Promise<Lead[]> {
  const stored = await readJson<unknown>(LEADS_FILE);
  if (!stored) return [];

  const parsed = leadsFileSchema.safeParse(stored);
  if (parsed.success) return parsed.data;

  console.error("[leads] leads.json failed validation — treating it as empty.");
  return [];
}

/** Newest first. */
export async function listLeads(): Promise<Lead[]> {
  const leads = await readAll();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function countLeadsByStatus(): Promise<Record<LeadStatus, number>> {
  const counts: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    won: 0,
    archived: 0,
  };
  for (const lead of await readAll()) counts[lead.status] += 1;
  return counts;
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    name: input.name,
    business: input.business ?? "",
    contact: input.contact ?? "",
    budget: input.budget ?? "",
    timeline: input.timeline ?? "",
    message: input.message,
  };

  const leads = await readAll();
  leads.push(lead);
  await writeJson(LEADS_FILE, leads);
  return lead;
}

export async function setLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const leads = await readAll();
  const lead = leads.find((entry) => entry.id === id);
  if (!lead) return false;

  lead.status = status;
  await writeJson(LEADS_FILE, leads);
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await readAll();
  const next = leads.filter((entry) => entry.id !== id);
  if (next.length === leads.length) return false;

  await writeJson(LEADS_FILE, next);
  return true;
}
