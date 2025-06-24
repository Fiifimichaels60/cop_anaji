import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './lib/i18n'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Sermons from './pages/Sermons'
import Blog from './pages/Blog'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin/Admin'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          {/* Public routes with Layout (navbar) */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            }
          />
          {/* Admin route without Layout (no navbar) */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </I18nextProvider>
  )
}

export default App