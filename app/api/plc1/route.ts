import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  PLC_Bit: "M600,50",
  PLC_Word_CT: "D2000,50",
  PLC_Word_Model: "D3000,50",
};

const bitMap: Record<string, { source: string; offset: number }> = {
  M160A_Status: { source: "PLC_Bit", offset: 0 },
  M161A_Status: { source: "PLC_Bit", offset: 20 },
};

const wordMap: Record<
  string,
  {
    source: string;
    offset: number;
    isFloat?: boolean;
    isPackedString?: boolean;
    length?: number;
  }
> = {
  M160A_CT: { source: "PLC_Word_CT", offset: 10, isFloat: true }, //CT
  M160A_Model: {
    source: "PLC_Word_Model",
    offset: 10,
    isPackedString: true,
    length: 4,
  }, //Model

  M161A_CT: { source: "PLC_Word_CT", offset: 0, isFloat: true }, //CT
  M161A_Model: {
    source: "PLC_Word_Model",
    offset: 0,
    isPackedString: true,
    length: 4,
  }, //Model
};

function wordToFloat(word1: number, word2: number): number {
  const buffer = Buffer.alloc(4);

  buffer.writeUInt16LE(word1 & 0xffff, 0);
  buffer.writeUInt16LE(word2 & 0xffff, 2);

  return buffer.readFloatLE(0);
}

function packedWordsToString(words: number[], charLength: number): string {
  const chars: string[] = [];

  for (const word of words) {
    const low = word & 0xff; // ตัวอักษร 1 (น้อย)
    const high = (word >> 8) & 0xff; // ตัวอักษร 2 (มาก)

    chars.push(String.fromCharCode(low));
    chars.push(String.fromCharCode(high));
  }

  return chars.join("").slice(0, charLength).replace(/\0/g, "").trim();
}

export async function GET(): Promise<Response> {
  const conn = new mc();

  return await new Promise((resolve) => {
    conn.initiateConnection(
      { host: "192.168.126.1", port: 2000, ascii: false },
      () => {
        conn.addItems(Object.values(variables));

        conn.readAllItems((err: any, values: Record<string, any>) => {
          conn.dropConnection();

          if (err) {
            return resolve(
              NextResponse.json({ error: err.message }, { status: 500 })
            );
          }

          const result: Record<string, boolean | number | string> = {};

          for (const [name, { source, offset }] of Object.entries(bitMap)) {
            result[name] = values[variables[source]][offset];
          }

          for (const [
            name,
            { source, offset, isFloat, isPackedString, length },
          ] of Object.entries(wordMap)) {
            const data = values[variables[source]];

            if (isFloat) {
              const word1 = data[offset];
              const word2 = data[offset + 1];

              result[name] = parseFloat(wordToFloat(word1, word2).toFixed(2));
            } else if (isPackedString && length) {
              const wordSegment = data.slice(
                offset,
                offset + Math.ceil(length / 2)
              );

              result[name] = packedWordsToString(wordSegment, length);
            } else {
              result[name] = data[offset];
            }
          }

          resolve(NextResponse.json({ values: result }));
        });
      }
    );
  });
}
