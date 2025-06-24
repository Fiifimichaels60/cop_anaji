import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Church, Menu, X, Globe } from 'lucide-react'

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = React.useState(false)

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.sermons'), href: '/sermons' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' }
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLangMenuOpen(false)
  }

  // Close menus on route change
  React.useEffect(() => {
    setIsMenuOpen(false)
    setIsLangMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
            <Church className="h-8 w-8 text-blue-700" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-blue-700">Covenant Temple</span>
              <span className="text-xs text-gray-600 hidden sm:block">The Church of Pentecost</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-b-2 ${
                  location.pathname === item.href
                    ? 'text-blue-700 bg-blue-50 border-blue-700 shadow'
                    : 'text-gray-700 border-transparent hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300'
                }`}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={isLangMenuOpen}
                aria-label="Select language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{i18n.language}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          i18n.language === lang.code
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                        aria-current={i18n.language === lang.code ? 'true' : undefined}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-16 left-0 right-0 bg-white z-50 shadow-lg md:hidden transition-all duration-300">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border-l-4 ${
                    location.pathname === item.href
                      ? 'text-blue-700 bg-blue-50 border-blue-700 shadow'
                      : 'text-gray-700 border-transparent hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                  aria-current={location.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header