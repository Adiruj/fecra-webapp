import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: NextRequest): Promise<Response> {
    try{
        const {searchParams} = new URL(req.url)
        const type = searchParams.get("type")
        const brand = searchParams.get("brand")

        const [rows] = await db.query('SELECT DISTINCT model FROM partlist WHERE type = ? and brand = ?',[type,brand]);

        const data = (rows as {model: string}[]).map(row => {
           const value = row.model.trim();

           return {key: value , label: value}
        });

        return NextResponse.json(data)
    }catch(error){
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}