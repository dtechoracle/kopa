// User roles and permissions
export type UserRole = 'member' | 'admin' | 'super_admin'

export interface UserPermissions {
  canCreateGroups: boolean
  canManageMembers: boolean
  canViewAllGroups: boolean
  canDeleteGroups: boolean
  canSendReminders: boolean
  canViewAnalytics: boolean
}

export interface GroupMember {
  id: string
  user_id: string | null
  name: string
  phone: string
  email: string | null
  role: UserRole
  is_admin: boolean
  joined_at: string
}

export interface Group {
  id: string
  name: string
  description: string | null
  contribution_amount: number
  frequency: 'weekly' | 'monthly'
  start_date: string
  admin_id: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Helper functions for role-based access
export const getUserPermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'super_admin':
      return {
        canCreateGroups: true,
        canManageMembers: true,
        canViewAllGroups: true,
        canDeleteGroups: true,
        canSendReminders: true,
        canViewAnalytics: true,
      }
    case 'admin':
      return {
        canCreateGroups: true,
        canManageMembers: true,
        canViewAllGroups: false, // Only their own groups
        canDeleteGroups: true,
        canSendReminders: true,
        canViewAnalytics: true,
      }
    case 'member':
      return {
        canCreateGroups: false,
        canManageMembers: false,
        canViewAllGroups: false,
        canDeleteGroups: false,
        canSendReminders: false,
        canViewAnalytics: false,
      }
    default:
      return {
        canCreateGroups: false,
        canManageMembers: false,
        canViewAllGroups: false,
        canDeleteGroups: false,
        canSendReminders: false,
        canViewAnalytics: false,
      }
  }
} 