import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlayCircle, Volume2, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'
import heroImage from '../assets/hero.jpg' // 👈 Import the local image

interface Sermon {
  id: string
  title: string
  description: string
  date: string
  video_url?: string
  audio_url?: string
}

const Sermons: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSermons()
  }, [i18n.language])

  const fetchSermons = async () => {
    try {
      const { data, error } = await supabase
        .from('sermons')
        .select('*')
        .eq('language', i18n.language)
        .order('date', { ascending: false })

      if (error) throw error
      if (data) setSermons(data)
    } catch (error) {
      console.error('Error fetching sermons:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">{t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('sermons.title')}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('sermons.subtitle')}
          </p>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('sermons.latest')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          {sermons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No sermons available at the moment.<br /> Thank you!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                    <div className="flex items-center space-x-2 text-blue-100 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{format(new Date(sermon.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{sermon.title}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 line-clamp-3">{sermon.description}</p>
                    
                    <div className="flex flex-col space-y-3">
                      {sermon.video_url && (
                        <a
                          href={sermon.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
                        >
                          <PlayCircle className="h-5 w-5" />
                          <span>{t('sermons.watchVideo')}</span>
                        </a>
                      )}
                      
                      {sermon.audio_url && (
                        <a
                          href={sermon.audio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-md transition-colors duration-200"
                        >
                          <Volume2 className="h-5 w-5" />
                          <span>{t('sermons.listenAudio')}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us for Live Worship</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the power of worship and fellowship in person. All are welcome to join our Sunday service.
          </p>
          <div className="bg-blue-800 rounded-lg p-6 inline-block">
            <div className="flex items-center justify-center space-x-4 text-lg">
              <Calendar className="h-6 w-6 text-yellow-400" />
              <span className="font-semibold">Sunday Service: 9:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sermons
