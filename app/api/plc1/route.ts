// /app/api/plc1/route.ts
// PLC IP Address 192.168.126.1

import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M160A_Status: "M600,1",
  M161A_Status: "M620,1",
};


const tags = ["M160A_Status", "M161A_Status"];

export async function GET() {
  const result: Record<string, boolean> = {};

  for (const tag of tags) {
    const conn = new mc();

    try {
      const values = await new Promise<Record<string, boolean>>((resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.1", port: 2000, ascii: false },
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
