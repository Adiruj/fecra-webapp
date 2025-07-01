import { NextResponse } from "next/server";

const mc = require("mcprotocol");
const conn = new mc();
let connected = false;

const variables: Record<string, string> = {
  TEMP: "D3540,1",
  // เพิ่ม tag อื่น ๆ ได้ที่นี่
};

export async function getPLC1Con() {
  if (connected) {

    console.log("Connected PLC Complete")

    return conn;
  }

  await new Promise((resolve, reject) => {
    conn.initiateConnection(
      { host: "192.168.126.4", port: 2000, ascii: false },
      (err: any) => {
        if (err) return reject(err);

        conn.setTranslationCB((tag: string) => variables[tag]);
        conn.addItems(Object.keys(variables));

        connected = true;

        resolve(conn);
      }
    );
  });
  await new Promise((r) => setTimeout(r, 100));

  console.log("[PLC] Connected and ready.");

  return conn;
}

export function readPLCValues(): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    conn.readAllItems((bad: any, values: any) => {
      if (bad) return reject(new Error("Read failed"));
      resolve(values);
    });
  });
}



