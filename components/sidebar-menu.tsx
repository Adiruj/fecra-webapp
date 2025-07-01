import { clsx } from "clsx";

interface Props {
    title: string;
    children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
    return (
        <div className='flex-col gap-2 py-2'>
            <div className='text-sm col-span-1'>
                {title}
            </div>
            {children}
        </div>
    )
}