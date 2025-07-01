import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let rows;

    if (type) {
      [rows] = await db.query(
        "SELECT DISTINCT brand FROM partlist WHERE type = ?",
        [type]
      );
    } else {
      [rows] = await db.query("SELECT DISTINCT brand FROM partlist");
    }

    const data = (rows as { brand: string }[]).map((row) => {
      const value = row.brand.trim();
      
      return { key: value, label: value };
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}