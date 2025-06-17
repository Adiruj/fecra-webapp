import NextLink from 'next/link';
import clsx from 'clsx';

import { useSidebarcontext } from '@/styles/layout-context';


interface Props {
    title: string,
    icon: React.ReactNode,
    isActive?: boolean,
    href?: string
}

export const SideBarItem = ({ title, icon, isActive, href = '/' }: Props) => {
    const { collapsed, setCollapsed } = useSidebarcontext();

    return (
        <div>
            <NextLink href={href}>
                <div className={clsx('flex w-full h-full min-h-[44px]',
                    'items-center gap-2 px-4',
                    'rounded-lg cursor-pointer transition-all duration-150',
                    'ease-in-out active:scale-95',
                    isActive ? 'bg-blue-200' : 'hover:bg-gray-200')}
                >
                    <div className='flex items-center justify-center'>
                        {icon}
                    </div>
                    <div className=' text-gray-800'>
                        {title}
                    </div>
                </div>
            </NextLink>
        </div>

    )
}