'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Search, Filter } from 'lucide-react'
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
  is_active: boolean
}

export default function GroupsPage() {
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

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
        is_active: true,
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
        is_active: true,
      },
      {
        id: '3',
        name: 'Church Group',
        contribution_amount: 25000,
        frequency: 'monthly',
        member_count: 12,
        current_round: 8,
        total_rounds: 12,
        next_payment_date: '2024-01-20',
        is_active: false,
      },
    ]

    setTimeout(() => {
      setGroups(mockGroups)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && group.is_active) ||
      (filter === 'completed' && !group.is_active)
    
    return matchesSearch && matchesFilter
  })

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
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Groups</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Manage your savings groups</p>
          </div>
          <button
            onClick={() => router.push('/groups/create')}
            className="kuda-button flex items-center justify-center ml-3"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            <span className="text-sm md:text-base">Create</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 md:space-y-6">
        {/* Search and Filter */}
        <div className="space-y-3 md:space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="kuda-input pl-10 md:pl-12 text-sm md:text-base"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#6B4EFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filter === 'active'
                  ? 'bg-[#6B4EFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                filter === 'completed'
                  ? 'bg-[#6B4EFF] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Groups List */}
        <div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="kuda-card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="kuda-card text-center py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Filter className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No groups found</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first group to get started'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push('/groups/create')}
                  className="kuda-button"
                >
                  Create Group
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className={`kuda-card cursor-pointer hover:shadow-xl transition-all duration-200 ${
                    !group.is_active ? 'opacity-75' : ''
                  }`}
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-2 md:space-x-3 flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">{group.name}</h3>
                      {!group.is_active && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
                          Completed
                        </span>
                      )}
                    </div>
                    <span className="text-xs md:text-sm text-gray-500 flex-shrink-0">{group.member_count} members</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg md:text-2xl font-bold text-[#6B4EFF]">
                      {formatCurrency(group.contribution_amount)}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 capitalize">{group.frequency}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm text-gray-600">
                        Next: {formatDate(group.next_payment_date)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs md:text-sm text-gray-600">Round</span>
                      <div className="text-xs md:text-sm font-semibold text-gray-900">
                        {group.current_round} of {group.total_rounds}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                          group.is_active ? 'bg-[#6B4EFF]' : 'bg-gray-400'
                        }`}
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

        {/* Stats */}
        {filteredGroups.length > 0 && (
          <div className="kuda-card">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#6B4EFF]">
                  {filteredGroups.filter(g => g.is_active).length}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Active Groups</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredGroups.reduce((sum, group) => sum + group.contribution_amount, 0)
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Total Contributions</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
} 