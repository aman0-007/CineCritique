import React, { useState } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import { cn } from '../utils/cn';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi',
  'Thriller', 'War', 'Western'
];

export default function Browse() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Browse Movies</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-primary flex items-center"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </button>
          <div className="flex bg-primary rounded-lg">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-2 rounded-l-lg',
                view === 'grid' ? 'bg-accent' : 'hover:bg-primary-hover'
              )}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-2 rounded-r-lg',
                view === 'list' ? 'bg-accent' : 'hover:bg-primary-hover'
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-primary rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Genres</h3>
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreSelect={toggleGenre}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Year Range</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="From"
                  className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full"
                />
                <input
                  type="number"
                  placeholder="To"
                  className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Rating Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full">
                <option value="">All Ratings</option>
                <option value="7">7+ Stars</option>
                <option value="8">8+ Stars</option>
                <option value="9">9+ Stars</option>
              </select>
            </div>

            {/* Runtime */}
            <div>
              <label className="block text-sm font-medium mb-2">Runtime</label>
              <select className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full">
                <option value="">Any Length</option>
                <option value="short">Under 90 mins</option>
                <option value="medium">90-120 mins</option>
                <option value="long">Over 120 mins</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Movie Grid */}
      <MovieGrid
        movies={[]} // Add your movie data here
        view={view}
      />
    </div>
  );
}