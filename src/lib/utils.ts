import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  return format(date, 'MMM d, yyyy');
}

export function getImageUrl(path: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/${encodeURIComponent(path)}`;
}