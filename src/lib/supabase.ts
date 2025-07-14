import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. App will run in demo mode.')
}

export const supabase = createClient(
  supabaseUrl || 'https://demo.supabase.co',
  supabaseAnonKey || 'demo-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Check if we're in demo mode
export const isDemoMode = !supabaseUrl || !supabaseAnonKey

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          contribution_amount: number
          frequency: 'weekly' | 'monthly'
          start_date: string
          admin_id: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          contribution_amount: number
          frequency: 'weekly' | 'monthly'
          start_date: string
          admin_id: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          contribution_amount?: number
          frequency?: 'weekly' | 'monthly'
          start_date?: string
          admin_id?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string | null
          name: string
          phone: string
          email: string | null
          is_admin: boolean
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id?: string | null
          name: string
          phone: string
          email?: string | null
          is_admin?: boolean
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string | null
          name?: string
          phone?: string
          email?: string | null
          is_admin?: boolean
          joined_at?: string
        }
      }
      cycles: {
        Row: {
          id: string
          group_id: string
          cycle_number: number
          start_date: string
          end_date: string
          is_completed: boolean
          payout_recipient_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          cycle_number: number
          start_date: string
          end_date: string
          is_completed?: boolean
          payout_recipient_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          cycle_number?: number
          start_date?: string
          end_date?: string
          is_completed?: boolean
          payout_recipient_id?: string | null
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          group_id: string
          cycle_id: string | null
          member_id: string
          amount: number
          type: 'contribution' | 'payout'
          status: 'pending' | 'completed' | 'failed'
          payment_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          group_id: string
          cycle_id?: string | null
          member_id: string
          amount: number
          type: 'contribution' | 'payout'
          status?: 'pending' | 'completed' | 'failed'
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          cycle_id?: string | null
          member_id?: string
          amount?: number
          type?: 'contribution' | 'payout'
          status?: 'pending' | 'completed' | 'failed'
          payment_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          group_id: string | null
          title: string
          message: string
          type: 'reminder' | 'payment' | 'payout' | 'system'
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          group_id?: string | null
          title: string
          message: string
          type: 'reminder' | 'payment' | 'payout' | 'system'
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          group_id?: string | null
          title?: string
          message?: string
          type?: 'reminder' | 'payment' | 'payout' | 'system'
          is_read?: boolean
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          email_notifications: boolean
          sms_notifications: boolean
          whatsapp_notifications: boolean
          reminder_frequency: 'daily' | 'weekly' | 'monthly'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email_notifications?: boolean
          sms_notifications?: boolean
          whatsapp_notifications?: boolean
          reminder_frequency?: 'daily' | 'weekly' | 'monthly'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email_notifications?: boolean
          sms_notifications?: boolean
          whatsapp_notifications?: boolean
          reminder_frequency?: 'daily' | 'weekly' | 'monthly'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 