import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2, User, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../../lib/supabase'

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  language: string
  image_url?: string
}

interface BlogForm {
  title: string
  content: string
  author: string
  date: string
  language: string
  image_url?: string
}

const BlogManager: React.FC = () => {
  const { t } = useTranslation()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BlogForm>()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error
      if (data) setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: BlogForm) => {
    try {
      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update({
            title: data.title,
            content: data.content,
            author: data.author,
            date: data.date,
            language: data.language,
            image_url: data.image_url || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBlog.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([{
            title: data.title,
            content: data.content,
            author: data.author,
            date: data.date,
            language: data.language,
            image_url: data.image_url || null
          }])

        if (error) throw error
      }

      await fetchBlogs()
      handleCloseForm()
    } catch (error) {
      console.error('Error saving blog:', error)
    }
  }

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog)
    reset({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      language: blog.language,
      image_url: blog.image_url || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const { error } = await supabase
          .from('blogs')
          .delete()
          .eq('id', id)

        if (error) throw error
        await fetchBlogs()
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBlog(null)
    reset()
  }

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.sections.blogs')}</h2>
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
            {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
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
                  {t('common.author')} *
                </label>
                <input
                  type="text"
                  {...register('author', { required: 'Author is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.content')} *
              </label>
              <textarea
                rows={8}
                {...register('content', { required: 'Content is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  {...register('image_url')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
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
        {blogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blog posts found. Add your first blog post!
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{blog.content.substring(0, 200)}...</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(blog.date), 'MMM d, yyyy')}</span>
                      </div>
                      <span className="capitalize">{blog.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
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

export default BlogManager