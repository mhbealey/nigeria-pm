import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0.0",
    name: "BuildNG API",
    timestamp: new Date().toISOString(),
  });
}
