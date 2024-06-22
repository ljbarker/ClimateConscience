'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <nav className="flex flex-row justify-between m-4">
            <div className="logo">
                <Link href="/">
                    <span className='font-bold italic text-green-600 text-2xl'>Climate Conscience</span>
                </Link>
            </div>
            <div className="menu">
                <div className="avatar" onClick={toggleSidebar}>
                    <Image src="/avatar-icon.png" width={20} height={20} alt="Avatar" />
                </div>
            </div>
            {showSidebar && (
                <div className="sidebar">
                    {/* Sidebar content */}
                </div>
            )}
        </nav>
    );
};