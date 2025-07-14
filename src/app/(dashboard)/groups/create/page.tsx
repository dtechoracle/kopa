'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, Users, Calendar, DollarSign } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

interface Member {
  id: string
  name: string
  phone: string
}

export default function CreateGroupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Form data
  const [groupName, setGroupName] = useState('')
  const [contributionAmount, setContributionAmount] = useState('')
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('monthly')
  const [startDate, setStartDate] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberPhone, setNewMemberPhone] = useState('')

  const addMember = () => {
    if (newMemberName.trim() && newMemberPhone.trim()) {
      setMembers([
        ...members,
        {
          id: Date.now().toString(),
          name: newMemberName.trim(),
          phone: newMemberPhone.trim(),
        },
      ])
      setNewMemberName('')
      setNewMemberPhone('')
    }
  }

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id))
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    router.push('/dashboard')
  }

  const formatCurrency = (amount: string) => {
    const num = parseInt(amount) || 0
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(num)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Create Group</h1>
            <p className="text-sm text-gray-600">Step {step} of 2</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="kuda-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Group Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g., Family Savings"
                    className="kuda-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      placeholder="50000"
                      className="kuda-input pl-12"
                    />
                  </div>
                  {contributionAmount && (
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(contributionAmount)} per contribution
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFrequency('weekly')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        frequency === 'weekly'
                          ? 'border-[#6B4EFF] bg-purple-50 text-[#6B4EFF]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Weekly</div>
                        <div className="text-sm opacity-75">Every week</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        frequency === 'monthly'
                          ? 'border-[#6B4EFF] bg-purple-50 text-[#6B4EFF]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">Monthly</div>
                        <div className="text-sm opacity-75">Every month</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="kuda-input pl-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!groupName || !contributionAmount || !startDate}
              className="kuda-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Add Members
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="kuda-card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Group Members</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Member name"
                    className="kuda-input"
                  />
                  <input
                    type="tel"
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    placeholder="Phone number"
                    className="kuda-input"
                  />
                </div>
                
                <button
                  onClick={addMember}
                  disabled={!newMemberName.trim() || !newMemberPhone.trim()}
                  className="kuda-button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed py-2 md:py-3 text-sm md:text-base"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </button>
              </div>

              {members.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Members ({members.length})
                  </h3>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.phone}</div>
                        </div>
                        <button
                          onClick={() => removeMember(member.id)}
                          className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="kuda-button-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || members.length === 0}
                className="kuda-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed py-2 md:py-3 text-sm md:text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="ml-2">Creating...</span>
                  </div>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
} 