'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Users, Shield, TrendingUp, Bell, Download, Star, Check, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Users,
      title: 'Group Management',
      description: 'Create and manage multiple savings groups with ease. Add members, track contributions, and monitor progress.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visual progress bars and real-time updates show you exactly how your savings groups are performing.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss a payment with automated WhatsApp and SMS reminders for your group members.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Bank-level security ensures your financial data is protected. Your information stays private.',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Group Admin',
      content: 'Kopa has made managing our family savings so much easier. The reminders and progress tracking are game-changers!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'Perfect for our business partners savings group. Clean interface and reliable tracking.',
      rating: 5
    },
    {
      name: 'Aisha Bello',
      role: 'Community Leader',
      content: 'The best app for managing our community savings. Everyone loves how simple it is to use.',
      rating: 5
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50,000+', label: 'Groups Created' },
    { number: '₦500M+', label: 'Total Savings' },
    { number: '99.9%', label: 'Uptime' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#6B4EFF] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kopa</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => router.push('/auth')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="bg-[#6B4EFF] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#5A3FD9] transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-4 py-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  router.push('/auth')
                  setMobileMenuOpen(false)
                }}
                className="text-gray-600 hover:text-gray-900 font-medium py-2"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  router.push('/auth')
                  setMobileMenuOpen(false)
                }}
                className="bg-[#6B4EFF] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#5A3FD9] transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#6B4EFF] rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-white text-2xl md:text-3xl font-bold">K</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Manage Your
              <span className="text-[#6B4EFF] block md:inline"> Rotational Savings</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              The modern way to manage Ajo, Esusu, and Tontine savings groups. 
              Track payments, send reminders, and grow your money together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12 px-4">
            <button
              onClick={() => router.push('/auth')}
              className="bg-[#6B4EFF] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-[#5A3FD9] transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Managing Groups</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="border-2 border-[#6B4EFF] text-[#6B4EFF] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-[#6B4EFF] hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Sign Up</span>
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#6B4EFF] mb-1 md:mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Savings Groups
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From creating groups to tracking payments, Kopa provides all the tools 
              you need to manage your rotational savings effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="kuda-card hover:shadow-xl transition-all duration-300">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Get started with Kopa in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6B4EFF] rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Create Your Group</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Set up your savings group with contribution amount, frequency, and add your members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6B4EFF] rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Track Payments</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Monitor who has paid, who's next, and send automated reminders to members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6B4EFF] rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Grow Together</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Watch your savings grow and celebrate when each member receives their payout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              See what our users are saying about Kopa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="kuda-card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm md:text-base">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-20 bg-gradient-to-r from-[#6B4EFF] to-[#8B6EFF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Start Managing Your Savings Groups?
          </h2>
          <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 px-4">
            Join thousands of users who trust Kopa to manage their rotational savings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => router.push('/auth')}
              className="bg-white text-[#6B4EFF] px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-white hover:text-[#6B4EFF] transition-all duration-200"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#6B4EFF] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="text-xl font-bold">Kopa</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                The modern way to manage rotational savings groups.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm md:text-base">Product</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm md:text-base">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-sm md:text-base">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 Kopa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 