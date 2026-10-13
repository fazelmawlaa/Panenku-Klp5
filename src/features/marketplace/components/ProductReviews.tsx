import React, { useState } from 'react';
import { Star, ArrowRight, Send } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  initialRating?: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ initialRating = 5.0 }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'fazel',
      date: '13 Okt 2026',
      rating: 5.0,
      comment: 'bagus',
    },
  ]);

  const [inputRating, setInputRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      author: 'fazel',
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      rating: inputRating,
      comment: commentText.trim(),
    };

    setReviews([newReview, ...reviews]);
    setCommentText('');
  };

  return (
    <div className="space-y-6 mt-8">
      {/* 1. Nilai & Ulasan Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <h2 className="text-base font-bold text-gray-900">Nilai & Ulasan</h2>
          <button
            type="button"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rating Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Big Score on Left */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
              {initialRating.toFixed(1).replace('.', ',')}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              dari 5 <br />
              <span className="font-semibold text-gray-500">{reviews.length} Penilaian</span>
            </p>
          </div>

          {/* Star Bars on Right */}
          <div className="md:col-span-8 space-y-1.5">
            {[5, 4, 3, 2, 1].map((starVal) => {
              const isFive = starVal === 5;
              return (
                <div key={starVal} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-0.5 w-20 shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= starVal
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-100 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isFive ? 'bg-amber-400 w-full' : 'bg-transparent w-0'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tulis Ulasan Anda Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-900 mb-2">Tulis Ulasan Anda</h3>

          <div className="mb-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Beri Bintang
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setInputRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 focus:outline-none cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-5 h-5 ${
                      (hoverRating || inputRating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-100 text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment input form */}
          <form onSubmit={handleSubmitReview} className="flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Bagikan ulasan Anda"
              className="flex-1 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="bg-[#1b4332] hover:bg-[#153427] disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>Kirim</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Semua Ulasan List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xs p-6 sm:p-8">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Semua Ulasan
        </h3>

        <div className="divide-y divide-gray-100">
          {reviews.map((rev) => (
            <div key={rev.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{rev.author}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rev.date}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rev.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-700 italic mt-2.5">&ldquo;{rev.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
