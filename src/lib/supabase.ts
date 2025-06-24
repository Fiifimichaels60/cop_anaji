import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vadntsdppyicyjxfuude.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY // For Vite projects

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      sermons: {
        Row: {
          id: string
          title: string
          description: string
          video_url: string | null
          audio_url: string | null
          date: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          video_url?: string | null
          audio_url?: string | null
          date: string
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          video_url?: string | null
          audio_url?: string | null
          date?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          content: string
          author: string
          date: string
          language: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author: string
          date: string
          language: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author?: string
          date?: string
          language?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          image_url: string
          description: string | null
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          description?: string | null
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          description?: string | null
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          location: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          location: string
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          location?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      church_info: {
        Row: {
          id: string
          field_name: string
          content: string
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          field_name: string
          content: string
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          field_name?: string
          content?: string
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}