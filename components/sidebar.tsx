"use client";

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react";
import { HomeIcon, UserIcon, ClipboardDocumentCheckIcon, ChevronUpIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

import { SideBarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItem } from "./collapse-items";
import { Sidebarlogo } from "./SideBarlogo";


export const SidebarWrapper = () => {

    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <aside className="h-screen sticky top-0 z-[202]">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/30 z-[201]"
                    role="button"
                    tabIndex={0}
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div
                className="
                scrollbar-hide
                flex-col
                top-0 
                h-full
                w-64
                bg-white
                border-r
                transition-transform
                duration-200
                overflow-y-auto
                py-2"
            >
                {/* Hearder */}
                <Sidebarlogo />

                {/* Body */}
                <div
                    className="flex flex-col justify-between flex-1 overflow-y-auto p-4"
                >
                    <div className="space-y-2">
                        <SideBarItem
                            href="/"
                            icon={pathname === '/' ? <HomeIcon className="w-5 h-5 fill-blue-600" /> : <HomeIcon className="w-5 h-5 fill-gray-500" />}
                            isActive={pathname === '/'}
                            title="Home"
                        />

                        <SidebarMenu title="Main Menu">
                            <div className='space-y-2'>
                                <SideBarItem
                                    href="/emp"
                                    icon={pathname === '/emp' ? <UserIcon className="w-5 h-5 fill-blue-600" /> : <UserIcon className="w-5 h-5 fill-gray-500" />}
                                    isActive={pathname === '/emp'}
                                    title="Employee"
                                />
                                <SideBarItem
                                    href="/partlist"
                                    icon={pathname === '/partlist' ? <ClipboardDocumentCheckIcon className="w-5 h-5 fill-blue-600" /> : <ClipboardDocumentCheckIcon className="w-5 h-5 fill-gray-500" />}
                                    isActive={pathname === '/partlist'}
                                    title="Part List"
                                />
                                <CollapseItem
                                    icon={<ChevronUpIcon className="w-5 h-5 fill-gray-500" />}
                                    iconF={<ComputerDesktopIcon className="w-5 h-5 fill-gray-500" />}
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
                            </div>
                        </SidebarMenu>

                        <SidebarMenu title="Setting">
                            <SideBarItem
                                href="/user"
                                icon={pathname === '/user' ? <UserIcon className="w-5 h-5 fill-blue-600" /> : <UserIcon className="w-5 h-5 fill-gray-500" />}
                                isActive={pathname === '/user'}
                                title="User"
                            />
                        </SidebarMenu>
                    </div>
                </div>
            </div>
        </aside>
    )
}
