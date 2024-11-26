import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Grid, List, SlidersHorizontal } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import { sampleMovies } from '../data/sampleMovies';
import { cn } from '../utils/cn';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi',
  'Thriller', 'War', 'Western'
];

const categoryTitles = {
  'trending': 'Trending Movies',
  'top-rated': 'Top Rated Movies',
  'recent': 'Recently Reviewed Movies'
};

export default function MovieList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'date'>('rating');

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  let movies = [...sampleMovies];
  
  // Apply category filters
  switch (category) {
    case 'top-rated':
      movies.sort((a, b) => b.rating - a.rating);
      break;
    case 'recent':
      movies.sort((a, b) => new Date(b.reviews[0]?.date).getTime() - new Date(a.reviews[0]?.date).getTime());
      break;
    default:
      // For trending, we'll use the default order
      break;
  }

  // Apply genre filters
  if (selectedGenres.length > 0) {
    movies = movies.filter(movie => 
      movie.genres.some(genre => selectedGenres.includes(genre))
    );
  }

  // Apply sorting
  if (sortBy === 'rating') {
    movies.sort((a, b) => b.rating - a.rating);
  } else {
    movies.sort((a, b) => b.year - a.year);
  }

  return (
    <div className={cn(
      'opacity-0 transition-opacity duration-500',
      isVisible && 'opacity-100'
    )}>
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-50 bg-primary/90 backdrop-blur-sm p-2 rounded-full hover:bg-primary-hover transition-colors group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:transform group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{categoryTitles[category] || 'All Movies'}</h1>
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
          <div className="bg-primary rounded-lg p-6 mb-8 animate-fade">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Genres</h3>
              <GenreFilter
                genres={genres}
                selectedGenres={selectedGenres}
                onGenreSelect={toggleGenre}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'date')}
                  className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full"
                >
                  <option value="rating">Rating</option>
                  <option value="date">Release Date</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 w-full">
                  <option value="">All Ratings</option>
                  <option value="7">7+ Stars</option>
                  <option value="8">8+ Stars</option>
                  <option value="9">9+ Stars</option>
                </select>
              </div>

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
          movies={movies}
          view={view}
        />
      </div>
    </div>
  );
}