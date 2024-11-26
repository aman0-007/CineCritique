import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  view?: 'grid' | 'list';
}

export default function MovieGrid({ movies, view = 'grid' }: MovieGridProps) {
  return (
    <div className={
      view === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        : "flex flex-col space-y-4"
    }>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          {...movie} 
          layout={view}
        />
      ))}
    </div>
  );
}