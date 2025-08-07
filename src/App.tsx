import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Header from './components/layout/Header';
import DiscoveryPage from './page/DiscoveryPage';
import { queryClient } from './lib/react-query';

function App() {
  const [currentPage, setCurrentPage] = useState<'discovery' | 'collection'>('discovery');
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <main className="pt-16">
          <DiscoveryPage />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
