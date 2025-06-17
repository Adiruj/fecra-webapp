// /app/api/plc1/route.ts
// PLC IP Address 192.168.126.2

import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M121A_Status: "M500,1",
  M122A_Status: "M520,1",
};


const tags = ["M121A_Status", "M122A_Status"];

export async function GET() {
  const result: Record<string, boolean> = {};

  for (const tag of tags) {
    const conn = new mc();

    try {
      const values = await new Promise<Record<string, boolean>>((resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.2", port: 2000, ascii: false },
          () => {
            conn.setTranslationCB((t: string) => variables[t]);
            conn.addItems([tag]);

            setTimeout(() => {
              conn.readAllItems((err: any, values: Record<string, any>) => {
                conn.dropConnection();

                if (err) return reject(err);
                resolve(values);
              });
            }, 300);
          }
        );
      });

      result[tag] = values[tag];
    } catch (err: any) {
      return NextResponse.json({ error: `Error reading ${tag}: ${err.message}` }, { status: 500 });
    }
  }

  return NextResponse.json({ values: result });
}