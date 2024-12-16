import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { setUser } = useAuthStore();

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [setUser]);

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email,
        username,
        fullName,
        followers: [],
        following: [],
        isPrivate: false,
        createdAt: new Date(),
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => signOut(auth);

  return { loading, signIn, signUp, logout };
}