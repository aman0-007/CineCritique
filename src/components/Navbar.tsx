import React from 'react';
import { Film, Search, User } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">CineCritique</span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search movies, reviews, users..."
                  className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="btn-accent"
                onClick={() => setShowAuthModal(true)}
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-text-secondary hover:text-text transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}