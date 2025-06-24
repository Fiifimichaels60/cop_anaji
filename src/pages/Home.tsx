import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Calendar, PlayCircle, Heart, Users, BookOpen, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'
import heroImage from '../assets/hero.jpg' // adjust the path if needed

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
}

interface Sermon {
  id: string
  title: string
  description: string
  date: string
  video_url?: string
  audio_url?: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  image_url?: string
}

const Home: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [events, setEvents] = useState<Event[]>([])
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHomeData()
  }, [i18n.language])

  const fetchHomeData = async () => {
    try {
      const [eventsRes, sermonsRes, blogsRes] = await Promise.all([
        supabase
          .from('events')
          .select('*')
          .eq('language', i18n.language)
          .order('date', { ascending: true })
          .limit(3),
        supabase
          .from('sermons')
          .select('*')
          .eq('language', i18n.language)
          .order('date', { ascending: false })
          .limit(3),
        supabase
          .from('blogs')
          .select('*')
          .eq('language', i18n.language)
          .order('date', { ascending: false })
          .limit(3)
      ])

      if (eventsRes.data) setEvents(eventsRes.data)
      if (sermonsRes.data) setSermons(sermonsRes.data)
      if (blogsRes.data) setBlogs(blogsRes.data)
    } catch (error) {
      console.error('Error fetching home data:', error)
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
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          // className="absolute inset-0 bg-cover bg-center opacity-100 blur-sm z-0"
          className="absolute inset-0 bg-cover bg-center opacity-70 "
          style={{
              backgroundImage: `url(${heroImage})`
            }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-yellow-300 font-semibold">
            {t('home.hero.subtitle')}
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.sections.welcome')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Worship</h3>
              <p className="text-gray-600">Experience heartfelt worship and praise in our services.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fellowship</h3>
              <p className="text-gray-600">Build meaningful relationships within our community.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">Grow in your faith through Bible study and teaching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.sections.upcomingEvents')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>{format(new Date(event.date), 'MMMM d, yyyy')} at {event.time}</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {events.length === 0 && (
            <div className="text-center text-gray-500">
              <p>No upcoming events at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.sections.latestSermons')}</h2>
              <div className="w-24 h-1 bg-yellow-500"></div>
            </div>
            <Link 
              to="/sermons" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <PlayCircle className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{sermon.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {format(new Date(sermon.date), 'MMMM d, yyyy')}
                    </span>
                    <div className="flex space-x-2">
                      {sermon.video_url && (
                        <a 
                          href={sermon.video_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PlayCircle className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {sermons.length === 0 && (
            <div className="text-center text-gray-500">
              <p>No sermons available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
              <div className="w-24 h-1 bg-yellow-500"></div>
            </div>
            <Link 
              to="/blog" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
            >
              <span>Read All</span>
              <MessageCircle className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {blog.image_url && (
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.content.substring(0, 150)}...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {blog.author}</span>
                    <span>{format(new Date(blog.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {blogs.length === 0 && (
            <div className="text-center text-gray-500">
              <p>No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home