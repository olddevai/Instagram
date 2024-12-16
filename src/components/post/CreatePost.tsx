import React, { useState } from 'react';
import { usePost } from '../../hooks/usePost';
import { Image, MapPin, X } from 'lucide-react';

export function CreatePost() {
  const [images, setImages] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [previews, setPreviews] = useState<string[]>([]);
  const { createPost, loading } = usePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(images, caption, location);
      setImages([]);
      setCaption('');
      setLocation('');
      setPreviews([]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
        {previews.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                    setPreviews(previews.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <label className="cursor-pointer block">
            <Image className="mx-auto mb-2" />
            <span className="text-gray-500">Upload photos or videos</span>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write a caption..."
        className="w-full p-2 border rounded-lg resize-none h-24"
      />

      <div className="flex items-center space-x-2 border rounded-lg p-2">
        <MapPin size={20} className="text-gray-500" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Add location"
          className="flex-1 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || images.length === 0}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Share'}
      </button>
    </form>
  );
}