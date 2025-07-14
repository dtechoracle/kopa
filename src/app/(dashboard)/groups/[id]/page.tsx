'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, Clock, User, Phone, Calendar, DollarSign } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

interface Member {
  id: string
  name: string
  phone: string
  status: 'paid' | 'pending' | 'next'
  roundNumber: number
  paidAt?: string
}

interface Group {
  id: string
  name: string
  contribution_amount: number
  frequency: 'weekly' | 'monthly'
  current_round: number
  total_rounds: number
  next_payment_date: string
  members: Member[]
}

export default function GroupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockGroup: Group = {
      id: params.id as string,
      name: 'Family Savings',
      contribution_amount: 50000,
      frequency: 'monthly',
      current_round: 2,
      total_rounds: 8,
      next_payment_date: '2024-01-15',
      members: [
        {
          id: '1',
          name: 'John Doe',
          phone: '+234 801 234 5678',
          status: 'paid',
          roundNumber: 1,
          paidAt: '2024-01-01',
        },
        {
          id: '2',
          name: 'Jane Smith',
          phone: '+234 802 345 6789',
          status: 'next',
          roundNumber: 2,
        },
        {
          id: '3',
          name: 'Mike Johnson',
          phone: '+234 803 456 7890',
          status: 'pending',
          roundNumber: 3,
        },
        {
          id: '4',
          name: 'Sarah Wilson',
          phone: '+234 804 567 8901',
          status: 'pending',
          roundNumber: 4,
        },
        {
          id: '5',
          name: 'David Brown',
          phone: '+234 805 678 9012',
          status: 'pending',
          roundNumber: 5,
        },
      ],
    }

    setTimeout(() => {
      setGroup(mockGroup)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const markAsPaid = (memberId: string) => {
    if (!group) return

    setGroup({
      ...group,
      members: group.members.map(member =>
        member.id === memberId
          ? { ...member, status: 'paid' as const, paidAt: new Date().toISOString() }
          : member
      ),
    })
  }

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
      year: 'numeric',
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
      case 'next':
        return <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#6B4EFF]" />
      default:
        return <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid'
      case 'next':
        return 'Next'
      default:
        return 'Pending'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50'
      case 'next':
        return 'text-[#6B4EFF] bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="kuda-card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Group not found</h2>
          <button
            onClick={() => router.back()}
            className="kuda-button"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{group.name}</h1>
            <p className="text-sm text-gray-600">{group.members.length} members</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 md:space-y-6">
        {/* Progress Card */}
        <div className="kuda-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Cycle Progress</h2>
            <span className="text-xs md:text-sm text-gray-500">
              Round {group.current_round} of {group.total_rounds}
            </span>
          </div>

          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div
                className="bg-[#6B4EFF] h-2 md:h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${(group.current_round / group.total_rounds) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold text-[#6B4EFF]">
                {formatCurrency(group.contribution_amount)}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Per contribution</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-gray-900 capitalize">
                {group.frequency}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Frequency</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-gray-900">
                {formatDate(group.next_payment_date)}
              </div>
              <div className="text-xs md:text-sm text-gray-600">Next payment</div>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="kuda-card">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Members</h2>
          
          <div className="space-y-3">
            {group.members.map((member) => (
              <div
                key={member.id}
                className={`p-3 md:p-4 rounded-xl border ${
                  member.status === 'next' ? 'border-[#6B4EFF] bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm md:text-base truncate">{member.name}</div>
                      <div className="text-xs md:text-sm text-gray-500 truncate">{member.phone}</div>
                      {member.paidAt && (
                        <div className="text-xs text-gray-400">
                          Paid: {formatDate(member.paidAt)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(member.status)}`}>
                        {getStatusText(member.status)}
                      </div>
                      <div className="text-xs text-gray-500">Round {member.roundNumber}</div>
                    </div>
                    {getStatusIcon(member.status)}
                  </div>
                </div>

                {member.status === 'next' && (
                  <button
                    onClick={() => markAsPaid(member.id)}
                    className="mt-3 w-full kuda-button text-sm py-2 md:py-3"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="kuda-button-secondary py-3 md:py-4 text-sm md:text-base flex items-center justify-center">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Send Reminder
          </button>
          <button className="kuda-button-secondary py-3 md:py-4 text-sm md:text-base flex items-center justify-center">
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            View History
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
} 