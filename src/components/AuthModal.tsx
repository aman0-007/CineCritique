import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication here
    console.log('Form submitted:', { mode, formData });
  };

  return (
    <div className="fixed inset-0 bg-background/95 flex items-center justify-center z-50 animate-fade">
      <div className="bg-primary rounded-xl p-8 max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-text-secondary hover:text-text transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-text-secondary">
            {mode === 'login' 
              ? 'Sign in to continue your movie journey'
              : 'Join our community of movie enthusiasts'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                required={mode === 'register'}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>

          <button type="submit" className="w-full btn-accent py-3">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="mt-6 text-center text-sm">
          <span className="text-text-secondary">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-accent hover:text-accent-hover font-medium"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}