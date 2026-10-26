import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../../lib/whatsapp';

export function FloatingWhatsApp() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="md:hidden fixed bottom-6 right-5 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire directly on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </a>
    </aside>
  );
}
