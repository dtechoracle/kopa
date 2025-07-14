'use client'

import { useState, useEffect } from 'react'
import { Download, Filter, Calendar, DollarSign, User } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

interface Transaction {
  id: string
  groupName: string
  memberName: string
  amount: number
  date: string
  type: 'contribution' | 'payout'
  status: 'completed' | 'pending'
}

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'contributions' | 'payouts'>('all')

  // Mock data for demonstration
  useEffect(() => {
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        groupName: 'Family Savings',
        memberName: 'John Doe',
        amount: 50000,
        date: '2024-01-01',
        type: 'contribution',
        status: 'completed',
      },
      {
        id: '2',
        groupName: 'Family Savings',
        memberName: 'Jane Smith',
        amount: 50000,
        date: '2024-01-08',
        type: 'payout',
        status: 'completed',
      },
      {
        id: '3',
        groupName: 'Business Partners',
        memberName: 'Mike Johnson',
        amount: 100000,
        date: '2024-01-15',
        type: 'contribution',
        status: 'pending',
      },
      {
        id: '4',
        groupName: 'Family Savings',
        memberName: 'Sarah Wilson',
        amount: 50000,
        date: '2024-01-22',
        type: 'contribution',
        status: 'completed',
      },
      {
        id: '5',
        groupName: 'Business Partners',
        memberName: 'David Brown',
        amount: 100000,
        date: '2024-01-29',
        type: 'payout',
        status: 'completed',
      },
    ]

    setTimeout(() => {
      setTransactions(mockTransactions)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    if (filter === 'contributions') return transaction.type === 'contribution'
    if (filter === 'payouts') return transaction.type === 'payout'
    return false
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
      year: 'numeric',
    })
  }

  const getTransactionIcon = (type: string) => {
    return type === 'contribution' ? (
      <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
    ) : (
      <User className="w-4 h-4 md:w-5 md:h-5 text-[#6B4EFF]" />
    )
  }

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
  }

  const downloadHistory = () => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = '#'
    link.download = 'kopa-history.pdf'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Track all your contributions and payouts</p>
          </div>
          <button
            onClick={downloadHistory}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 md:space-y-6">
        {/* Filter */}
        <div className="kuda-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-gray-900">Filter</h2>
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          </div>
          
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 shadow-sm ${
                filter === 'all'
                  ? 'bg-[#6B4EFF] text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md border border-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('contributions')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 shadow-sm ${
                filter === 'contributions'
                  ? 'bg-[#6B4EFF] text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md border border-gray-200'
              }`}
            >
              Contributions
            </button>
            <button
              onClick={() => setFilter('payouts')}
              className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 shadow-sm ${
                filter === 'payouts'
                  ? 'bg-[#6B4EFF] text-white shadow-md'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md border border-gray-200'
              }`}
            >
              Payouts
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Recent Transactions</h2>
            <span className="text-xs md:text-sm text-gray-500">
              {filteredTransactions.length} transactions
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="kuda-card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="kuda-card text-center py-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-sm md:text-base text-gray-600">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="kuda-card hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm md:text-base">
                          {transaction.type === 'contribution' ? 'Contribution' : 'Payout'}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 truncate">{transaction.groupName}</div>
                        <div className="text-xs text-gray-400 truncate">{transaction.memberName}</div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-base md:text-lg font-bold text-gray-900">
                        {transaction.type === 'contribution' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {filteredTransactions.length > 0 && (
          <div className="kuda-card">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">
                  {formatCurrency(
                    filteredTransactions
                      .filter(t => t.type === 'contribution' && t.status === 'completed')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Total Contributions</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#6B4EFF]">
                  {formatCurrency(
                    filteredTransactions
                      .filter(t => t.type === 'payout' && t.status === 'completed')
                      .reduce((sum, t) => sum + t.amount, 0)
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Total Payouts</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
} 