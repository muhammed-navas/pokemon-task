import { useState } from 'react';
import './App.css'
import Header from './components/layout/Header'
import DiscoveryPage from './page/DiscoveryPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'discovery' | 'collection'>('discovery');
  return (
    <div className="min-h-screen bg-gray-50">
    <Header
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
    <main className="pt-16">
        <DiscoveryPage />
    </main>
  </div>
  )
}

export default App
