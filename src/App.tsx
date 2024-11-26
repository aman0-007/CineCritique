import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MovieDetails from './pages/MovieDetails';
import MovieList from './pages/MovieList';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies/:category" element={<MovieList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;