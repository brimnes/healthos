import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db-health";

export async function GET() {
  try {
    const result = await checkDatabaseConnection();
    return NextResponse.json({ status: "ok", result });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown database error"
      },
      { status: 500 }
    );
  }
}
