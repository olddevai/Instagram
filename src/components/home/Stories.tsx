import React from 'react';
import { Plus } from 'lucide-react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
}

const mockStories: Story[] = [
  {
    id: '1',
    username: 'your_story',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    hasStory: false,
  },
  // Add more mock stories here
];

export function Stories() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 p-4">
        {mockStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center space-y-1 cursor-pointer"
          >
            <div
              className={`w-16 h-16 rounded-full p-[2px] ${
                story.hasStory
                  ? 'bg-gradient-to-tr from-yellow-400 to-pink-600'
                  : 'border-2 border-gray-200'
              }`}
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {story.username === 'your_story' && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                    <Plus size={12} className="text-white" />
                  </div>
                )}
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs truncate w-16 text-center">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}