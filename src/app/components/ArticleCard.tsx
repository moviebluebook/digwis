'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Collection {
  id: number;
  name: string;
  description: string | null;
  coverImage: string;
}

interface ArticleCardProps {
  title: string;
  summary: string;
  collections: Collection[];
}

export default function ArticleCard({ title, summary, collections }: ArticleCardProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const savedLikes = localStorage.getItem(`article-likes-${title}`);
    const savedIsLiked = localStorage.getItem(`article-isLiked-${title}`);
    if (savedLikes) setLikes(parseInt(savedLikes));
    if (savedIsLiked) setIsLiked(savedIsLiked === 'true');
  }, [title]);

  const handleLike = () => {
    const newLikes = !isLiked ? likes + 1 : likes - 1;
    const newIsLiked = !isLiked;
    setLikes(newLikes);
    setIsLiked(newIsLiked);
    localStorage.setItem(`article-likes-${title}`, newLikes.toString());
    localStorage.setItem(`article-isLiked-${title}`, newIsLiked.toString());
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleClick = () => {
    router.push(`/article/${encodeURIComponent(title)}`);
  };

  const coverImage = collections[0]?.coverImage || '/images/article-placeholder.svg';

  return (
    <article 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <Image
          src={imageError ? '/images/article-placeholder.svg' : coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{summary}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-500 dark:text-gray-400 flex items-center space-x-2 overflow-hidden">
            {collections.map((collection) => (
              <span key={collection.id} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {collection.name}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {isShared && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  已复制链接
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
