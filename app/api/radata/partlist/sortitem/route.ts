import { NextResponse,NextRequest } from "next/server";

import db from "@/lib/db";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type")?.trim();
    const brand = searchParams.get("brand")?.trim();
    const model = searchParams.get("model")?.trim();

    let query = "SELECT * FROM partlist";
    const conditions: string[] = [];
    const values: string[] = [];

    if (type) {
      conditions.push("type = ?");
      values.push(type);
    }

    if (brand) {
      conditions.push("brand = ?");
      values.push(brand);
    }

    if (model) {
      conditions.push("model = ?");
      values.push(model);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const [rows] = await db.query(query, values);

    return NextResponse.json(rows);
  } catch (error) {

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
