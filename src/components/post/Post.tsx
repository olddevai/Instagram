import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostProps {
  username: string;
  userImage: string;
  images: string[];
  caption: string;
  likes: number;
  timestamp: string;
}

export function Post({ username, userImage, images, caption, likes, timestamp }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center p-4">
        <img
          src={userImage}
          alt={username}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="ml-3 font-semibold">{username}</span>
      </div>

      <div className="relative" onDoubleClick={handleDoubleTap}>
        <img
          src={images[currentImageIndex]}
          alt="Post content"
          className="w-full aspect-square object-cover"
        />
        {showLikeAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Heart
              className="text-white fill-white"
              size={96}
              strokeWidth={1}
            />
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <Heart
              className={`cursor-pointer ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-black'
              }`}
              onClick={() => setIsLiked(!isLiked)}
            />
            <MessageCircle className="cursor-pointer" />
            <Send className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer" />
        </div>

        <div className="font-semibold mb-2">{likes.toLocaleString()} likes</div>
        <div>
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>
        <div className="text-gray-500 text-sm mt-2">{timestamp}</div>
      </div>
    </div>
  );
}