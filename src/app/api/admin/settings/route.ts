import { NextResponse } from "next/server";
import { getSettings, saveJsonData } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = getSettings();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const success = saveJsonData("settings.json", body);
    if (!success) {
      return NextResponse.json({ error: "Failed to write file" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
