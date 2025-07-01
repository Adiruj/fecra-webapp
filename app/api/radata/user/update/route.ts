
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      emp_id,
      emp_fname,
      emp_sname,
      emp_level,
      emp_email,
      emp_position,
      emp_tel,
      emp_startwork,
      id,
    } = body;

    // validate ข้อมูลที่จำเป็น
    if (!emp_id || !emp_fname || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // แปลงวันที่ให้ชัดเจน
    const startDate = new Date(emp_startwork);
    const formattedDate = startDate.toISOString().slice(0, 10);

    const [result] = await db.query(
      `UPDATE emp SET 
        emp_id = ?, 
        emp_fname = ?, 
        emp_sname = ?, 
        emp_level = ?, 
        emp_email = ?, 
        emp_position = ?, 
        emp_tel = ?, 
        emp_startwork = ?
       WHERE id = ?`,
      [emp_id, emp_fname, emp_sname, emp_level, emp_email, emp_position, emp_tel, formattedDate, id]
    );

    return NextResponse.json({ message: "Updated successfully", result });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

