'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, History, Bell, Settings } from 'lucide-react'

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/groups', icon: Users, label: 'Groups' },
    { href: '/history', icon: History, label: 'History' },
    { href: '/notifications', icon: Bell, label: 'Alerts' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 md:hidden z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-all ${
                isActive
                  ? 'text-[#6B4EFF] bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 