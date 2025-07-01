'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardBody, CardHeader, Link } from "@heroui/react";
import { Form, Input, Button } from "@heroui/react";
import { Lock, User } from "lucide-react";
import { Alert, CircularProgress } from "@heroui/react";

export default function DocsPage() {
  const router = useRouter();
  const { status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [err, setErr] = useState(false)
  const [loging, setLogging] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col items-start">
        <p className="text-4xl font-prompt text-white">SIGN IN</p>
        <p className="text-lg text-gray-100">เข้าสู่ระบบ</p>
      </div>

      {/* Case ยังไม่ได้ Login จะแสดงออกมา */}
      <div className="flex items-center justify-center md:py-15 py-6">
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
          <CardBody className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">เข้าสู่ระบบ</h2>

            <Form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setLogging(true)
                setErr(false)
                const res = await signIn("credentials", {
                  username,
                  password,
                  redirect: false,
                });

                if (res?.error) {
                  setErrorMsg("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
                  setErr(true)
                  setLogging(false)
                } else {
                  const waitSession = async () => {
                    for (let i = 0; i < 10; i++) {
                      if (status === "authenticated") {
                        router.replace("/")
                        setLogging(false)
                      }
                      await new Promise((r) => setTimeout(r, 200));
                    }
                    router.replace("/");
                  }
                  
                  waitSession();
                }
              }}
            >
              <div className="space-y-1 w-full">
                <label className="text-sm font-medium text-gray-600" htmlFor="username">ชื่อผู้ใช้</label>
                <Input
                  isRequired
                  className="bg-white rounded-lg"
                  name="username"
                  placeholder="ระบุชื่อผู้ใช้งาน"
                  startContent={<User className="text-gray-400 w-5 h-5" />}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="space-y-1 w-full">
                <label className="text-sm font-medium text-gray-600" htmlFor="password">รหัสผ่าน</label>
                <Input
                  isRequired
                  className="bg-white rounded-lg"
                  name="password"
                  placeholder="ระบุรหัสผ่าน"
                  startContent={<Lock className="text-gray-400 w-5 h-5" />}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loging === false ? <Button className="w-full text-medium" color="primary" isDisabled={loging} type="submit"  >
                เข้าสู่ระบบ
              </Button> :
                <Button className="w-full text-medium" color="primary" isDisabled={loging} type="submit"  >
                  <div className="flex flex-row gap-4 items-center justify-center justify-items-center">
                    <CircularProgress aria-label="Loading..." size="sm" /> กำลังเข้าสู่ระบบ...
                  </div>

                </Button>
              }

            </Form>
            {errorMsg && (
              <div className="flex justify-center transition-all duration-1000 ease-in-out">
                <Alert color="danger" title={errorMsg} />
              </div>
            )}
          </CardBody>
        </Card>
      </div>

    </div>
  );
}
