import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(): Promise<Response> {
    try{
        const [rows] = await db.query('SELECT DISTINCT type FROM partlist');

        const data = (rows as {type: string}[]).map(row => {
           const value = row.type.trim();

           return {key: value , label: value}
        });

        return NextResponse.json(data)
    }catch(error){
        return NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}