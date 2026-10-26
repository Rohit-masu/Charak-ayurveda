import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { content } from '../../data/content';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const data = content.announcement;

  if (!data?.enabled || dismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-neem text-gold-soft border-b border-gold/30 px-4 py-2 text-xs sm:text-sm font-body select-none relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 hidden xs:inline" />
          <span className="text-paper/90">{data.text}</span>
          {data.actionText && (
            <a
              href={data.actionHref}
              className="text-gold-soft underline font-medium hover:text-paper ml-1 transition-colors"
            >
              {data.actionText} &rarr;
            </a>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="text-gold-soft/70 hover:text-paper transition-colors p-1 rounded-[2px]"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
