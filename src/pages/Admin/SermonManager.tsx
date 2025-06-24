import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2, Video, Volume2 } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../../lib/supabase'

interface Sermon {
  id: string
  title: string
  description: string
  video_url?: string
  audio_url?: string
  date: string
  language: string
}

interface SermonForm {
  title: string
  description: string
  video_url?: string
  audio_url?: string
  date: string
  language: string
}

const SermonManager: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SermonForm>()

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      if (data) setSermons(data)
    } catch (error) {
      console.error('Error fetching sermons:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SermonForm) => {
    try {
      if (editingSermon) {
        const { error } = await supabase
          .from('sermons')
          .update({
            title: data.title,
            description: data.description,
            video_url: data.video_url || null,
            audio_url: data.audio_url || null,
            date: data.date,
            language: data.language,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingSermon.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('sermons')
          .insert([{
            title: data.title,
            description: data.description,
            video_url: data.video_url || null,
            audio_url: data.audio_url || null,
            date: data.date,
            language: data.language
          }])

        if (error) throw error
      }

      await fetchSermons()
      handleCloseForm()
    } catch (error) {
      console.error('Error saving sermon:', error)
    }
  }

  const handleEdit = (sermon: Sermon) => {
    setEditingSermon(sermon)
    reset({
      title: sermon.title,
      description: sermon.description,
      video_url: sermon.video_url || '',
      audio_url: sermon.audio_url || '',
      date: sermon.date,
      language: sermon.language
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sermon?')) {
      try {
        const { error } = await supabase
          .from('sermons')
          .delete()
          .eq('id', id)

        if (error) throw error
        await fetchSermons()
      } catch (error) {
        console.error('Error deleting sermon:', error)
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingSermon(null)
    reset()
  }

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.sections.sermons')}</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            <span>{t('admin.actions.add')}</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.title')} *
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language *
                </label>
                <select
                  {...register('language', { required: 'Language is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="it">Italiano</option>
                </select>
                {errors.language && (
                  <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.description')} *
              </label>
              <textarea
                rows={3}
                {...register('description', { required: 'Description is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  {...register('video_url')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audio URL
                </label>
                <input
                  type="url"
                  {...register('audio_url')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/audio.mp3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.date')} *
              </label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                {t('admin.actions.save')}
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                {t('admin.actions.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-6">
        {sermons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No sermons found. Add your first sermon!
          </div>
        ) : (
          <div className="space-y-4">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{sermon.title}</h3>
                    <p className="text-gray-600 mb-2">{sermon.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{format(new Date(sermon.date), 'MMM d, yyyy')}</span>
                      <span className="capitalize">{sermon.language}</span>
                      {sermon.video_url && (
                        <div className="flex items-center space-x-1">
                          <Video className="h-4 w-4" />
                          <span>Video</span>
                        </div>
                      )}
                      {sermon.audio_url && (
                        <div className="flex items-center space-x-1">
                          <Volume2 className="h-4 w-4" />
                          <span>Audio</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(sermon)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sermon.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SermonManager