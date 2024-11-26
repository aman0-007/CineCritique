import React from 'react';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-end h-full pb-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Discover & Share Your Movie Experience</h1>
            <p className="text-xl text-text-secondary mb-8">
              Join our community of movie enthusiasts. Rate, review, and explore the world of cinema.
            </p>
            <div className="flex space-x-4">
              <button className="btn-accent flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Get Started
              </button>
              <button className="btn-primary">Browse Movies</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}