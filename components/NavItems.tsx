'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/lib/constants'

const NavItems = () => {
    const pathname = usePathname()
    const isActive = (path: string) => {
        if(pathname === '/') return pathname === '/'

        return pathname.startsWith(path)
    }
    
    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                    <Link href={item.href} className={`hover:text-yellow-500 transition-colors ${isActive(item.href) ? 'text-gray-100' : ''}`}>{item.label}</Link>
                </li>
            ))}
        </ul>
    )
}

export default NavItems