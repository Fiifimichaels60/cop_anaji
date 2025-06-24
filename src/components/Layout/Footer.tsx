import React from 'react'
import { useTranslation } from 'react-i18next'
import { Church, MapPin, Phone, Mail, Clock } from 'lucide-react'
import heroImage from '../../assets/hero.jpg'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm" 
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Church className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold">Covenant Temple</h3>
                <p className="text-gray-300 text-sm">The Church of Pentecost - Anaji English Assembly</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A vibrant community of believers committed to worship, fellowship, and serving God together. 
              Join us as we grow in faith and love.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact.info.address')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Anaji Fie<br />
                  Western Region, Ghana
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+233 (0) 243-762-748</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">michaelquaicoe60@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact.info.hours')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium">Sunday Service</p>
                  <p>9:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium">Bible Study</p>
                  <p>Sunday - Within Service</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p className="font-medium">Youth Meeting</p>
                  <p>Monday 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center space-y-1">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} The Church of Pentecost - Covenant Temple English Assembly. 
            All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
             <a
              href="https://wa.me/233343762748"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
              >
              Fiifi Michael
              </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
