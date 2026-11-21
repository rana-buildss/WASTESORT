import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Results from './pages/Results';
import CollectionPoints from './pages/CollectionPoints';
import Categories from './pages/Categories';
import About from './pages/About';
import ScanHistory from './pages/ScanHistory';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<ScanHistory />} />
              <Route path="/collection-points" element={<CollectionPoints />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
