import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Post } from './Post';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Post as PostType } from '../../types';

const POSTS_PER_PAGE = 5;

export function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const loadPosts = async (lastDoc?: any) => {
    setLoading(true);
    try {
      const postsQuery = lastDoc
        ? query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(POSTS_PER_PAGE)
          )
        : query(
            collection(db, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(POSTS_PER_PAGE)
          );

      const snapshot = await getDocs(postsQuery);
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostType[];

      if (lastDoc) {
        setPosts((prev) => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (inView && !loading && lastVisible) {
      loadPosts(lastVisible);
    }
  }, [inView]);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      {loading && <div className="text-center py-4">Loading...</div>}
      <div ref={ref} />
    </div>
  );
}