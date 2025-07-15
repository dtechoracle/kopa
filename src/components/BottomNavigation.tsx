'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Home, Users, History, Bell, Settings } from 'lucide-react'

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Groups',
      href: '/groups',
      icon: Users,
    },
    {
      name: 'History',
      href: '/history',
      icon: History,
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
      <div className="flex items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-[#6B4EFF]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
} 