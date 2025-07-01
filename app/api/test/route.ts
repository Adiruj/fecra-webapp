import { NextResponse } from "next/server";

const mc = require("mcprotocol");

const variables: Record<string, string> = {
  PLC_Bit_0: "M0,200",
  PLC_Bit_300: "M300,200",
  PLC_Bit_500: "M500,200",
  PLC_Bit_700: "M700,200",
  PLC_Bit_900: "M900,200",
  PLC_Bit_1100: "M1100,200",
  PLC_Bit_1300: "M1300,200",
  PLC_Bit_1500: "M1500,200",
  PLC_Bit_1700: "M1700,200",
  PLC_Bit_1900: "M1900,200",
  PLC_Bit_2100: "M2100,200",
  PLC_Bit_2300: "M2300,200",
  PLC_Bit_2500: "M2500,200",
  PLC_Bit_2700: "M2700,200",
  PLC_Bit_2900: "M2900,200",
  PLC_Bit_3100: "M3100,200",
  PLC_Bit_3300: "M3300,200",
  PLC_Bit_3500: "M3500,200",
  PLC_Bit_3700: "M3700,200",
  PLC_Bit_3900: "M3900,200",
  PLC_Bit_4100: "M4100,200",
  PLC_Bit_4300: "M4300,200",
  PLC_Bit_4500: "M4500,200",
  PLC_Bit_4700: "M4700,200",
  PLC_Bit_4900: "M4900,200",
  PLC_Bit_5100: "M5100,200",
  PLC_Bit_5300: "M5300,200",
  PLC_Bit_5500: "M5500,200",
  PLC_Bit_5700: "M5700,200",
  PLC_Bit_5900: "M5900,200",
  PLC_Bit_6100: "M6100,200",

  PLC_Word_0: "D0,20",
  PLC_Word_300: "D300,20",
  PLC_Word_500: "D500,20",
  PLC_Word_700: "D700,20",
  PLC_Word_900: "D900,20",
  PLC_Word_1100: "D1100,20",
  PLC_Word_1300: "D1300,20",
  PLC_Word_1500: "D1500,20",
  PLC_Word_1700: "D1700,20",
  PLC_Word_1900: "D1900,20",
  PLC_Word_2100: "D2100,20",
  PLC_Word_2300: "D2300,20",
  PLC_Word_2500: "D2500,20",
  PLC_Word_2700: "D2700,20",
  PLC_Word_2900: "D2900,20",
  PLC_Word_3100: "D3100,20",
  PLC_Word_3300: "D3300,20",
  PLC_Word_3500: "D3500,20",
  PLC_Word_3700: "D3700,20",
  PLC_Word_3900: "D3900,20",
  PLC_Word_4100: "D4100,20",
  PLC_Word_4300: "D4300,20",
  PLC_Word_4500: "D4500,20",
  PLC_Word_4700: "D4700,20",
  PLC_Word_4900: "D4900,20",
  PLC_Word_5100: "D5100,20",
  PLC_Word_5300: "D5300,20",
  PLC_Word_5500: "D5500,20",
  PLC_Word_5700: "D5700,20",
  PLC_Word_5900: "D5900,20",
  PLC_Word_6100: "D6100,20",
};

const bitMap: Record<string, { source: string; offset: number }> = {
  M140A_Status: { source: "PLC_Bit_700", offset: 0 }, //700
  M130A_Status: { source: "PLC_Bit_1300", offset: 0 }, //1300
  M124A_Status: { source: "PLC_Bit_1500", offset: 0 }, //1500
  M097A_Status: { source: "PLC_Bit_1700", offset: 0 }, //1700
  M131A_Status: { source: "PLC_Bit_1900", offset: 0 }, //1900
  M132A_Status: { source: "PLC_Bit_2100", offset: 0 }, //2100
  M138A_Status: { source: "PLC_Bit_2300", offset: 0 }, //2300
  M110A_Status: { source: "PLC_Bit_2500", offset: 0 }, //2500
  M108A_Status: { source: "PLC_Bit_2700", offset: 0 }, //2700
  M111A_Status: { source: "PLC_Bit_2900", offset: 0 }, //2900
  M109A_Status: { source: "PLC_Bit_3100", offset: 0 }, //3100
  M045D_Status: { source: "PLC_Bit_3300", offset: 0 }, //3300
  M129A_Status: { source: "PLC_Bit_3500", offset: 0 }, //3500
  M139A_Status: { source: "PLC_Bit_3700", offset: 0 }, //3700
  M134A_Status: { source: "PLC_Bit_3900", offset: 0 }, //3900
  M133A_Status: { source: "PLC_Bit_4100", offset: 0 }, //4100
  M146A_Status: { source: "PLC_Bit_4300", offset: 0 }, //4300
  M127A_Status: { source: "PLC_Bit_4500", offset: 0 }, //4500
  M135A_Status: { source: "PLC_Bit_4700", offset: 0 }, //4700
  M144A_Status: { source: "PLC_Bit_4900", offset: 0 }, //4900
  M145A_Status: { source: "PLC_Bit_5100", offset: 0 }, //5100
  M126A_Status: { source: "PLC_Bit_5300", offset: 0 }, //5300
  M125A_Status: { source: "PLC_Bit_5500", offset: 0 }, //5500
  M113A_Status: { source: "PLC_Bit_5700", offset: 0 }, //5700
  M112A_Status: { source: "PLC_Bit_5900", offset: 0 }, //5900
  M136A_Status: { source: "PLC_Bit_6100", offset: 0 }, //6100
};

