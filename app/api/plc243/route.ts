// /app/api/plc243/route.ts
import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M141A_Status: "M0,1",
  M137A_Status: "M300,1",
  M117A_Status: "M500,1",
};

const tags = Object.keys(variables);

export async function GET() {
  const conn = new mc();

  try {
    const values = await new Promise<Record<string, boolean>>(
      (resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.243", port: 2000, ascii: false },
          () => {
            conn.setTranslationCB((t: string) => variables[t]);
            conn.addItems(tags);

            setTimeout(() => {
              conn.readAllItems((err: any, values: Record<string, any>) => {
                conn.dropConnection();

                if (err) return reject(err);

                // กรองค่าที่ undefined ออก และ fallback เป็น false
                const result: Record<string, boolean> = {};

                for (const tag of tags) {
                  result[tag] = values[tag] !== undefined ? values[tag] : false;
                }

                resolve(result);
              });
            }, 1000); // เว้นเวลาให้ FX5U มีเวลาตอบ
          }
        );
      }
    );

    return NextResponse.json({ values });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Error reading PLC15: ${err.message}` },
      { status: 500 }
    );
  }
}