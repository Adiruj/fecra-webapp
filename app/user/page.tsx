'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { startTransition } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Form, Input, Button, Avatar } from "@heroui/react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import { toast } from "react-toastify";
import { AlertTriangle, CheckCircle, XCircle, Save, Loader2 } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import dayjs from "dayjs";


const levellist = [
  {label:"L1" , key:"L1" ,description:"L1"},
  {label:"L2" , key:"L2" ,description:"L2"},
  {label:"L3" , key:"L3" ,description:"L3"},
  {label:"L4" , key:"L4" ,description:"L4"},
  {label:"L5" , key:"L5" ,description:"L5"},
  {label:"L6" , key:"L6" ,description:"L6"},
  {label:"L7" , key:"L7" ,description:"L7"},
  {label:"L8" , key:"L8" ,description:"L8"},
  {label:"L9" , key:"L9" ,description:"L9"},
]

export default function DocsPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isSubmitting, setIssubmitting] = useState(false);
  const [isSuccess, setIssuccess] = useState(false);

  const [id, setId] = useState(session?.user.id)
  const [empid, setEmpid] = useState(session?.user.emp_id)
  const [empfname, setEmpfname] = useState(session?.user.emp_fname)
  const [empsname, setEmpsname] = useState(session?.user.emp_sname)
  const [emplv, setEmplv] = useState(session?.user.emp_level)
  const [empemain, setEmpemain] = useState(session?.user.emp_email)
  const [emppos, setEmppos] = useState(session?.user.emp_position)
  const [emptel, setEmptel] = useState(session?.user.emp_tel)
  const [empstart, setEmpstart] = useState<undefined | Date>(session?.user.emp_startwork)

  useEffect(() => {
    if (status === "authenticated") {
      setEmpid(session?.user.emp_id)
      setEmpfname(session?.user.emp_fname)
      setEmpsname(session?.user.emp_sname)
      setEmplv(session?.user.emp_level)
      setEmpemain(session?.user.emp_email)
      setEmppos(session?.user.emp_position)
      setEmptel(session?.user.emp_tel)
      setEmpstart(session.user.emp_startwork ? new Date(session.user.emp_startwork) : undefined);
      setId(session?.user.id)
    }
  }, [status, session])

  function formatDateLocal(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const updateuser = async ({ emp_id, emp_fname, emp_sname, emp_level, emp_position, emp_email, emp_tel, emp_startwork, id }:
    { emp_id: string, emp_fname: string, emp_sname: string, emp_level: string, emp_position: string, emp_email: string, emp_tel: string, emp_startwork: Date, id: number }) => {
    const formattedDate = formatDateLocal(emp_startwork);
    const res = await fetch("/api/radata/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emp_id, emp_fname, emp_sname, emp_level, emp_position, emp_email, emp_tel, emp_startwork: formattedDate, id }),
    })

    if (!res.ok) throw new Error("Update failed");

    const data = await res.json();

    return data;
  }

  const handleSubmit = async () => {
    setIssuccess(false);
    try {
      await updateuser({ emp_id: empid!, emp_fname: empfname!, emp_sname: empsname!, emp_level: emplv!, emp_position: emppos!, emp_email: empemain!, emp_tel: emptel!, emp_startwork: empstart! as Date, id: id! })
      await update()
      setIssuccess(true);
      await new Promise((r) => setTimeout(r, 1000));
    } catch (error) {
      setIssuccess(false);
    } finally {
      setIssubmitting(false);
      setIssuccess(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col items-start">
        <p className="text-4xl font-prompt text-white">Account</p>
        <p className="text-lg text-gray-100">ข้อมูลผู้ใช้งาน</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
        <Card className="w-full py-6 px-8 shadow-lg rounded-xl bg-white xl:col-span-2">
          <CardBody>
            <div className="flex flex-col items-center gap-8">
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
              >
                <Avatar
                  className="w-[160px] h-[160px] rounded-full ring-4 ring-primary shadow-md"
                  src={session?.user.emp_avatar || "/user/avatar.png"}
                />
              </motion.div>
              <div className="text-center space-y-1">
                <p className="text-sm text-gray-500">สวัสดีครับ</p>
                <p className="text-xl font-semibold text-gray-800">
                  คุณ {session?.user.emp_fname} {session?.user.emp_sname}
                </p>
                <p className="text-gray-600">รหัสพนักงาน: <span className="font-medium">{session?.user.emp_id}</span></p>
                <p className="text-gray-600">ระดับ: <span className="font-medium">{session?.user.emp_level}</span></p>
                <p className="text-gray-600">ส่วนงาน: <span className="font-medium">ROBOT & AUTOMATION</span></p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full xl:col-span-4 ">
          <CardBody className="py-4 px-4 container">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-gray-800">ข้อมูลผู้ใช้งาน</h2>
              <Form>
                <div className=" grid md:grid-cols-6 items-center w-full gap-2">
                  <label className="text-medium font-medium text-gray-600 md:col-span-1" htmlFor="empid">รหัสพนักงาน :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2 text-medium"
                    name="empid"
                    type="text"
                    value={empid}
                    onChange={(e) => setEmpid(e.target.value)}
                  />
                  <label className="text-medium font-medium text-gray-600  md:col-span-1 md:text-left md:px-4" htmlFor="empstart">วันเริ่มงาน :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2 text-medium"
                    name="empstart"
                    type="date"
                    value={empstart ? dayjs(empstart).format('YYYY-MM-DD') : ''}
                    onChange={(e) => setEmpstart(new Date(e.target.value))}
                  />
                </div>

                <div className=" grid md:grid-cols-6 grid-cols-1 items-center w-full gap-2 py-2">
                  <label className="text-medium font-medium text-gray-600 md:col-span-1 col-span-1" htmlFor="empname">ชื่อ :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2 col-span-1"
                    name="empname"
                    type="text"
                    value={empfname}
                    onChange={(e) => setEmpfname(e.target.value)}
                  />
                  <label className="text-medium font-medium text-gray-600 col-span-1 md:col-span-1 md:text-left md:px-4" htmlFor="empname">นามสกุล :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg col-span-1 md:col-span-2"
                    name="empname"
                    type="text"
                    value={empsname}
                    onChange={(e) => setEmpsname(e.target.value)}
                  />
                </div>

                <div className=" grid md:grid-cols-6 items-center w-full gap-2 py-2">
                  <label className="text-medium font-medium text-gray-600 md:col-span-1" htmlFor="emppos">ตำแหน่ง :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2"
                    name="emppos"
                    type="text"
                    value={emppos}
                    onChange={(e) => setEmppos(e.target.value)}
                  />
                  <label className="text-medium font-medium text-gray-600  md:col-span-1 md:text-left md:px-4" htmlFor="emplv">ระดับ :</label>
                  <Autocomplete className="md:col-span-2" selectedKey={emplv} onSelectionChange={(key) => setEmplv(key as string)}>
                    {levellist.map((level) =>(
                      <AutocompleteItem key={level.key}>{level.label}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                  {/*<Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2"
                    name="emplv"
                    type="text"
                    value={emplv}
                    onChange={(e) => setEmplv(e.target.value)}
                  />*/}
                </div>

                <div className=" grid md:grid-cols-6 items-center w-full gap-2">
                  <label className="text-medium font-medium text-gray-600 md:col-span-1" htmlFor="emppos">Email :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2"
                    name="emppos"
                    type="text"
                    value={empemain}
                    onChange={(e) => setEmpemain(e.target.value)}
                  />
                  <label className="text-medium font-medium text-gray-600  md:col-span-1 md:text-left md:px-4" htmlFor="emplv">Tel :</label>
                  <Input
                    isRequired
                    className="bg-white rounded-lg md:col-span-2"
                    name="emplv"
                    type="text"
                    value={emptel}
                    onChange={(e) => setEmptel(e.target.value)}
                  />
                </div>

              </Form>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex w-full justify-end">
              <Button
                className="md:w-full w-full inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-md transition"
                onPress={() => {
                  if (!empid?.trim() || !empstart || !empfname?.trim() || !empsname?.trim() || !emppos?.trim() || !emplv?.trim() || !empemain?.trim() || !emptel?.trim()) {

                  } else {
                    onOpen();
                  }
                }}
              >
                <Save className="w-5 h-5" />
                บันทึกข้อมูล
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/*Model Confirm Save Data*/}
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} >
        <ModalContent>
          {(onclose) => (
            <ModalBody>
              <div className="flex flex-col items-center text-center space-y-4 py-4">
                {isSubmitting && !isSuccess ?
                  <>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full">
                      <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      กำลังบันทึกข้อมูล....
                    </h2>
                  </> : isSuccess ? <>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-600 animate-appearance-in " />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      บันทึกข้อมูลสำเร็จ
                    </h2>
                  </> :
                    <>
                      <AlertTriangle className="w-12 h-12 text-yellow-500 animate-bounce" />
                      <h2 className="text-lg font-semibold text-gray-800">
                        ยืนยันการบันทึกข้อมูล ?
                      </h2>
                      <p className="text-sm text-gray-500">
                        โปรดตรวจสอบข้อมูลก่อนทำการบันทึก
                      </p>
                    </>}


                <div className="flex gap-4 pt-4">
                  <Button
                    className={`inline-flex items-center gap-2 px-4 py-2 text-white transition rounded-md
                                ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    color="success"
                    disabled={isSubmitting}
                    onPress={async () => {
                      setIssubmitting(true);
                      try {
                        await handleSubmit();
                        router.push("/user");
                      } catch (error) {
                        toast.error("เกิดข้อผิดพลาดในการบันทึก");
                      } finally {
                        onclose();
                        setIssubmitting(false);
                      }
                    }}
                  >
                    {isSubmitting ? <div className="flex gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      กำลังบันทึก....
                    </div> :
                      <div className="flex gap-2">
                        <CheckCircle className="w-5 h-5" />
                        บันทึก
                      </div>
                    }
                  </Button>
                  <Button
                    className="inline-flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition rounded-md"
                    color="danger"
                    onPress={onclose}
                  >
                    <XCircle className="w-5 h-5" />
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

    </div >



  );
}
