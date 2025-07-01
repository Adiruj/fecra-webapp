import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(): Promise<Response> {
    try{
        const [rows] = await db.query('SELECT * FROM partlist');

        return NextResponse.json(rows)
    }catch(error){
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}