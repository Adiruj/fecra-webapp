'use client';

import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ToggleContext } from "@/styles/layout-context";

interface Props {
    icon: React.ReactNode;
    iconF: React.ReactNode;
    title: string;
    item: { name: string, href: string }[],
    isActive?: boolean
}

export const CollapseItem = ({ icon, iconF, title, item, isActive }: Props) => {
    const [toggle, setToggle] = useState(isActive ?? false);
    //const {toggle , setToggle} = useTogglecontext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isActive) {
            setToggle(true);
        }
    }, [isActive]);

    const handleToggle = () => setToggle(!toggle);

    return (
        <div>
            <div className={clsx(
                "flex flex-row w-full h-full min-h-[44px]",
                "items-center gap-2 px-4 rounded-lg cursor-pointer transition-all duration-150 active:scale-95",
            )}
                role="button" onClick={handleToggle} >
                {iconF}
                {title}
                <div className={clsx(
                    toggle ? 'rotate-180 transition-all duration-400 ' : 'rotate-0 transition-all duration-400',
                    'justify-items-end'
                )}>
                    {icon}
                </div>
            </div>
            <ToggleContext.Provider 
                value={{
                    toggle: toggle,
                    setToggle: handleToggle
                }}
            >
                <div
                    className={clsx(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        toggle ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="flex flex-col px-11 space-y-1 text-gray-500">
                        {item.map((subItem, index) => (
                            <div key={index} className={clsx(
                                "hover:text-blue-800",
                                pathname === subItem.href ? "text-blue-700" : "text-gray-500"
                            )}
                                role="button"
                                onClick={() => router.push(subItem.href)}
                            >
                                {subItem.name}
                            </div>
                        ))}
                    </div>
                </div>
            </ToggleContext.Provider>
        </div >


    )
}