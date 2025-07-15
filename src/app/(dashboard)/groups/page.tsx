'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Users, DollarSign, Calendar } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

interface Group {
  id: string
  name: string
  member_count: number
  contribution_amount: number
  current_round: number
  total_rounds: number
  next_payment_date: string
}

export default function GroupsPage() {
  const router = useRouter()
  const { userRole, permissions } = useUser()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Family Savings',
        member_count: 8,
        contribution_amount: 50000,
        current_round: 2,
        total_rounds: 8,
        next_payment_date: '2024-01-15',
      },
      {
        id: '2',
        name: 'Business Partners',
        member_count: 5,
        contribution_amount: 100000,
        current_round: 1,
        total_rounds: 5,
        next_payment_date: '2024-01-08',
      },
    ]

    setTimeout(() => {
      setGroups(mockGroups)
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Groups</h1>
            <p className="text-sm text-gray-600">
              {userRole === 'admin' ? 'Manage your groups' : 'Your savings groups'}
            </p>
          </div>
          {permissions.canCreateGroups && (
            <button
              onClick={() => router.push('/groups/create')}
              className="kuda-button flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>Create</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
            <p className="text-gray-600">
              {userRole === 'admin' ? 'Manage your savings groups' : 'Your savings groups'}
            </p>
          </div>
          {permissions.canCreateGroups && (
            <button
              onClick={() => router.push('/groups/create')}
              className="kuda-button flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>Create Group</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="kuda-card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : groups.length === 0 ? (
          <div className="kuda-card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No groups yet</h3>
            <p className="text-gray-600 mb-4">
              {userRole === 'admin' 
                ? 'Create your first savings group to get started'
                : 'Join a savings group to start contributing'
              }
            </p>
            {permissions.canCreateGroups ? (
              <button
                onClick={() => router.push('/groups/create')}
                className="kuda-button"
              >
                Create Group
              </button>
            ) : (
              <button
                onClick={() => router.push('/dashboard')}
                className="kuda-button"
              >
                Browse Groups
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="kuda-card cursor-pointer hover:shadow-xl transition-all duration-200"
                onClick={() => router.push(`/groups/${group.id}`)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <span className="text-sm text-gray-500">{group.member_count} members</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-[#6B4EFF]">
                    {formatCurrency(group.contribution_amount)}
                  </span>
                  <span className="text-sm text-gray-500">per contribution</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Next: {formatDate(group.next_payment_date)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Round</span>
                    <div className="text-sm font-semibold text-gray-900">
                      {group.current_round} of {group.total_rounds}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#6B4EFF] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(group.current_round / group.total_rounds) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 