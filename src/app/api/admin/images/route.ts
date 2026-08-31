import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "images.json");

export async function GET() {
  try { return NextResponse.json(JSON.parse(readFileSync(dataFile, "utf-8"))); }
  catch { return NextResponse.json({}); }
}

export async function POST(request: Request) {
  try { writeFileSync(dataFile, JSON.stringify(await request.json(), null, 2)); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Failed to save" }, { status: 500 }); }
}
