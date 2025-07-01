'use client'

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Image, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@heroui/react";
import { Tooltip } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@heroui/react";
import { usePathname } from "next/navigation";


export default function DocsPage() {
  const [PLC4_Status, setPLC4_Status] = useState(null)

  const [open, setOpen] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [selMC, setSelMC] = useState<{
    name: string,
    status: string,
    model?: string,
    ct?: string
  } | null>(null)

  const handleOpenmodal = async (name: string, status: string) => {
    try {
      setOpen(true)
      setIsloading(true)
      setSelMC({
        name, status
      })

      let response;

      switch (name) {
        case "M160A":
        case "M161A":
          response = await fetch("/api/plc1");
          break;

        case "M121A":
        case "M122A":
          response = await fetch("/api/plc2");
          break;

        case "M158A":
          response = await fetch("/api/plc3");
          break;

        case "M115A":
        case "M142A":
        case "M143A":
        case "M151A":
        case "M156A":
          response = await fetch("/api/plc4");
          break;
          

        case "M140A":
        case "M130A":
        case "M124A":
        case "M097A":
        case "M131A":
        case "M132A":
        case "M138A":
        case "M110A":
        case "M108A":
        case "M111A":
        case "M109A":
        case "M045D":
        case "M129A":
        case "M139A":
        case "M134A":
        case "M133A":
        case "M146A":
        case "M127A":
        case "M135A":
        case "M144A":
        case "M145A":
        case "M126A":
        case "M125A":
        case "M113A":
        case "M112A":
        case "M136A":
          response = await fetch("/api/plc15");
          break;

        
        case "M141A":
        case "M137A":
        case "M117A":
        case "M123A":
        case "M147A":
        case "M046D":
        case "M047D":
        case "M049D":
        case "M048D":
        case "M159A":
        case "M165A":
          response = await fetch("/api/plc243");
          break;


        default:
        response = null;
      }

      //let json = response;

      const json = response ? await response.json() : {};
      const model = json?.values?.[`${name}_Model`] || "ไม่พบข้อมูล";
      const ct = json?.values?.[`${name}_CT`] || "ไม่พบข้อมูล";

      setSelMC({
        name, status, model: model, ct: ct
      })
    } catch (error) {
      setSelMC({
        name, status, model: "ดึงข้อมูลไม่ได้", ct: "0"
      })
      setOpen(true)
    } finally {

      setIsloading(false); // จะทำงานเสมอ ไม่ว่าจะ success หรือ error
    }
  }

  //const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname()

  const [totalRB, setTotalRB] = useState(45)
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
  const [M126A_Status, setM126A_Status] = useState(false)
  const [M125A_Status, setM125A_Status] = useState(false)
  const [M097A_Status, setM097A_Status] = useState(false)
  const [M124A_Status, setM124A_Status] = useState(false)
  const [M130A_Status, setM130A_Status] = useState(false)
  const [M131A_Status, setM131A_Status] = useState(false)
  const [M133A_Status, setM133A_Status] = useState(false)
  const [M134A_Status, setM134A_Status] = useState(false)
  const [M135A_Status, setM135A_Status] = useState(false)
  const [M139A_Status, setM139A_Status] = useState(false)
  const [M145A_Status, setM145A_Status] = useState(false)
  const [M132A_Status, setM132A_Status] = useState(false)


  // PLC IP Address 192.168.126.243
  const [M141A_Status, setM141A_Status] = useState(false)
  const [M137A_Status, setM137A_Status] = useState(false)
  const [M117A_Status, setM117A_Status] = useState(false)
  const [M159A_Status, setM159A_Status] = useState(false)


  useEffect(() => {
    if (pathname !== '/robot/prm') return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        await Promise.all([
          fetch('/api/plc1')
            .then(res => res.json())
            .then(data => {
              setM160A_Status(data.values.M160A_Status);
              setM161A_Status(data.values.M161A_Status);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc2')
            .then(res => res.json())
            .then(data => {
              setM121A_Status(data.values.M121A_Status);
              setM122A_Status(data.values.M122A_Status);
            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc3')
            .then(res => res.json())
            .then(data => {
              setM158A_Status(data.values.M158A_Status);
            })
            .catch(error => setM158A_Status(false)),

          fetch('/api/plc4')
            .then(res => res.json())
            .then(data => {
              setM115A_Status(data.values.M115A_Status);
              setM142A_Status(data.values.M142A_Status);
              setM143A_Status(data.values.M143A_Status);
              setM151A_Status(data.values.M151A_Status);
              setM156A_Status(data.values.M156A_Status);
              setPLC4_Status(data)
            })
            .catch(error => setPLC4_Status(null)),

          fetch('/api/plc15')
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
              setM126A_Status(data.values.M126A_Status);
              setM125A_Status(data.values.M125A_Status);
              setM097A_Status(data.values.M097A_Status);
              setM124A_Status(data.values.M124A_Status);
              setM130A_Status(data.values.M130A_Status);
              setM131A_Status(data.values.M131A_Status);
              setM133A_Status(data.values.M133A_Status);
              setM134A_Status(data.values.M134A_Status);
              setM135A_Status(data.values.M135A_Status);
              setM139A_Status(data.values.M139A_Status);
              setM145A_Status(data.values.M145A_Status);
              setM132A_Status(data.values.M132A_Status)


            })
            .catch(error => console.error("Fetch error:", error)),

          fetch('/api/plc243')
            .then(res => res.json())
            .then(data => {
              setM141A_Status(data.values.M141A_Status);
              setM137A_Status(data.values.M137A_Status);
              setM117A_Status(data.values.M117A_Status);
              setM159A_Status(data.values.M159A_Status)
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
      M045D_Status,
      M126A_Status,
      M125A_Status,
      M097A_Status,
      M124A_Status,
      M130A_Status,
      M131A_Status,
      M159A_Status,
      M133A_Status,
      M134A_Status,
      M135A_Status,
      M139A_Status,
      M145A_Status,

      M137A_Status,
      M117A_Status,
      M132A_Status

    ];
    const countRBRun = statusRB.filter(status => status === true).length;
    //console.log(statusRB)

    setRunRB(countRBRun);

    setStopRB(totalRB - countRBRun)

  }, [M115A_Status, M142A_Status, M143A_Status, M151A_Status, M156A_Status,
    M146A_Status, M127A_Status, M144A_Status, M138A_Status, M111A_Status,
    M136A_Status, M140A_Status, M112A_Status, M113A_Status, M160A_Status, M161A_Status,
    M121A_Status, M122A_Status, M158A_Status, M141A_Status, M110A_Status, M108A_Status,
    M109A_Status, M129A_Status, M045D_Status, M126A_Status, M125A_Status, M097A_Status,
    M130A_Status, M131A_Status, M159A_Status, M133A_Status, M134A_Status, M135A_Status, M139A_Status,
    M145A_Status, M132A_Status, M137A_Status, M117A_Status])

  useEffect(() => {
    setPLC4_Status(PLC4_Status);
    //console.log(PLC4_Status)
  }, [PLC4_Status]);

  return (
    <div className="flex flex-col gap-2" >
      <div className="flex flex-row flex-1 gap-4">
        <Card className="flex-1 bg-gray-100 shadow-md rounded-lg">
          <CardBody className="flex justify-center items-center h-full">
            <p className="text-2xl font-prompt text-gray-800">PRM LINE</p>
          </CardBody>
        </Card>
      </div>
      <div className=" py-2 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-blue-100 to-blue-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl font-prompt text-gray-600">TOTAL ROBOT</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl font-prompt text-blue-800">{totalRB}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-green-100 to-green-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl text-md font-prompt text-gray-600">ROBOT RUNNING</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl text-md font-prompt text-green-800">{runRB}</p>
            </div>
          </CardBody>
        </Card>
        <Card className="flex-1 h-[120px] bg-gradient-to-r from-red-100 to-red-200 shadow-md rounded-lg">
          <CardHeader className="flex justify-center items-center">
            <p className="text-2xl text-md font-prompt text-gray-600">ROBOT STOP</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center items-center h-full">
            <div className="flex">
              <p className="text-4xl text-md font-prompt text-red-800">{stopRB}</p>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="hidden xl:block relative w-full ">
        <Card className="flex-1  relative">
          <Image
            alt="Background"
            src="/images/FEC_PRM.jpg"
            style={{ objectFit: 'cover' }}
          />

          {/*PLC IP Address 192.168.126.4 */}
          <div className="z-10 absolute top-[380px] left-[1123px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M115A" placement="top">
              {M115A_Status === true ? <Button className="text-cyan-50" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M115A", "RUN")}>RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M115A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[470px] left-[1093px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M142A" placement="top">
              {M142A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M142A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M142A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[505px] left-[1093px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M143A" placement="top">
              {M143A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M143A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M143A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[420px] left-[995px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M151A" placement="top">
              {M151A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M151A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M151A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[480px] left-[870px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M156A" placement="top">
              {M156A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M156A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M156A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.15 */}
          <div className="z-10 absolute top-[255px] left-[310px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M146A" placement="top">
              {M146A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M146A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M146A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[195px] left-[325px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M127A" placement="top">
              {M127A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M127A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M127A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[300px] left-[410px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M144A" placement="top">
              {M144A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M144A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M144A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[390px] left-[495px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M138A" placement="top">
              {M138A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M138A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M138A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[455px] left-[435px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M111A" placement="top">
              {M111A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M111A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M111A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[175px] left-[570px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M136A" placement="top">
              {M136A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M136A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M136A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[140px] left-[625px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M112A" placement="top">
              {M112A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M112A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M112A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[65px] left-[560px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M113A" placement="top">
              {M113A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M113A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M113A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[198px] left-[682px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M140A" placement="top">
              {M140A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M140A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M140A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[370px] left-[435px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M110A" placement="top">
              {M110A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M110A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M110A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[360px] left-[370px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M108A" placement="top">
              {M108A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M108A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M108A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[380px] left-[295px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M129A" placement="top">
              {M129A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M129A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M129A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[450px] left-[370px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M109A" placement="top">
              {M109A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M109A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M109A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[490px] left-[305px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M045D" placement="top">
              {M045D_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M045D", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M045D", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[270px] left-[505px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M126A" placement="top">
              {M126A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M126A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M126A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[188px] left-[495px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M125A" placement="top">
              {M125A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M125A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M125A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[557px] left-[784px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M097A" placement="top">
              {M097A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M097A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M097A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[463px] left-[780px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M124A" placement="top">
              {M124A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M124A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M124A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[360px] left-[780px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M130A" placement="top">
              {M130A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M130A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M130A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[469px] left-[666px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M131A" placement="top">
              {M131A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M131A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M131A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[357px] left-[679px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M159A" placement="top">
              {M159A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M159A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M159A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[345px] left-[30px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M133A" placement="top">
              {M133A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M133A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M133A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[400px] left-[30px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M134A" placement="top">
              {M134A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M134A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M134A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[370px] left-[90px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M135A" placement="top">
              {M135A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M135A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M135A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[403px] left-[156px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M139A" placement="top">
              {M139A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M139A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M139A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[207px] left-[430px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M145A" placement="top">
              {M145A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M145A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M145A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>

          <div className="z-10 absolute top-[450px] left-[550px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M132A" placement="top">
              {M132A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M132A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M132A", "STOP")} >STOP</Button>}
            </Tooltip>
          </div>




          {/*PLC IP Address 192.168.126.1 */}
          <div className="z-10 absolute top-[315px] left-[795px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M160A" placement="top">
              {M160A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M160A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M160A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[315px] left-[860px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M161A" placement="top">
              {M161A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M161A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M161A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.2 */}
          <div className="z-10 absolute top-[315px] left-[1000px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M121A" placement="top">
              {M121A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M121A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M121A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[315px] left-[1065px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M122A" placement="top">
              {M122A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M122A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M122A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.3 */}
          <div className="z-10 absolute top-[168px] left-[820px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M158A" placement="top">
              {M158A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M158A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M158A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>

          {/*PLC IP Address 192.168.126.243 */}
          <div className="z-10 absolute top-[265px] left-[590px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M141A" placement="top">
              {M141A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M141A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M141A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[320px] left-[635px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M137A" placement="top">
              {M137A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M137A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M137A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>
          <div className="z-10 absolute top-[305px] left-[700px] transform -translate-x-1/2 -translate-y-1/2">
            <Tooltip content="M117A" placement="top">
              {M117A_Status === true ? <Button className="text-cyan-50 w-10" color="success" radius="full" size="sm" onPress={() => handleOpenmodal("M117A", "RUN")} >RUN</Button> : <Button className="text-cyan-50" color="danger" radius="full" size="sm" onPress={() => handleOpenmodal("M117A", "STOP")}>STOP</Button>}
            </Tooltip>
          </div>

        </Card>
      </div>

      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Robot Number : {selMC?.name}</ModalHeader>
              <Divider />
              <ModalBody>
                {isloading ? (
                  <div className="flex flex-col items-center justify-center w-full h-40">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-sm text-gray-600">กำลังโหลดข้อมูล...</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 px-2 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">สถานะเครื่อง:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${selMC?.status === "RUN"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {selMC?.status === "RUN" ? "RUNNING" : "STOPPED"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">รุ่นที่ผลิต:</span>
                      <span className="text-md font-medium text-gray-800">
                        {selMC?.model || "ไม่ระบุ"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">Cycle Time:</span>
                      <span className="text-md font-medium text-blue-700">
                        {selMC?.ct != null ? `${selMC.ct} วินาที` : "ไม่ระบุ"}
                      </span>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  className="w-full font-semibold"
                  color="primary"
                  onPress={onClose}
                >
                  ปิดหน้าต่าง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>

  );
}