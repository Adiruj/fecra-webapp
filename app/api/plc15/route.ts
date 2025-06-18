// /app/api/plc15/route.ts
import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M146A_Status: "M4300,1",
  M127A_Status: "M4500,1",
  M144A_Status: "M4900,1",
  M138A_Status: "M2300,1",
  M111A_Status: "M2900,1",
  M136A_Status: "M6100,1",
  M140A_Status: "M700,1",
  M112A_Status: "M5900,1",
  M113A_Status: "M5700,1",

  M110A_Status: "M2500,1",
  M108A_Status: "M2700,1",
  M109A_Status: "M3100,1",
  M045D_Status: "M3300,1",
  M129A_Status: "M3500,1",
  M126A_Status: "M5300,1",
  M125A_Status: "M5500,1",
  M097A_Status: "M1700,1",
  M124A_Status: "M1500,1",
  M130A_Status: "M1300,1",
  M131A_Status: "M1900,1",
  M133A_Status: "M4100,1",
  M134A_Status: "M3900,1",
  M135A_Status: "M4700,1",
  M139A_Status: "M3700,1",
  M145A_Status: "M5100,1",
  M132A_Status: "M2100,1"
  


};

const tags = Object.keys(variables);

export async function GET() {
  const conn = new mc();

  try {
    const values = await new Promise<Record<string, boolean>>(
      (resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.15", port: 2000, ascii: false },
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