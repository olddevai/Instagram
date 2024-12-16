import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BottomNav } from './components/layout/BottomNav';
import { Stories } from './components/home/Stories';
import { Post } from './components/post/Post';

const mockPosts = [
  {
    id: '1',
    username: 'johndoe',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    images: ['https://images.unsplash.com/photo-1682687220742-aba13b6e50ba'],
    caption: 'Beautiful sunset today! 🌅 #nature #photography',
    likes: 1234,
    timestamp: '2 hours ago',
  },
  // Add more mock posts
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-16">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-screen-lg mx-auto px-4 py-3">
            <h1 className="text-2xl font-semibold">Instagram</h1>
          </div>
        </header>

        <main className="max-w-screen-lg mx-auto">
          <Stories />
          <div className="px-4">
            {mockPosts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;