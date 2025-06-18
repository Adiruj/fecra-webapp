'use client';
import Link from 'next/link';

export const Sidebarlogo = () => {
    return (
        <Link className="flex flex-col items-center py-4 border-b border-gray-200" href="/">
            <span className="text-3xl font-extrabold tracking-widest">
                <span className="text-red-600">R</span>
                <span className="text-red-600">A</span>-
                <span className="text-gray-700">F</span>
                <span className="text-gray-700">E</span>
                <span className="text-gray-700">C</span>
            </span>
            <span className="text-gray-500 text-xs tracking-wider mt-1">Department</span>
        </Link>
    )
}