import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail, User, Calendar, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../../lib/supabase'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

const ContactViewer: React.FC = () => {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        const { error } = await supabase
          .from('contacts')
          .delete()
          .eq('id', id)

        if (error) throw error
        await fetchContacts()
        if (selectedContact?.id === id) {
          setSelectedContact(null)
        }
      } catch (error) {
        console.error('Error deleting contact:', error)
      }
    }
  }

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{t('admin.sections.contacts')}</h2>
        <p className="text-gray-600 mt-2">View and manage contact form submissions</p>
      </div>

      <div className="flex">
        {/* Contact List */}
        <div className="w-1/2 border-r border-gray-200">
          <div className="p-4">
            {contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No contact messages found.
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedContact?.id === contact.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{contact.subject}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(contact.id)
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <User className="h-4 w-4" />
                      <span>{contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(contact.created_at), 'MMM d, yyyy h:mm a')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-1/2">
          {selectedContact ? (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedContact.subject}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(selectedContact.created_at), 'MMMM d, yyyy h:mm a')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Message</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Reply</span>
                </a>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a contact message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactViewer