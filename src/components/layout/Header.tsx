import type { HeaderProps } from "../../types/type"

const Header = ({ currentPage, onPageChange, collectionCount }:HeaderProps) => {

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-red-500 mr-2">⚡</span>
              Pokemon Discovery
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
            onClick={() => onPageChange('discovery')}
            className={`px-4 py-2 rounded-md text-sm cursor-pointer font-medium transition-colors duration-200 ${
              currentPage === 'discovery'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Discovery
          </button>
          <button
            onClick={() => onPageChange('collection')}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 relative ${
              currentPage === 'collection'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            My Collection
            {collectionCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {collectionCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </div>
  </header>
  )
}

export default Header