import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Clock, Calendar, X, ArrowLeft, ThumbsUp, Heart } from 'lucide-react';
import StarRating from '../components/StarRating';
import RichTextEditor from '../components/RichTextEditor';
import AuthModal from '../components/AuthModal';
import { sampleMovies } from '../data/sampleMovies';
import { cn } from '../utils/cn';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [reviewContent, setReviewContent] = React.useState('');
  const [userRating, setUserRating] = React.useState(0);
  const [sortBy, setSortBy] = React.useState<'recent' | 'helpful'>('recent');
  const [isVisible, setIsVisible] = React.useState(false);

  const movie = sampleMovies.find(m => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const sortedReviews = [...movie.reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <button 
            className="btn-primary"
            onClick={() => navigate('/')}
          >
            Return Home
          </button>
        </div>
      </div>
    );
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

      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex gap-8 animate-fade-up">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-64 rounded-lg shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                <div className="flex items-center space-x-6 text-text-secondary">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{movie.runtime} min</span>
                  </div>
                  <StarRating rating={movie.rating} size="lg" />
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-8">
                  <button 
                    className="btn-accent flex items-center"
                    onClick={() => setShowTrailer(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </button>
                  <button className="btn-primary">Add to Watchlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Plot */}
        <section className="animate-fade-up delay-100">
          <h2 className="text-2xl font-bold mb-4">Plot</h2>
          <p className="text-text-secondary leading-relaxed">{movie.plot}</p>
        </section>

        {/* Cast & Crew */}
        <section className="animate-fade-up delay-200">
          <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map((person) => (
              <div key={person.id} className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-2">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold">{person.name}</h3>
                <p className="text-sm text-text-secondary">{person.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Review Section */}
        <section className="animate-fade-up delay-300">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <div className="bg-primary rounded-lg p-6 mb-12">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <StarRating 
                rating={userRating} 
                onChange={setUserRating} 
                size="lg" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <div className="min-h-[200px] bg-background/50 rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-accent/50">
                <RichTextEditor 
                  content={reviewContent} 
                  onChange={setReviewContent} 
                />
              </div>
            </div>
            <button 
              className="btn-accent"
              onClick={() => setShowAuthModal(true)}
            >
              Submit Review
            </button>
          </div>

          {/* User Reviews */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">User Reviews</h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
                className="bg-primary border border-white/10 rounded-lg px-4 py-2"
              >
                <option value="recent">Most Recent</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-primary rounded-lg p-6 animate-fade-up"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{review.userName}</h3>
                        <p className="text-sm text-text-secondary">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  
                  <p className="text-text-secondary mb-4">{review.content}</p>
                  
                  <div className="flex items-center space-x-6 text-text-secondary">
                    <button className="flex items-center space-x-2 hover:text-text transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-text transition-colors">
                      <ThumbsUp className="w-5 h-5" />
                      <span>{review.helpful} found this helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-background/95 flex items-center justify-center z-50 animate-fade">
          <div className="relative max-w-4xl w-full aspect-video">
            <iframe
              src={movie.trailer}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
            <button
              className="absolute -top-12 right-0 text-text-secondary hover:text-text flex items-center group"
              onClick={() => setShowTrailer(false)}
            >
              <span className="mr-2">Close</span>
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}