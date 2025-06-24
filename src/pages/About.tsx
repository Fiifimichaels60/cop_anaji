import React from 'react'
import { useTranslation } from 'react-i18next'
import { Users, Target, Clock, Award } from 'lucide-react'
import heroImage from '../assets/hero.jpg' // Adjust the path as necessary

const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative pt-0 pb-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('about.title')}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">{t('about.mission')}</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to spread the Gospel of Jesus Christ, nurture spiritual growth, and build a strong 
                community of believers. We are committed to serving God and our community through worship, 
                fellowship, and outreach programs that transform lives and bring people closer to God.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Award className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">{t('about.vision')}</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our vision is to be a beacon of hope and love in our community, raising disciples who are 
                passionate about God's word and committed to His service. We envision a church where every 
                member is equipped to fulfill their God-given purpose and make a positive impact in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.history')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={heroImage}
                alt="Church History"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Journey</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">2014 - Foundation</h4>
                  <p className="text-gray-700">
                    Covenant Temple was established as part of The Church of Pentecost's expansion, 
                    beginning with a small group of dedicated believers meeting in a community center.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">2020 - Growth & Expansion</h4>
                  <p className="text-gray-700">
                    As our congregation grew, we moved to our current location and established various 
                    ministries including youth programs, women's fellowship, and community outreach.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">2025 - Modern Era</h4>
                  <p className="text-gray-700">
                    We embraced modern technology and expanded our reach through online services, 
                    digital ministry, and enhanced community programs.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Today</h4>
                  <p className="text-gray-700">
                    We continue to serve our diverse community with multiple language services, 
                    active youth programs, and strong community partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.leadership')}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img 
                src={heroImage}
                alt="Hero"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pastor John Ofori</h3>
              <p className="text-blue-600 font-medium mb-2">Senior Pastor</p>
              <p className="text-gray-600 text-sm">
                Leading our congregation with wisdom and compassion for over 15 years.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img 
                src={heroImage}
                alt="Hero"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Minister Enoch Jackson</h3>
              <p className="text-blue-600 font-medium mb-2">Associate Pastor</p>
              <p className="text-gray-600 text-sm">
                Passionate about youth ministry and community outreach programs.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <img 
                src={heroImage}
                alt="Hero"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Elder Menya </h3>
              <p className="text-blue-600 font-medium mb-2">Presiding Elder</p>
              <p className="text-gray-600 text-sm">
                Dedicated to pastoral care and spiritual guidance for our members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unity</h3>
              <p className="text-gray-300">Building strong bonds within our diverse community.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Purpose</h3>
              <p className="text-gray-300">Living with intention and God's calling on our lives.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-300">Striving for excellence in all that we do for God.</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Commitment</h3>
              <p className="text-gray-300">Dedicated to serving God and our community faithfully.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
