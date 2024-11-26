import React from 'react';
import { cn } from '../utils/cn';

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreSelect: (genre: string) => void;
}

export default function GenreFilter({ 
  genres, 
  selectedGenres, 
  onGenreSelect 
}: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={cn(
            'px-4 py-2 rounded-full transition-colors',
            selectedGenres.includes(genre)
              ? 'bg-accent text-text'
              : 'bg-primary text-text-secondary hover:bg-primary-hover'
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}