const wordMap: Record<string,{source: string;offset: number;isFloat?: boolean;isPackedString?: boolean;length?: number;}> = {
  M140A_CT: { source: "PLC_Word_700", offset: 0, isFloat: true }, //CT
  M140A_Model: {source: "PLC_Word_700",offset: 2,isPackedString: true,length: 4,}, //Model

  M130A_CT: { source: "PLC_Word_1300", offset: 0, isFloat: true }, //CT
  M130A_Model: {source: "PLC_Word_1300",offset: 2,isPackedString: true,length: 4,}, //Model

  M124A_CT: { source: "PLC_Word_1500", offset: 0, isFloat: true }, //CT
  M124A_Model: {source: "PLC_Word_1500",offset: 2,isPackedString: true,length: 4,}, //Model

  M097A_CT: { source: "PLC_Word_1700", offset: 0, isFloat: true }, //CT
  M097A_Model: {source: "PLC_Word_1700",offset: 2,isPackedString: true,length: 4,}, //Model

  M131A_CT: { source: "PLC_Word_1900", offset: 0, isFloat: true }, //CT
  M131A_Model: {source: "PLC_Word_1900",offset: 2,isPackedString: true,length: 4,}, //Model

  M132A_CT: { source: "PLC_Word_2100", offset: 0, isFloat: true }, //CT
  M132A_Model: {source: "PLC_Word_2100",offset: 2,isPackedString: true,length: 4,}, //Model

  M138A_CT: { source: "PLC_Word_2300", offset: 0, isFloat: true }, //CT
  M138A_Model: {source: "PLC_Word_2300",offset: 2,isPackedString: true,length: 4,}, //Model

  M110A_CT: { source: "PLC_Word_2500", offset: 0, isFloat: true }, //CT
  M110A_Model: {source: "PLC_Word_2500",offset: 2,isPackedString: true,length: 4,}, //Model

  M108A_CT: { source: "PLC_Word_2700", offset: 0, isFloat: true }, //CT
  M108A_Model: {source: "PLC_Word_2700",offset: 2,isPackedString: true,length: 4,}, //Model

  M111A_CT: { source: "PLC_Word_2900", offset: 0, isFloat: true }, //CT
  M111A_Model: {source: "PLC_Word_2900",offset: 2,isPackedString: true,length: 4,}, //Model

  M109A_CT: { source: "PLC_Word_3100", offset: 0, isFloat: true }, //CT
  M109A_Model: {source: "PLC_Word_3100",offset: 2,isPackedString: true,length: 4,}, //Model

  M045D_CT: { source: "PLC_Word_3300", offset: 0, isFloat: true }, //CT
  M045D_Model: {source: "PLC_Word_3300",offset: 2,isPackedString: true,length: 4,}, //Model

  M129A_CT: { source: "PLC_Word_3500", offset: 0, isFloat: true }, //CT
  M129A_Model: {source: "PLC_Word_3500",offset: 2,isPackedString: true,length: 4,}, //Model

  M139A_CT: { source: "PLC_Word_3700", offset: 0, isFloat: true }, //CT
  M139A_Model: {source: "PLC_Word_3700",offset: 2,isPackedString: true,length: 4,}, //Model

  M134A_CT: { source: "PLC_Word_3900", offset: 0, isFloat: true }, //CT
  M134A_Model: {source: "PLC_Word_3900",offset: 2,isPackedString: true,length: 4,}, //Model

  M133A_CT: { source: "PLC_Word_4100", offset: 0, isFloat: true }, //CT
  M133A_Model: {source: "PLC_Word_4100",offset: 2,isPackedString: true,length: 4,}, //Model

  M146A_CT: { source: "PLC_Word_4300", offset: 0, isFloat: true }, //CT
  M146A_Model: {source: "PLC_Word_4300",offset: 2,isPackedString: true,length: 4,}, //Model

  M127A_CT: { source: "PLC_Word_4500", offset: 0, isFloat: true }, //CT
  M127A_Model: {source: "PLC_Word_4500",offset: 2,isPackedString: true,length: 4,}, //Model

  M135A_CT: { source: "PLC_Word_4700", offset: 0, isFloat: true }, //CT
  M135A_Model: {source: "PLC_Word_4700",offset: 2,isPackedString: true,length: 4,}, //Model

  M144A_CT: { source: "PLC_Word_4900", offset: 0, isFloat: true }, //CT
  M144A_Model: {source: "PLC_Word_4900",offset: 2,isPackedString: true,length: 4,}, //Model

  M145A_CT: { source: "PLC_Word_5100", offset: 0, isFloat: true }, //CT
  M145A_Model: {source: "PLC_Word_5100",offset: 2,isPackedString: true,length: 4,}, //Model

  M126A_CT: { source: "PLC_Word_5300", offset: 0, isFloat: true }, //CT
  M126A_Model: {source: "PLC_Word_5300",offset: 2,isPackedString: true,length: 4,}, //Model

  M125A_CT: { source: "PLC_Word_5500", offset: 0, isFloat: true }, //CT
  M125A_Model: {source: "PLC_Word_5500",offset: 2,isPackedString: true,length: 4,}, //Model

  M113A_CT: { source: "PLC_Word_5700", offset: 0, isFloat: true }, //CT
  M113A_Model: {source: "PLC_Word_5700",offset: 2,isPackedString: true,length: 4,}, //Model

  M112A_CT: { source: "PLC_Word_5900", offset: 0, isFloat: true }, //CT
  M112A_Model: {source: "PLC_Word_5900",offset: 2,isPackedString: true,length: 4,}, //Model

  M136A_CT: { source: "PLC_Word_6100", offset: 0, isFloat: true }, //CT
  M136A_Model: {source: "PLC_Word_6100",offset: 2,isPackedString: true,length: 4,}, //Model

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
      { host: "192.168.126.15", port: 2000, ascii: false },
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
