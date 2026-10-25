import React from 'react';
import { Book } from '../types/book';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isInteractive?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  isInteractive = true,
}) => {
  const sizeClasses = {
    sm: 'w-20 h-28 text-[9px]',
    md: 'w-44 h-64 text-xs',
    lg: 'w-56 h-80 text-sm',
    xl: 'w-72 h-96 text-base',
  }[size];

  const { coverArt } = book;

  return (
    <div
      className={`relative select-none shrink-0 rounded-r-md rounded-l-xs overflow-hidden transition-all duration-300 book-shadow ${
        isInteractive ? 'hover:book-shadow-hover hover:-translate-y-1' : ''
      } ${sizeClasses} ${className}`}
      style={{
        aspectRatio: '3/4',
      }}
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${coverArt.bgGradient}`} />

      {/* Book spine simulation (left shadow & crease) */}
      <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 left-2.5 md:left-3.5 w-[1px] bg-white/20 pointer-events-none z-10" />

      {/* Subtle paper / linen texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Decorative Ornate Borders & Typography */}
      <div className="relative h-full flex flex-col justify-between p-3 md:p-5 text-center z-1">
        {/* Top header & publisher tag */}
        <div className="pt-1">
          <p
            className="uppercase tracking-[0.2em] font-sans font-medium text-[8px] md:text-[10px] opacity-80"
            style={{ color: coverArt.accentColor }}
          >
            {coverArt.subtitle || book.publisher}
          </p>
          <div
            className="w-8 mx-auto mt-1 border-b"
            style={{ borderColor: coverArt.accentColor, opacity: 0.5 }}
          />
        </div>

        {/* Center: Title & Motif Frame */}
        <div className="my-auto py-2 px-1">
          {/* Decorative motif element */}
          <div className="flex justify-center mb-1.5 opacity-70">
            {coverArt.motif === 'botanical' && (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={coverArt.accentColor} strokeWidth="1.5">
                <path d="M12 22C12 22 12 15 17 11C20.5 8.2 21 4 21 4C21 4 16.8 4.5 14 8C10 13 12 22 12 22Z" />
                <path d="M12 22C12 22 12 15 7 11C3.5 8.2 3 4 3 4C3 4 7.2 4.5 10 8C14 13 12 22 12 22Z" />
              </svg>
            )}
            {coverArt.motif === 'ornate' && (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={coverArt.accentColor} strokeWidth="1.5">
                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
              </svg>
            )}
            {coverArt.motif === 'poetic' && (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={coverArt.accentColor} strokeWidth="1.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            )}
            {(coverArt.motif === 'classic' || coverArt.motif === 'vintage' || coverArt.motif === 'minimalist') && (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={coverArt.accentColor} strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
              </svg>
            )}
          </div>

          {/* Book Title */}
          <h4
            className="font-serif font-bold leading-tight tracking-tight line-clamp-3 text-balance drop-shadow-sm"
            style={{
              color: coverArt.textColor,
              fontSize: size === 'sm' ? '11px' : size === 'md' ? '17px' : size === 'lg' ? '22px' : '28px',
            }}
          >
            {book.title}
          </h4>

          {/* Author */}
          <p
            className="font-serif italic mt-1.5 opacity-90 line-clamp-1"
            style={{
              color: coverArt.textColor,
              fontSize: size === 'sm' ? '8px' : size === 'md' ? '12px' : size === 'lg' ? '14px' : '16px',
            }}
          >
            {book.author}
          </p>
        </div>

        {/* Bottom Vintage Year / Monogram */}
        <div className="pb-1">
          <div
            className="w-6 mx-auto mb-1 border-t"
            style={{ borderColor: coverArt.accentColor, opacity: 0.5 }}
          />
          <span
            className="font-mono text-[9px] tracking-widest opacity-70"
            style={{ color: coverArt.accentColor }}
          >
            EST. {book.publicationYear}
          </span>
        </div>
      </div>

      {/* Right page thickness ridge */}
      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white/20 pointer-events-none" />
    </div>
  );
};
