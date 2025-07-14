'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Plus, Users, TrendingUp, Calendar } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

interface Group {
  id: string
  name: string
  contribution_amount: number
  frequency: 'weekly' | 'monthly'
  member_count: number
  current_round: number
  total_rounds: number
  next_payment_date: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Family Savings',
        contribution_amount: 50000,
        frequency: 'monthly',
        member_count: 8,
        current_round: 2,
        total_rounds: 8,
        next_payment_date: '2024-01-15',
      },
      {
        id: '2',
        name: 'Business Partners',
        contribution_amount: 100000,
        frequency: 'weekly',
        member_count: 5,
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
              Welcome back, {user?.user_metadata?.name || 'User'}! 👋
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Manage your savings groups</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#6B4EFF] rounded-full flex items-center justify-center ml-3 flex-shrink-0">
            <span className="text-white font-semibold text-sm md:text-base">
              {user?.user_metadata?.name?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 md:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600">Active Groups</p>
                <p className="text-xl md:text-2xl font-bold text-gray-900">{groups.length}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-[#6B4EFF]" />
              </div>
            </div>
          </div>

          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-gray-600">Total Savings</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900 truncate">
                  {formatCurrency(groups.reduce((sum, group) => sum + group.contribution_amount, 0))}
                </p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Groups */}
        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Active Groups</h2>
            <button className="text-[#6B4EFF] text-xs md:text-sm font-medium hover:underline">
              View All
            </button>
          </div>

          {loading ? (
            <div className="space-y-3 md:space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="kuda-card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : groups.length === 0 ? (
            <div className="kuda-card text-center py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No groups yet</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">Create your first savings group to get started</p>
              <button
                onClick={() => router.push('/groups/create')}
                className="kuda-button text-sm md:text-base"
              >
                Create Group
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="kuda-card cursor-pointer hover:shadow-xl transition-all duration-200"
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate flex-1">{group.name}</h3>
                    <span className="text-xs md:text-sm text-gray-500 ml-2 flex-shrink-0">{group.member_count} members</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg md:text-2xl font-bold text-[#6B4EFF] truncate">
                      {formatCurrency(group.contribution_amount)}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 capitalize ml-2 flex-shrink-0">{group.frequency}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-600 truncate">
                        Next: {formatDate(group.next_payment_date)}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-gray-600">Round</span>
                      <div className="text-xs md:text-sm font-semibold text-gray-900">
                        {group.current_round} of {group.total_rounds}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className="bg-[#6B4EFF] h-1.5 md:h-2 rounded-full transition-all duration-300"
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

      {/* Floating Action Button */}
      <button
        onClick={() => router.push('/groups/create')}
        className="kuda-floating-button"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <BottomNavigation />
    </div>
  )
} 