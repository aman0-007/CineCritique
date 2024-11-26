import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import { sampleMovies } from '../data/sampleMovies';

const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance'];

export default function Home() {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const filteredMovies = selectedGenres.length > 0
    ? sampleMovies.filter(movie => 
        movie.genres.some(genre => selectedGenres.includes(genre))
      )
    : sampleMovies;

  const topRatedMovies = [...sampleMovies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div>
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Quick Filters</h2>
          <GenreFilter
            genres={genres}
            selectedGenres={selectedGenres}
            onGenreSelect={toggleGenre}
          />
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <button 
              className="btn-primary"
              onClick={() => navigate('/movies/trending')}
            >
              View All
            </button>
          </div>
          <MovieGrid movies={filteredMovies.slice(0, 4)} />
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Top Rated</h2>
            <button 
              className="btn-primary"
              onClick={() => navigate('/movies/top-rated')}
            >
              View All
            </button>
          </div>
          <MovieGrid movies={topRatedMovies} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Recent Reviews</h2>
            <button 
              className="btn-primary"
              onClick={() => navigate('/movies/recent')}
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleMovies.slice(0, 4).map((movie) => (
              <div key={movie.id} className="bg-primary rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={movie.cast[0]?.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"}
                    alt="User avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-text-secondary text-sm">2 hours ago</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Review for "{movie.title}"</h4>
                  <p className="text-text-secondary line-clamp-3">
                    An absolutely stunning continuation of the epic saga. The visuals are breathtaking,
                    and the story keeps you on the edge of your seat throughout the entire film.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}