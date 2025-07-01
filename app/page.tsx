'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { RobotStatusCard } from "@/components/RobotStatusCard";

interface RobotStatus {
  area: string;
  run: number;
  total: number;
}

export default function Home() {
  const pathname = usePathname()

  const [robotStatusList, setRobotStatusList] = useState<RobotStatus[]>([])

  const [prmdata1, setPrmdata1] = useState([])
  const [prmdata2, setPrmdata2] = useState([])
  const [prmdata3, setPrmdata3] = useState([])
  const [prmdata4, setPrmdata4] = useState([])
  const [prmdata15, setPrmdata15] = useState([])
  const [prmdata243, setPrmdata243] = useState([])

  const [prmallrun, setPrmallrun] = useState(0)

  useEffect(() => {
    if (pathname !== '/') return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        await Promise.all([
          fetch('/api/plc1')
            .then(res => res.json())
            .then(data => {
              setPrmdata1(data.values);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc2')
            .then(res => res.json())
            .then(data => {
              setPrmdata2(data.values);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc3')
            .then(res => res.json())
            .then(data => {
              setPrmdata3(data.values);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc4')
            .then(res => res.json())
            .then(data => {
              setPrmdata4(data.values);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc15')
            .then(res => res.json())
            .then(data => {
              setPrmdata15(data.values);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc243')
            .then(res => res.json())
            .then(data => {
              setPrmdata243(data.values);
            })
            .catch(error => console.error("Fetch error:", error))
        ])
      } catch (error) {
        console.error("Error fetching PLC data:", error);
      }

    }
    const interval = setInterval(fetchData, 10000);

    fetchData()

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [pathname])

  useEffect(() => {
    const prmcountTrue1 = prmdata1 === undefined ? 0 : Object.values(prmdata1).filter(value => value === true).length;
    const prmcountTrue2 = prmdata2 === undefined ? 0 : Object.values(prmdata2).filter(value => value === true).length;
    const prmcountTrue3 = prmdata3 === undefined ? 0 : Object.values(prmdata3).filter(value => value === true).length;
    const prmcountTrue4 = prmdata4 === undefined ? 0 : Object.values(prmdata4).filter(value => value === true).length;
    const prmcountTrue15 = prmdata15 === undefined ? 0 : Object.values(prmdata15).filter(value => value === true).length;
    const prmcountTrue243 = prmdata243 === undefined ? 0 : Object.values(prmdata243).filter(value => value === true).length;

    setPrmallrun(prmcountTrue1 + prmcountTrue2 + prmcountTrue3 + prmcountTrue4 + prmcountTrue15 + prmcountTrue243)



  }, [prmdata1, prmdata2, prmdata3, prmdata4, prmdata15, prmdata243])


  useEffect(() => {
    const list = [
      { area: "PRM Line", run: prmallrun, total: 45 },
      { area: "Anodize Line", run: 4, total: 4 },
      { area: "PPP Line", run: 0, total: 1 },
      { area: "HTP Line", run: 3, total: 5 },
      { area: "PNT Line", run: 4, total: 6 },
    ];

    setRobotStatusList(list)
  }, [prmallrun])

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col items-start pt-2">
        <p className="text-4xl font-bold text-white">Dashboard</p>
        <p className="text-lg text-gray-100">หน้าหลัก</p>
      </div>
      <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-2">
        <div className="grid grid-cols-1 flex-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          {robotStatusList.map((data, index) => (
            <RobotStatusCard key={index} data={data} />
          ))}
        </div>
      </section>
    </div>


  );
}
