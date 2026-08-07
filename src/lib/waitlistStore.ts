import { promises as fs } from "fs";
import path from "path";
import type { WaitlistInput } from "./waitlistSchema";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

// Founding members start at this base so the counter feels alive from day one.
const BASE_COUNT = 127;
const CAP = 500;

type Entry = WaitlistInput & { createdAt: string };

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAll(): Promise<Entry[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function hasGoogleSheets() {
  return Boolean(process.env.GOOGLE_SHEETS_WEBAPP_URL);
}

async function saveToGoogleSheets(entry: Entry) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL as string;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: entry.firstName,
      email: entry.email,
      phone: entry.phone,
      hairGoal: entry.hairGoal,
      source: entry.source ?? "",
      createdAt: entry.createdAt,
      secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Sheets webhook failed: ${res.status} ${body}`);
  }
}

async function saveToSupabase(entry: Entry) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/waitlist`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      first_name: entry.firstName,
      email: entry.email,
      phone: entry.phone,
      hair_goal: entry.hairGoal,
      consent: entry.consent,
      source: entry.source ?? null,
      created_at: entry.createdAt,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${body}`);
  }
}

export async function addToWaitlist(input: WaitlistInput) {
  const entry: Entry = { ...input, createdAt: new Date().toISOString() };

  // Google Sheets is the primary lead destination (feeds rituelluxury@gmail.com's sheet).
  if (hasGoogleSheets()) {
    await saveToGoogleSheets(entry);
  }

  if (hasSupabase()) {
    await saveToSupabase(entry);
  } else {
    // Local mirror also powers the founding-member counter when Supabase isn't configured.
    const all = await readAll();
    all.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  }

  return entry;
}

export async function getFoundingMemberCount(): Promise<{ count: number; cap: number }> {
  if (hasSupabase()) {
    const url = `${process.env.SUPABASE_URL}/rest/v1/waitlist?select=id`;
    try {
      const res = await fetch(url, {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: "count=exact",
        },
        cache: "no-store",
      });
      const range = res.headers.get("content-range");
      const total = range ? Number(range.split("/")[1]) : 0;
      return { count: Math.min(BASE_COUNT + total, CAP), cap: CAP };
    } catch {
      return { count: BASE_COUNT, cap: CAP };
    }
  }
  const all = await readAll();
  return { count: Math.min(BASE_COUNT + all.length, CAP), cap: CAP };
}
