'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '@/lib/supabase'
import { UserRole, UserPermissions, getUserPermissions } from '@/lib/types'

interface UserContextType {
  userRole: UserRole
  permissions: UserPermissions
  isLoading: boolean
  updateUserRole: (role: UserRole) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [userRole, setUserRole] = useState<UserRole>('member')
  const [permissions, setPermissions] = useState<UserPermissions>(getUserPermissions('member'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole('member')
        setPermissions(getUserPermissions('member'))
        setIsLoading(false)
        return
      }

      try {
        // Check if user is a group admin
        const { data: adminGroups, error: adminError } = await supabase
          .from('groups')
          .select('id')
          .eq('admin_id', user.id)
          .eq('is_active', true)

        if (adminError) {
          console.error('Error fetching admin groups:', adminError)
        }

        // Check if user is a member of any groups
        const { data: memberGroups, error: memberError } = await supabase
          .from('group_members')
          .select('group_id, is_admin')
          .eq('user_id', user.id)

        if (memberError) {
          console.error('Error fetching member groups:', memberError)
        }

        // Determine user role
        let role: UserRole = 'member'
        
        if (adminGroups && adminGroups.length > 0) {
          role = 'admin'
        } else if (memberGroups && memberGroups.length > 0) {
          // Check if they're admin of any group they're a member of
          const isAdminOfAnyGroup = memberGroups.some(mg => mg.is_admin)
          if (isAdminOfAnyGroup) {
            role = 'admin'
          }
        }

        setUserRole(role)
        setPermissions(getUserPermissions(role))
      } catch (error) {
        console.error('Error determining user role:', error)
        setUserRole('member')
        setPermissions(getUserPermissions('member'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserRole()
  }, [user])

  const updateUserRole = async (role: UserRole) => {
    setUserRole(role)
    setPermissions(getUserPermissions(role))
  }

  return (
    <UserContext.Provider value={{ userRole, permissions, isLoading, updateUserRole }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 