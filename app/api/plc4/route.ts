// /app/api/plc/route.ts
import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M115A_Status: "M100,1",
  M142A_Status: "M120,1",
  M143A_Status: "M140,1",
  M151A_Status: "M160,1",
  M156A_Status: "M180,1",
};


const tags = ["M115A_Status", "M142A_Status", "M143A_Status" , "M151A_Status" , "M156A_Status"];

export async function GET() {
  const result: Record<string, boolean> = {};

  for (const tag of tags) {
    const conn = new mc();

    try {
      const values = await new Promise<Record<string, boolean>>((resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.4", port: 2000, ascii: false },
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