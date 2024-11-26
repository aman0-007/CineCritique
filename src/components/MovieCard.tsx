import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/movie';

type MovieCardProps = Pick<Movie, 'id' | 'title' | 'year' | 'rating' | 'poster' | 'genres'>;

export default function MovieCard({ id, title, year, rating, poster, genres }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="card group cursor-pointer"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-3">
        <img
          src={poster}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex items-center bg-background/90 rounded-full px-2 py-1">
          <Star className="w-4 h-4 text-accent mr-1" fill="currentColor" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </div>
      <h3 className="font-semibold text-lg leading-tight mb-1">{title}</h3>
      <div className="flex items-center justify-between text-text-secondary text-sm">
        <span>{year}</span>
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 2).map((genre) => (
            <span key={genre} className="bg-accent/10 text-accent px-2 py-0.5 rounded-full">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}