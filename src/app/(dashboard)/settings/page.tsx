'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, Shield, CreditCard, LogOut, Edit, Camera } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  
  // Form data
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [phone, setPhone] = useState('+234 801 234 5678')
  const [email, setEmail] = useState(user?.email || '')

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEditMode(false)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>
          <div className="w-10 h-10 bg-[#6B4EFF] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="kuda-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-[#6B4EFF] text-sm font-medium hover:underline"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditMode(false)}
                  className="text-gray-600 text-sm font-medium hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="text-[#6B4EFF] text-sm font-medium hover:underline disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-[#6B4EFF] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {name.charAt(0) || 'U'}
                  </span>
                </div>
                {editMode && (
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {editMode ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="kuda-input"
                      placeholder="Full Name"
                    />
                  ) : (
                    name || 'User Name'
                  )}
                </div>
                <div className="text-sm text-gray-500">Group Admin</div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-gray-900">
                    {editMode ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="kuda-input"
                        placeholder="Email Address"
                      />
                    ) : (
                      email
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div className="text-gray-900">
                    {editMode ? (
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="kuda-input"
                        placeholder="Phone Number"
                      />
                    ) : (
                      phone
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="kuda-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#6B4EFF]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-gray-500">Update your password</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-500">Add an extra layer of security</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="kuda-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Bank Account</div>
                  <div className="text-sm text-gray-500">Add your bank details</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Card Details</div>
                  <div className="text-sm text-gray-500">Manage your cards</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="kuda-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">App Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Privacy Policy</div>
                  <div className="text-sm text-gray-500">Read our privacy policy</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#6B4EFF]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Terms of Service</div>
                  <div className="text-sm text-gray-500">Read our terms of service</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Help & Support</div>
                  <div className="text-sm text-gray-500">Get help and contact support</div>
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="kuda-card">
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            <span>{loading ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
} 