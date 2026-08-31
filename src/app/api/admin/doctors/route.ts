import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "doctors.json");

export async function GET() {
  try {
    const data = readFileSync(dataFile, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    writeFileSync(dataFile, JSON.stringify(body, null, 2));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
