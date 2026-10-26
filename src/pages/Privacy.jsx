import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { LoginModal } from '../components/layout/LoginModal';
import { config } from '../data/config';

export function Privacy() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState('doctor');

  const handleOpenLogin = (tab = 'doctor') => {
    setLoginModalTab(tab);
    setLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-body">
      <Header onOpenLogin={handleOpenLogin} />

      <main className="flex-1 py-16 sm:py-24">
        <Container className="max-w-4xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-forest hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Charak Ayurveda</span>
          </Link>

          {/* Draft banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5 shadow-2xs">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-sm font-semibold text-amber-900">
                Notice: Draft Document Under Review
              </h4>
              <p className="font-body text-xs text-amber-800 mt-0.5">
                This Privacy Policy is a preliminary working draft prepared for trade catalog compliance and is awaiting final institutional review by Charak Ayurveda's legal advisory.
              </p>
            </div>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-neem font-semibold mb-4">
            Privacy Policy
          </h1>
          <p className="font-body text-xs text-ink/60 mb-8 border-b border-gold/20 pb-4">
            Last Updated: October 2026
          </p>

          <div className="space-y-6 font-body text-base text-ink/80 leading-relaxed font-normal">
            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                1. Overview
              </h2>
              <p>
                {config.brandName} respects the privacy of healthcare professionals, distributors, retail partners, and individuals who visit our website. This document explains how communication data submitted through our website forms is processed.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                2. Information We Collect
              </h2>
              <p className="mb-2">
                Our landing page does not store information in a central database in Phase 1. When you choose to initiate a trade enquiry through our online form, you may provide:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Your full name and professional profile (Doctor, Chemist, Distributor, Customer).</li>
                <li>Your city and state of operation.</li>
                <li>Your 10-digit mobile contact number.</li>
                <li>Specific product formulation(s) of interest and requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                3. How Your Information Is Transmitted (WhatsApp Protocol)
              </h2>
              <p>
                When you click "Submit & Open WhatsApp", the information entered in the form is converted into a formatted, prefilled text message that opens directly in your official WhatsApp application. No personal information is stored on our web server or sold to third-party ad brokers. Communication thereafter is encrypted end-to-end according to WhatsApp's standard privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                4. Purpose of Use
              </h2>
              <p>
                Information communicated via WhatsApp is utilized strictly by {config.brandName}'s representatives to answer your queries, share product monographs, fulfill institutional requests, and coordinate authorized Ayurvedic distribution.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                5. Data Rights & Opt-Out
              </h2>
              <p>
                You may request deletion or discontinuation of communications at any time simply by messaging "STOP" or "UNSUBSCRIBE" on our official WhatsApp channel or by emailing our desk at {config.email || 'care@charakayurveda.in'}.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-neem font-semibold mb-2">
                6. Contact Information
              </h2>
              <p>
                For questions regarding this policy, reach our desk at:
              </p>
              <div className="bg-mist p-5 rounded-2xl border border-gold/30 text-sm mt-2">
                <p className="font-semibold text-neem">{config.brandName}</p>
                <p>{config.address}</p>
                <p>Email: {config.email}</p>
                <p>Telephone: {config.phone}</p>
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer onOpenLogin={handleOpenLogin} />

      <LoginModal
        isOpen={loginModalOpen}
        initialTab={loginModalTab}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}
