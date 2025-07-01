'use client';
import Link from 'next/link';

export const Navbarlogo = () => {
    return (
        <Link className="flex flex-1 flex-row text-center justify-center items-center border-gray-200" href="/">
            <span className="text-xl font-extrabold tracking-widest">
                <span className="text-red-600">R</span>
                <span className="text-red-600">A</span>-
                <span className="text-gray-700">F</span>
                <span className="text-gray-700">E</span>
                <span className="text-gray-700">C</span>
            </span>
        </Link>
    )
}