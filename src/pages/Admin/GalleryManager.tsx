import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../../lib/supabase'

interface GalleryImage {
  id: string
  title: string
  image_url: string
  description?: string
  date: string
}

interface GalleryForm {
  title: string
  image_url: string
  description?: string
  date: string
}

const GalleryManager: React.FC = () => {
  const { t } = useTranslation()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [uploading, setUploading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<GalleryForm>()

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('date', { ascending: false })

    if (error) console.error('Fetch error:', error)
    else setImages(data || [])
    setLoading(false)
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage.from('gallery').upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    return supabase.storage.from('gallery').getPublicUrl(fileName).data.publicUrl
  }

  const onSubmit = async (formData: GalleryForm) => {
    setUploading(true)

    try {
      const imageUrl = formData.image_url

      if (editingImage) {
        const { error } = await supabase
          .from('gallery')
          .update({
            title: formData.title,
            image_url: imageUrl || editingImage.image_url,
            description: formData.description || null,
            date: formData.date,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingImage.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('gallery').insert([
          {
            title: formData.title,
            image_url: imageUrl,
            description: formData.description || null,
            date: formData.date
          }
        ])
        if (error) throw error
      }

      await fetchGallery()
      handleCloseForm()
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    reset({
      title: image.title,
      image_url: image.image_url,
      description: image.description || '',
      date: image.date
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const { error } = await supabase.from('gallery').delete().eq('id', id)
      if (!error) await fetchGallery()
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingImage(null)
    reset()
  }

  if (loading) return <div className="text-center py-6">Loading...</div>

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('admin.sections.gallery')}</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('admin.actions.add')}
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-gray-50 border-b">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Title *</label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Date *</label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Image URL *</label>
              <input
                type="url"
                {...register('image_url', { required: 'Image URL is required' })}
                className="w-full border px-3 py-2 rounded"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image_url && <p className="text-sm text-red-600">{errors.image_url.message}</p>}
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                rows={3}
                {...register('description')}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {editingImage ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCloseForm}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length === 0 ? (
          <p className="text-gray-500">No gallery images found.</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="border rounded shadow-sm overflow-hidden">
              <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-600">{image.description}</p>
                )}
                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(image.date), 'MMM d, yyyy')}
                  </span>
                  <span className="flex items-center gap-2">
                    <button onClick={() => handleEdit(image)} className="text-blue-600 hover:underline">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(image.id)} className="text-red-600 hover:underline">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GalleryManager
