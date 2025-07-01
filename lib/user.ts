// lib/user.ts
import db from "@/lib/db";

export async function getUserById(id: number) {
  const [rows]: any = await db.execute("SELECT * FROM emp WHERE id = ? LIMIT 1", [id]);
  
  return rows[0];
}