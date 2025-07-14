'use client'

import { useState, useEffect } from 'react'
import { Bell, MessageCircle, Smartphone, ToggleLeft, ToggleRight, Settings } from 'lucide-react'
import BottomNavigation from '@/components/BottomNavigation'

interface Notification {
  id: string
  title: string
  message: string
  type: 'reminder' | 'payment' | 'system'
  date: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Payment Reminder',
        message: 'Jane Smith is due to pay ₦50,000 for Family Savings group',
        type: 'reminder',
        date: '2024-01-15T10:30:00Z',
        read: false,
      },
      {
        id: '2',
        title: 'Payment Received',
        message: 'John Doe has paid ₦50,000 for Family Savings group',
        type: 'payment',
        date: '2024-01-14T15:45:00Z',
        read: true,
      },
      {
        id: '3',
        title: 'System Update',
        message: 'New features available! Check out the improved group management tools.',
        type: 'system',
        date: '2024-01-13T09:20:00Z',
        read: true,
      },
      {
        id: '4',
        title: 'Payment Reminder',
        message: 'Mike Johnson is due to pay ₦100,000 for Business Partners group',
        type: 'reminder',
        date: '2024-01-12T14:15:00Z',
        read: false,
      },
    ]

    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-500" />
      case 'payment':
        return <MessageCircle className="w-5 h-5 text-green-500" />
      case 'system':
        return <Settings className="w-5 h-5 text-[#6B4EFF]" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'border-yellow-200 bg-yellow-50'
      case 'payment':
        return 'border-green-200 bg-green-50'
      case 'system':
        return 'border-purple-200 bg-purple-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with your groups</p>
          </div>
          <div className="w-10 h-10 bg-[#6B4EFF] rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Settings */}
        <div className="kuda-card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">WhatsApp Reminders</div>
                  <div className="text-sm text-gray-500">Get reminders via WhatsApp</div>
                </div>
              </div>
              <button
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                className="flex items-center"
              >
                {whatsappEnabled ? (
                  <ToggleRight className="w-8 h-6 text-[#6B4EFF]" />
                ) : (
                  <ToggleLeft className="w-8 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">SMS Reminders</div>
                  <div className="text-sm text-gray-500">Get reminders via SMS</div>
                </div>
              </div>
              <button
                onClick={() => setSmsEnabled(!smsEnabled)}
                className="flex items-center"
              >
                {smsEnabled ? (
                  <ToggleRight className="w-8 h-6 text-[#6B4EFF]" />
                ) : (
                  <ToggleLeft className="w-8 h-6 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Alerts</h2>
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.read).length} unread
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
          ) : notifications.length === 0 ? (
            <div className="kuda-card text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`kuda-card cursor-pointer transition-all duration-200 ${
                    !notification.read ? 'border-l-4 border-l-[#6B4EFF]' : ''
                  } ${getNotificationColor(notification.type)}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#6B4EFF] text-white">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="kuda-button-secondary">
            <Bell className="w-4 h-4 mr-2" />
            Mark All Read
          </button>
          <button className="kuda-button-secondary">
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
} 