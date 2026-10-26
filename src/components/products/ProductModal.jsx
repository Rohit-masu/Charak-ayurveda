import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { X, MessageCircle } from 'lucide-react';
import { ProductStage } from '../ui/ProductStage';
import { PackSwitcher } from './PackSwitcher';
import { Button } from '../ui/Button';
import { getProductWhatsAppUrl } from '../../lib/whatsapp';

export function ProductModal({ product, isOpen, onClose }) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Reset pack selection when product changes
  useEffect(() => {
    setSelectedPackIndex(0);
  }, [product]);

  // Handle focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus modal
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector('button');
        if (firstFocusable) firstFocusable.focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const currentPack = product.packs && product.packs[selectedPackIndex];
  const whatsappUrl = getProductWhatsAppUrl(
    product.name,
    currentPack ? currentPack.label : ''
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neem/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className={clsx(
          'relative w-full max-w-4xl bg-paper rounded-[4px] border border-gold shadow-2xl',
          'p-6 sm:p-8 md:p-10 z-10 max-h-[92vh] overflow-y-auto transform transition-all duration-200 scale-100'
        )}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-[3px] text-ink/60 hover:text-forest hover:bg-mist/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Stage + PackSwitcher */}
          <div>
            <ProductStage
              filename={currentPack ? currentPack.file : null}
              alt={`${product.name} - ${currentPack ? currentPack.label : ''}`}
              transparent={currentPack ? currentPack.transparent : false}
              aspectRatio="aspect-[4/5]"
              arched={true}
              className="w-full"
            />

            {product.packs && product.packs.length > 1 && (
              <div className="mt-4">
                <span className="font-body text-xs uppercase tracking-wider text-ink/70 font-medium">
                  Select Pack Size:
                </span>
                <PackSwitcher
                  packs={product.packs}
                  selectedIndex={selectedPackIndex}
                  onSelect={(idx) => setSelectedPackIndex(idx)}
                />
              </div>
            )}
          </div>

          {/* Right: Info & Specs */}
          <div className="flex flex-col">
            <span className="font-body text-xs uppercase tracking-widest text-gold font-semibold mb-1">
              {product.category.replace('-', ' ')}
            </span>

            <h2 id="modal-product-title" className="font-display text-2xl sm:text-3xl text-neem font-normal">
              {product.name}
            </h2>

            <p className="font-body text-base text-forest font-medium mt-1 mb-4">
              {product.line}
            </p>

            {/* Label Statements */}
            {product.labelText && product.labelText.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.labelText.map((label, idx) => (
                  <span
                    key={idx}
                    className="inline-block text-xs font-medium px-3 py-1 rounded-[3px] bg-mist text-forest border border-forest/15"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-5">
                <h4 className="font-display text-sm tracking-wide text-neem uppercase mb-2">
                  Key Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-full bg-paper border border-gold/30 text-ink/90 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dosage */}
            {product.dosage && (
              <div className="mb-4">
                <h4 className="font-display text-sm tracking-wide text-neem uppercase mb-1">
                  Dosage / Directions
                </h4>
                <p className="font-body text-sm text-ink/80 leading-relaxed">
                  {product.dosage}
                </p>
              </div>
            )}

            {/* Storage */}
            {product.storage && (
              <div className="mb-6">
                <h4 className="font-display text-sm tracking-wide text-neem uppercase mb-1">
                  Storage & Instructions
                </h4>
                <p className="font-body text-sm text-ink/70 leading-relaxed">
                  {product.storage}
                </p>
              </div>
            )}

            {/* WhatsApp CTA */}
            <div className="pt-4 border-t border-gold/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
