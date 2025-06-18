'use client'

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Image } from "@heroui/react";
import { Tooltip } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@heroui/react";
import { usePathname } from "next/navigation";



import { title } from "@/components/primitives";


export default function DocsPage() {
  const pathname = usePathname()

  const [totalRB, setTotalRB] = useState(49)
  const [runRB, setRunRB] = useState(0)
  const [stopRB, setStopRB] = useState(0)

  // PLC IP Address 192.168.126.1
  const [M160A_Status, setM160A_Status] = useState(false)
  const [M161A_Status, setM161A_Status] = useState(false)

  // PLC IP Address 192.168.126.2
  const [M121A_Status, setM121A_Status] = useState(false)
  const [M122A_Status, setM122A_Status] = useState(false)

  // PLC IP Address 192.168.126.3
  const [M158A_Status, setM158A_Status] = useState(false)

  // PLC IP Address 192.168.126.4
  const [M115A_Status, setM115A_Status] = useState(false)
  const [M142A_Status, setM142A_Status] = useState(false)
  const [M143A_Status, setM143A_Status] = useState(false)
  const [M151A_Status, setM151A_Status] = useState(false)
  const [M156A_Status, setM156A_Status] = useState(false)

  // PLC IP Address 192.168.126.15
  const [M146A_Status, setM146A_Status] = useState(false)
  const [M127A_Status, setM127A_Status] = useState(false)
  const [M144A_Status, setM144A_Status] = useState(false)
  const [M138A_Status, setM138A_Status] = useState(false)
  const [M111A_Status, setM111A_Status] = useState(false)

  const [M136A_Status, setM136A_Status] = useState(false)
  const [M140A_Status, setM140A_Status] = useState(false)
  const [M112A_Status, setM112A_Status] = useState(false)
  const [M113A_Status, setM113A_Status] = useState(false)

  const [M110A_Status, setM110A_Status] = useState(false)
  const [M108A_Status, setM108A_Status] = useState(false)
  const [M109A_Status, setM109A_Status] = useState(false)
  const [M045D_Status, setM045D_Status] = useState(false)
  const [M129A_Status, setM129A_Status] = useState(false)

  // PLC IP Address 192.168.126.243
  const [M141A_Status, setM141A_Status] = useState(false)
  const [M137A_Status, setM137A_Status] = useState(false)
  const [M117A_Status, setM117A_Status] = useState(false)


  useEffect(() => {
    if (pathname !== '/robot/prm') return;
    const fetchData = async () => {
      try {
        await fetch('/api/plc1')
          .then(res => res.json())
          .then(data => {
            setM160A_Status(data.values.M160A_Status);
            setM161A_Status(data.values.M161A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

        await fetch('/api/plc2')
          .then(res => res.json())
          .then(data => {
            setM121A_Status(data.values.M121A_Status);
            setM122A_Status(data.values.M122A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

        await fetch('/api/plc3')
          .then(res => res.json())
          .then(data => {
            setM158A_Status(data.values.M158A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

        await fetch('/api/plc4')
          .then(res => res.json())
          .then(data => {
            setM115A_Status(data.values.M115A_Status);
            setM142A_Status(data.values.M142A_Status);
            setM143A_Status(data.values.M143A_Status);
            setM151A_Status(data.values.M151A_Status);
            setM156A_Status(data.values.M156A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

        await fetch('/api/plc15')
          .then(res => res.json())
          .then(data => {
            setM146A_Status(data.values.M146A_Status);
            setM127A_Status(data.values.M127A_Status);
            setM144A_Status(data.values.M144A_Status);
            setM138A_Status(data.values.M138A_Status);
            setM111A_Status(data.values.M111A_Status);

            setM136A_Status(data.values.M136A_Status);
            setM140A_Status(data.values.M140A_Status);
            setM112A_Status(data.values.M112A_Status);
            setM113A_Status(data.values.M113A_Status);

            setM110A_Status(data.values.M110A_Status);
            setM108A_Status(data.values.M108A_Status);
            setM109A_Status(data.values.M109A_Status);
            setM045D_Status(data.values.M045D_Status);
            setM129A_Status(data.values.M129A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

        await fetch('/api/plc243')
          .then(res => res.json())
          .then(data => {
            setM141A_Status(data.values.M141A_Status);
            setM137A_Status(data.values.M137A_Status);
            setM117A_Status(data.values.M117A_Status);
          })
          .catch(error => console.error("Fetch error:", error))

      } catch (error) {
        console.error("Error fetching PLC data:", error);
      }

    }
    const interval = setInterval(fetchData, 10000);
    fetchData()

    return () => {
      console.log("Clearing interval");
      clearInterval(interval);
    };
  }, [])

  useEffect(() => {
    //Calculate Robot Active
    const statusRB = [
      M160A_Status,
      M161A_Status,

      M121A_Status,
      M122A_Status,

      M158A_Status,

      M115A_Status,
      M142A_Status,
      M143A_Status,
      M151A_Status,
      M156A_Status,

      M146A_Status,
      M127A_Status,
      M144A_Status,
      M138A_Status,
      M111A_Status,

      M136A_Status,
      M140A_Status,
      M112A_Status,
      M113A_Status,
      M141A_Status,

      M110A_Status,
      M108A_Status,
      M109A_Status,
      M129A_Status,
      M045D_Status
    ];
    const countRBRun = statusRB.filter(status => status === true).length;
    //console.log(statusRB)
    
    setRunRB(countRBRun);

    setStopRB(totalRB - countRBRun)

  }, [M115A_Status, M142A_Status, M143A_Status, M151A_Status, M156A_Status,
    M146A_Status, M127A_Status, M144A_Status, M138A_Status, M111A_Status,
    M136A_Status, M140A_Status, M112A_Status, M113A_Status, M160A_Status, M161A_Status,
    M121A_Status, M122A_Status,M158A_Status,M141A_Status,M110A_Status,M108A_Status,
  M109A_Status,M129A_Status,M045D_Status])

  return (
    <div className="flex flex-col pt-[60px]" >
      <div className="flex flex-row flex-1 gap-4">
        <Card className="flex-1 bg-gray-100 shadow-md rounded-lg">
          <CardBody className="flex justify-center items-center h-full">
            <p className="text-2xl font-semibold text-gray-800">PRM LINE</p>
          </CardBody>
        </Card>
      </div>
      <div className=" py-2 flex flex-row flex-1 gap-4">
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-blue-100 to-blue-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl font-semibold text-gray-600">TOTAL ROBOT</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl font-semibold text-blue-800">{totalRB}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-green-100 to-green-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl text-md font-semibold text-gray-600">ROBOT RUNNING</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl text-md font-semibold text-green-800">{runRB}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl text-md font-semibold text-gray-600">ROBOT STOP</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl text-md font-semibold text-red-800">{stopRB}</p>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="relative w-full ">
        <Card className="flex-1  relative">
          <Image
            alt="Background"
            src="/images/FEC_PRM.jpg"
            style={{ objectFit: 'cover' }}
          />

          {/*PLC IP Address 192.168.126.4 */}
          <div className="z-10 absolute top-[380px] left-[1123px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M115A" placement="top">
              {M115A_Status === true ? <Button className="text-cyan-50" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[470px] left-[1093px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M142A" placement="top">
              {M142A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[505px] left-[1093px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M143A" placement="top">
              {M143A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[420px] left-[995px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M151A" placement="top">
              {M151A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[480px] left-[870px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M156A" placement="top">
              {M156A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.15 */}
          <div className="z-10 absolute top-[255px] left-[310px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M146A" placement="top">
              {M146A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[195px] left-[325px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M127A" placement="top">
              {M127A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[300px] left-[410px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M144A" placement="top">
              {M144A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[390px] left-[495px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M138A" placement="top">
              {M138A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[455px] left-[435px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M111A" placement="top">
              {M111A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[175px] left-[570px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M136A" placement="top">
              {M136A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[140px] left-[625px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M112A" placement="top">
              {M112A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[65px] left-[560px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M113A" placement="top">
              {M113A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[198px] left-[682px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M140A" placement="top">
              {M140A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[370px] left-[435px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M110A" placement="top">
              {M110A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[360px] left-[370px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M108A" placement="top">
              {M108A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[380px] left-[295px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M129A" placement="top">
              {M129A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm"  >STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[450px] left-[370px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M109A" placement="top">
              {M109A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm"  >STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[490px] left-[305px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M045D" placement="top">
              {M045D_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm"  >STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.1 */}
          <div className="z-10 absolute top-[315px] left-[795px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M160A" placement="top">
              {M160A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[315px] left-[860px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M161A" placement="top">
              {M161A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.2 */}
          <div className="z-10 absolute top-[315px] left-[1000px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M121A" placement="top">
              {M121A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[315px] left-[1065px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M122A" placement="top">
              {M122A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.3 */}
          <div className="z-10 absolute top-[168px] left-[820px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M158A" placement="top">
              {M158A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.243 */}
          <div className="z-10 absolute top-[265px] left-[590px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M141A" placement="top">
              {M141A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[330px] left-[635px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M137A" placement="top">
              {M137A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[305px] left-[700px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M117A" placement="top">
              {M117A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm">STOP</Button>}
            </Tooltip>
          </div>

        </Card>
      </div>
      <div className="flex flex-row flex-1 gap-4">
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://heroui.com?utm_source=next-app-template"
            title="heroui.com homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NumChock</p>
          </Link>
        </footer>
      </div>
    </div>

  );
}