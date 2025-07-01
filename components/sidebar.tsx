"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react";
import { HomeIcon, UserIcon, ClipboardDocumentCheckIcon, ChevronUpIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { Button } from "@heroui/button";
import { Avatar, CircularProgress } from "@heroui/react";
import { BotIcon, ClipboardList, House, FileSearch, UserCog } from "lucide-react";


import { SideBarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItem } from "./collapse-items";
import { Sidebarlogo } from "./SideBarlogo";

export const SidebarWrapper = () => {
    const { data: session, status } = useSession();

    const router = useRouter();
    const pathname = usePathname();
    const [logout, setLogout] = useState(false)

    const handleOut = async () => {
        setLogout(true)
        await signOut({ redirect: false });
        router.refresh();
        setLogout(false)
    }

    return (

        <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full md:p-0 md:my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 md:max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0 scrollbar-hide" >
            <div
                className="
                flex
                flex-col
                h-full
                md:w-64
               bg-white
                border-r
              text-gray-800
                transition-transform
                duration-200
                scrollbar-hide
                py-2"
            >
                <div className="shrink-0">
                    <Sidebarlogo />
                </div>

                {/* Body */}
                <div
                    className="flex flex-col justify-between flex-1 p-4 overflow-auto scrollbar-hide scroll-smooth"
                >
                    <div className="space-y-2">
                        <SideBarItem
                            href="/"
                            icon={pathname === '/' ? <House className="w-5 h-5 " /> : <House className="w-5 h-5 " />}
                            isActive={pathname === '/'}
                            title="Home"
                        />

                        <SidebarMenu title="Main Menu">
                            <div className='space-y-2'>
                                {/*<SideBarItem
                                    href="/emp"
                                    icon={pathname === '/emp' ? <UserIcon className="w-5 h-5 fill-blue-600" /> : <UserIcon className="w-5 h-5 fill-gray-500" />}
                                    isActive={pathname === '/emp'}
                                    title="Employee"
                                />*/}
                                <SideBarItem
                                    href="/partlist"
                                    icon={pathname === '/partlist' ? <ClipboardList className="w-5 h-5" /> : <ClipboardList className="w-5 h-5 " />}
                                    isActive={pathname === '/partlist'}
                                    title="Part List"
                                />
                                <CollapseItem
                                    icon={<ChevronUpIcon className="w-5 h-5 fill-gray-500" />}
                                    iconF={<BotIcon className="w-5 h-5" />}
                                    isActive={
                                        pathname === '/robot/prm' ||
                                        pathname === '/robot/anod' ||
                                        pathname === '/robot/ppp' ||
                                        pathname === '/robot/htp' ||
                                        pathname === '/robot/pnt'
                                    }
                                    item={[
                                        { name: "PRM Line", href: '/robot/prm' }, //"PRM Line","Anodize","PPP Line","HTP Line","PNT Line"
                                        { name: "Anodize Line", href: '/robot/anod' },
                                        { name: "PPP Line", href: '/robot/ppp' },
                                        { name: "HTP Line", href: '/robot/htp' },
                                        { name: "PNT Line", href: '/robot/pnt' }
                                    ]}
                                    title="Robot Monitor"

                                />
                                <SideBarItem
                                    href="/robotdatalog"
                                    icon={pathname === '/robotdatalog' ? <FileSearch className="w-5 h-5" /> : <FileSearch className="w-5 h-5" />}
                                    isActive={pathname === '/robotdatalog'}
                                    title="Robot datalog"
                                />
                            </div>
                        </SidebarMenu>

                        <SidebarMenu title="Setting">
                            <SideBarItem
                                href="/user"
                                icon={pathname === '/user' ? <UserCog className="w-5 h-5" /> : <UserCog className="w-5 h-5" />}
                                isActive={pathname === '/user'}
                                title="Account"
                            />
                        </SidebarMenu>
                    </div>
                </div>
                <div className="p-4 shrink-0 border-t">
                    {status === "authenticated" ?
                        <div className="flex flex-col items-center justify-center gap-4">
                            <Avatar
                                className="w-16 h-16 text-lg"
                                name={`${session?.user.emp_fname} ${session?.user.emp_sname}`}
                                src={session?.user.emp_avatar || "/user/avatar.png"}
                            />
                            <div className="text-center w-full max-w-[200px] mx-auto">
                                <p className="text-medium font-semibold text-gray-800 truncate text-[clamp(14px,4vw,18px)]"
                                    title={`สวัสดี ${session?.user.emp_fname} ${session?.user.emp_sname}`}>
                                    สวัสดี {session?.user.emp_fname} {session?.user.emp_sname}
                                </p>
                                <p className="text-sm text-gray-500">
                                    รหัสพนักงาน: {session?.user.emp_id} ระดับ: {session?.user.emp_level}
                                </p>
                            </div>
                            {logout === true ?
                                <Button
                                    className="w-full"
                                    color="danger"
                                    variant="bordered"
                                    onPress={handleOut}
                                >
                                    <CircularProgress aria-label="Logout..." size="sm" /> กำลังออกจากระบบ...
                                </Button> :
                                <Button
                                    className="w-full"
                                    color="danger"
                                    variant="bordered"
                                    onPress={handleOut}
                                >
                                    ออกจากระบบ
                                </Button>}

                        </div>

                        : <Button className="w-full" color="primary" variant="bordered" onPress={() => {
                            router.push("/signin")
                        }}>
                            Login
                        </Button>

                    }
                </div>
            </div>
        </aside>


    )
}


/**className="
                flex
                flex-col
                top-0
                h-screen
                w-64
               bg-white
                border-r
              text-gray-800
                transition-transform
                duration-200
                overflow-y-auto
                scrollbar-hide
                py-2" */
