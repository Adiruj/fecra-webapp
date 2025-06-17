// /app/api/plc1/route.ts
// PLC IP Address 192.168.126.3

import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  M158A_Status: "M550,1",
};

const tags = Object.keys(variables);

export async function GET() {
  const conn = new mc();

  try {
    const values = await new Promise<Record<string, boolean>>(
      (resolve, reject) => {
        conn.initiateConnection(
          { host: "192.168.126.3", port: 2000, ascii: false },
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

/**

// /app/api/plc15/route.ts
// PLC Master 1 IP Address 192.168.126.15

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
};

const tags = [
  "M146A_Status",
  "M127A_Status",
  "M144A_Status",
  "M138A_Status",
  "M111A_Status",

  "M136A_Status",
  "M140A_Status",
  "M112A_Status",
  "M113A_Status",
];

export async function GET() {
  const result: Record<string, boolean> = {};

  for (const tag of tags) {
    const conn = new mc();

    try {
      const values = await new Promise<Record<string, boolean>>(
        (resolve, reject) => {
          conn.initiateConnection(
            { host: "192.168.126.15", port: 2000, ascii: false },
            () => {
              conn.setTranslationCB((t: string) => variables[t]);
              conn.addItems([tag]);

              setTimeout(() => {
                conn.readAllItems((err: any, values: Record<string, any>) => {
                  conn.dropConnection();

                  if (err) return reject(err);

                  if (values[tag] === undefined) {
                    values[tag] = false;
                  }

                  resolve(values);
                });
              }, 500);
            }
          );
        }
      );

      result[tag] = values[tag];
    } catch (err: any) {
      return NextResponse.json(
        { error: `Error reading ${tag}: ${err.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ values: result });
}


 */
