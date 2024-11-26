import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../utils/cn';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
}

export default function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  onChange 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            sizes[size],
            'cursor-pointer transition-colors',
            index < rating ? 'text-accent fill-accent' : 'text-text-secondary'
          )}
          onClick={() => onChange?.(index + 1)}
        />
      ))}
    </div>
  );
}