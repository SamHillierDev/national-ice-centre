import { useState } from 'react'
import { EventList } from './components/EventList'

function App() {
  const [currentPage, setCurrentPage] = useState('all')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <img 
                src="assets/images/national-ice-centre-logo.png" 
                alt="National Ice Centre" 
                className="h-12 w-auto"
              />
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-[#333333] hover:text-[#0066CC] transition-colors">Home</a>
                <a href="#" className="text-[#333333] hover:text-[#0066CC] transition-colors">What's On</a>
                <a href="#" className="text-[#333333] hover:text-[#0066CC] transition-colors">Skating</a>
                <a href="#" className="text-[#333333] hover:text-[#0066CC] transition-colors">Ice Sports</a>
                <a href="#" className="text-[#333333] hover:text-[#0066CC] transition-colors">Contact</a>
              </nav>
            </div>
            <button className="bg-[#0066CC] text-white px-6 py-2 rounded hover:bg-[#0052A3] transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-[#0066CC] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">What's On at the National Ice Centre</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover exciting events, Panthers games, and exclusive hospitality experiences at Nottingham's premier ice venue.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row justify-center p-4">
              <button
                className={`px-6 py-3 rounded-lg transition-colors ${
                  currentPage === 'all'
                    ? 'bg-[#0066CC] text-white'
                    : 'text-[#333333] hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage('all')}
              >
                All Events
              </button>
              <button
                className={`px-6 py-3 rounded-lg transition-colors ${
                  currentPage === 'panthers'
                    ? 'bg-[#0066CC] text-white'
                    : 'text-[#333333] hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage('panthers')}
              >
                Panthers Games
              </button>
              <button
                className={`px-6 py-3 rounded-lg transition-colors ${
                  currentPage === 'hospitality'
                    ? 'bg-[#0066CC] text-white'
                    : 'text-[#333333] hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage('hospitality')}
              >
                Hospitality Events
              </button>
            </div>
          </div>

          {/* Events List */}
          <EventList selectedCategory={currentPage} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Bolero Square</p>
              <p className="text-gray-300">Nottingham</p>
              <p className="text-gray-300">NG1 1LA</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">What's On</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Skating</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Ice Sports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
              <p className="text-gray-300">Monday - Friday: 9am - 10pm</p>
              <p className="text-gray-300">Saturday: 8am - 10pm</p>
              <p className="text-gray-300">Sunday: 8am - 8pm</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} National Ice Centre. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
