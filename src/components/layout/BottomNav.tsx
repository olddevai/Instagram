import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';

export function BottomNav() {
  const location = useLocation();
  const iconSize = 24;

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/explore', label: 'Search' },
    { icon: PlusSquare, path: '/create', label: 'Create' },
    { icon: Heart, path: '/activity', label: 'Activity' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        {navItems.map(({ icon: Icon, path, label }) => (
          <Link
            key={path}
            to={path}
            className={`p-2 rounded-lg transition-colors ${
              location.pathname === path
                ? 'text-black'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Icon size={iconSize} />
            <span className="sr-only">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}