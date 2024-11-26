export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  poster: string;
  backdrop?: string;
  genres: string[];
  runtime: number;
  plot: string;
  trailer?: string;
  cast: {
    id: string;
    name: string;
    role: string;
    photo: string;
  }[];
  crew: {
    id: string;
    name: string;
    role: string;
    photo: string;
  }[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  helpful: number;
}