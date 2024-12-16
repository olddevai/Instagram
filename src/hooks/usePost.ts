import { useState } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthStore } from '../store/authStore';
import type { Post } from '../types';

export function usePost() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const createPost = async (images: File[], caption: string, location?: string) => {
    if (!user) throw new Error('Must be logged in');
    setLoading(true);

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `posts/${user.id}/${Date.now()}-${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      const hashtags = caption.match(/#[a-zA-Z0-9]+/g) || [];

      const post: Omit<Post, 'id'> = {
        userId: user.id,
        caption,
        images: imageUrls,
        likes: [],
        comments: [],
        location,
        hashtags,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'posts'), post);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    if (!user) throw new Error('Must be logged in');
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: [...(user.likes || []), user.id],
    });
  };

  const deletePost = async (postId: string) => {
    if (!user) throw new Error('Must be logged in');
    await deleteDoc(doc(db, 'posts', postId));
  };

  return { createPost, likePost, deletePost, loading };
}