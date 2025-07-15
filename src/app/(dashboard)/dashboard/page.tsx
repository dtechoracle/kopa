'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, TrendingUp, Users, DollarSign, Calendar, Crown } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'
import { RoleBasedWelcome, RoleIndicator, AdminOnly, MemberOnly } from '@/components/RoleBasedInterface'
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

export default function DashboardPage() {
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
      {/* Mobile Header - Only show on mobile */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
              <RoleIndicator />
            </div>
            <p className="text-sm md:text-base text-gray-600">
              {userRole === 'admin' ? 'Manage your groups' : 'Track your contributions'}
            </p>
          </div>
          <AdminOnly>
            <button
              onClick={() => router.push('/groups/create')}
              className="kuda-button flex items-center justify-center"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
              <span className="text-sm md:text-base">Create Group</span>
            </button>
          </AdminOnly>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-7xl mx-auto">
        {/* Welcome Message */}
        <RoleBasedWelcome />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Groups</p>
                <p className="text-2xl font-bold text-[#6B4EFF]">{groups.length}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#6B4EFF]" />
              </div>
            </div>
          </div>

          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-green-600">
                  {groups.reduce((sum, group) => sum + group.member_count, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(groups.reduce((sum, group) => sum + group.contribution_amount, 0))}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="kuda-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Payment</p>
                <p className="text-2xl font-bold text-blue-600">
                  {groups.length > 0 ? formatDate(groups[0].next_payment_date) : 'N/A'}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Groups Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {userRole === 'admin' ? 'Your Groups' : 'Your Groups'}
            </h2>
            <button
              onClick={() => router.push('/groups')}
              className="text-[#6B4EFF] hover:text-[#5A3FD9] text-sm font-medium"
            >
              View All
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="kuda-card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : groups.length === 0 ? (
            <div className="kuda-card text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {userRole === 'admin' ? 'No groups yet' : 'No groups yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {userRole === 'admin' 
                  ? 'Create your first savings group to get started'
                  : 'Join a savings group to start contributing'
                }
              </p>
              <AdminOnly>
                <button
                  onClick={() => router.push('/groups/create')}
                  className="kuda-button"
                >
                  Create Group
                </button>
              </AdminOnly>
              <MemberOnly>
                <button
                  onClick={() => router.push('/groups')}
                  className="kuda-button"
                >
                  Browse Groups
                </button>
              </MemberOnly>
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

        {/* Admin-Only Features */}
        <AdminOnly>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="kuda-card hover:shadow-xl transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#6B4EFF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Manage Groups</h3>
                  <p className="text-sm text-gray-600">Create and manage your groups</p>
                </div>
              </div>
            </button>

            <button className="kuda-card hover:shadow-xl transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-600">View detailed insights</p>
                </div>
              </div>
            </button>
          </div>
        </AdminOnly>

        {/* Member-Only Features */}
        <MemberOnly>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="kuda-card hover:shadow-xl transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">My Payments</h3>
                  <p className="text-sm text-gray-600">Track your contributions</p>
                </div>
              </div>
            </button>

            <button className="kuda-card hover:shadow-xl transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Payment History</h3>
                  <p className="text-sm text-gray-600">View past transactions</p>
                </div>
              </div>
            </button>
          </div>
        </MemberOnly>
      </div>

      <BottomNavigation />
    </div>
  )
} 