'use client'

import { useUser } from '@/contexts/UserContext'
import { Crown, Users, User, Settings } from 'lucide-react'

interface RoleBasedInterfaceProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleBasedInterface({ children, fallback }: RoleBasedInterfaceProps) {
  const { userRole, permissions, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4EFF]"></div>
      </div>
    )
  }

  if (!permissions.canCreateGroups && fallback) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Component to show admin-specific features
export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { permissions } = useUser()

  if (!permissions.canCreateGroups) {
    return null
  }

  return <>{children}</>
}

// Component to show member-specific features
export function MemberOnly({ children }: { children: React.ReactNode }) {
  const { permissions } = useUser()

  if (permissions.canCreateGroups) {
    return null
  }

  return <>{children}</>
}

// Role indicator component
export function RoleIndicator() {
  const { userRole } = useUser()

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          icon: Crown,
          text: 'Group Admin',
          color: 'text-purple-600 bg-purple-50',
          borderColor: 'border-purple-200'
        }
      case 'member':
        return {
          icon: User,
          text: 'Member',
          color: 'text-gray-600 bg-gray-50',
          borderColor: 'border-gray-200'
        }
      default:
        return {
          icon: User,
          text: 'Member',
          color: 'text-gray-600 bg-gray-50',
          borderColor: 'border-gray-200'
        }
    }
  }

  const config = getRoleConfig(userRole)
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${config.color} ${config.borderColor} border`}>
      <Icon className="w-4 h-4" />
      <span>{config.text}</span>
    </div>
  )
}

// Dashboard welcome message based on role
export function RoleBasedWelcome() {
  const { userRole } = useUser()

  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          title: 'Welcome back, Group Admin!',
          subtitle: 'Manage your savings groups and track member contributions.',
          features: [
            'Create and manage groups',
            'Track member payments',
            'Send reminders',
            'View analytics'
          ]
        }
      case 'member':
        return {
          title: 'Welcome to Kopa!',
          subtitle: 'Track your savings contributions and group progress.',
          features: [
            'View your groups',
            'Track your payments',
            'See group progress',
            'Receive notifications'
          ]
        }
      default:
        return {
          title: 'Welcome to Kopa!',
          subtitle: 'Start managing your rotational savings.',
          features: [
            'Create your first group',
            'Add members',
            'Track payments',
            'Send reminders'
          ]
        }
    }
  }

  const message = getWelcomeMessage(userRole)

  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {message.title}
      </h1>
      <p className="text-gray-600 mb-4">
        {message.subtitle}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {message.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-[#6B4EFF] rounded-full"></div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 