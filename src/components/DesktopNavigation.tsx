'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUser } from '@/contexts/UserContext'
import { 
  Home, 
  Users, 
  History, 
  Bell, 
  Settings, 
  Plus,
  LogOut,
  User,
  Crown
} from 'lucide-react'
import { RoleIndicator } from './RoleBasedInterface'

export default function DesktopNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const { userRole, permissions } = useUser()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      show: true
    },
    {
      name: 'Groups',
      href: '/groups',
      icon: Users,
      show: true
    },
    {
      name: 'History',
      href: '/history',
      icon: History,
      show: true
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: Bell,
      show: true
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      show: true
    }
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <div className="w-8 h-8 bg-[#6B4EFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kopa</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-[#6B4EFF] text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {/* Right Side - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Create Group Button (Admin Only) */}
          {permissions.canCreateGroups && (
            <button
              onClick={() => router.push('/groups/create')}
              className="flex items-center space-x-2 bg-[#6B4EFF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5A3FD9] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
          )}

          {/* Role Indicator */}
          <RoleIndicator />

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-[#6B4EFF] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.user_metadata?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.user_metadata?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <div className="mt-2">
                    <RoleIndicator />
                  </div>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push('/settings')
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      router.push('/profile')
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  {userRole === 'admin' && (
                    <button
                      onClick={() => {
                        router.push('/admin')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  )
} 