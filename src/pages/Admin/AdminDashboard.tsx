import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut, FileText, Video, Image, Calendar, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import SermonManager from './SermonManager'
import BlogManager from './BlogManager'
import GalleryManager from './GalleryManager'
import EventManager from './EventManager'
import ContactViewer from './ContactViewer'

interface AdminDashboardProps {
  user: any
}

type ActiveSection = 'overview' | 'sermons' | 'blogs' | 'gallery' | 'events' | 'contacts'

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const menuItems = [
    { id: 'overview' as ActiveSection, label: 'Overview', icon: FileText },
    { id: 'sermons' as ActiveSection, label: t('admin.sections.sermons'), icon: Video },
    { id: 'blogs' as ActiveSection, label: t('admin.sections.blogs'), icon: FileText },
    { id: 'gallery' as ActiveSection, label: t('admin.sections.gallery'), icon: Image },
    { id: 'events' as ActiveSection, label: t('admin.sections.events'), icon: Calendar },
    { id: 'contacts' as ActiveSection, label: t('admin.sections.contacts'), icon: Mail }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'sermons':
        return <SermonManager />
      case 'blogs':
        return <BlogManager />
      case 'gallery':
        return <GalleryManager />
      case 'events':
        return <EventManager />
      case 'contacts':
        return <ContactViewer />
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Admin Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Use the navigation menu to manage different sections of your church website.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.slice(1).map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="p-6 border rounded-lg hover:shadow-md cursor-pointer transition-shadow duration-200"
                  >
                    <Icon className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
                    <p className="text-gray-600 text-sm">
                      Manage {item.label.toLowerCase()} content
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('admin.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                          activeSection === item.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard