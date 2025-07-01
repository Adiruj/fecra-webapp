var mc = require("mcprotocol");
var conn = new mc();
var doneReading = false;

const variables: Record<string, string> = {
  TEMP: "D3540,1",
  // เพิ่ม tag อื่น ๆ ได้ที่นี่
};

conn.initiateConnection(
  { port: 2000, host: "192.168.126.4", ascii: false },
  connected
);

export async function connected() {
  console.log("Connected Complete");
  conn.setTranslationCB(function (tag: string) {
    return variables[tag];
  });
  conn.addItems("TEMP");
  conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad: any, values:Record<string,any>) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
    conn.dropConnection();
    
    return;
  }

  console.log(values); // ✅ จะได้ค่า TEMP: { TEMP: actualValue }
  conn.dropConnection(); // ❗ แนะนำให้ disconnect หลังอ่านเสร็จ
}
