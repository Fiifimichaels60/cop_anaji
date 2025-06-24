import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { supabase } from '../lib/supabase'
import heroImage from '../assets/hero.jpg' // ✅ import the local hero image

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  image_url?: string
}

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [i18n.language])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('language', i18n.language)
        .order('date', { ascending: false })

      if (error) throw error
      if (data) setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
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

  if (selectedPost) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to all posts</span>
          </button>
          
          {selectedPost.image_url && (
            <img 
              src={selectedPost.image_url} 
              alt={selectedPost.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
            />
          )}
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(selectedPost.date), 'MMMM d, yyyy')}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{selectedPost.title}</h1>
            
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
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
          style={{ backgroundImage: `url(${heroImage})` }} // ✅ use the local image
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('blog.title')}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-2xl font-semibold text-gray-100 max-w-4xl mx-auto leading-relaxed">
            {t('blog.subtitle') || "Insightful perspectives on faith, life, and community transformation"}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('blog.latest')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article 
                  key={blog.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedPost(blog)}
                >
                  {blog.image_url && (
                    <img 
                      src={blog.image_url} 
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-gray-500 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(blog.date), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                      <span className="mr-2">{t('blog.readMore')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter to receive the latest news and updates from our church community.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-md sm:rounded-r-none text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-r-md sm:rounded-l-none transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
