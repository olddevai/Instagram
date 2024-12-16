export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  website?: string;
  profileImage?: string;
  followers: string[];
  following: string[];
  isPrivate: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  location?: string;
  hashtags: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  likes: string[];
  createdAt: Date;
  replies?: Comment[];
}

export interface Story {
  id: string;
  userId: string;
  media: string;
  viewers: string[];
  createdAt: Date;
  expiresAt: Date;
}