import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Stethoscope, ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../ui/Button';

export function LoginModal({ isOpen, onClose, initialTab = 'doctor' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [doctorId, setDoctorId] = useState('');
  const [doctorPass, setDoctorPass] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [simulatedLogin, setSimulatedLogin] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setActiveTab(initialTab);
    setSimulatedLogin(null);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    if (!doctorId || !doctorPass) return;
    setSimulatedLogin('doctor');
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPass) return;
    setSimulatedLogin('admin');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-portal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neem/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-paper rounded-2xl border border-gold/40 shadow-2xl p-6 sm:p-8 z-10 transform transition-all duration-300"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close portal"
          className="absolute top-5 right-5 p-2 rounded-full text-ink/60 hover:text-forest hover:bg-mist transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-mist border border-gold/40 flex items-center justify-center mx-auto mb-3 text-forest shadow-sm">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <h2 id="login-portal-title" className="font-display text-2xl text-neem font-semibold">
            Institutional Login Portal
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink/70 mt-1">
            Access credentials for verified Doctors, Medical Reps & Administration
          </p>
        </div>

        {/* Portal Tabs */}
        <div className="flex rounded-xl bg-mist p-1 mb-6 border border-gold/25" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'doctor'}
            onClick={() => { setActiveTab('doctor'); setSimulatedLogin(null); }}
            className={clsx(
              'flex-1 py-2.5 px-4 rounded-lg font-body text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
              activeTab === 'doctor'
                ? 'bg-paper text-forest font-semibold shadow-sm border border-gold/30'
                : 'text-ink/70 hover:text-forest'
            )}
          >
            <Stethoscope className="w-4 h-4 text-gold" />
            <span>Doctor / MR Login</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'admin'}
            onClick={() => { setActiveTab('admin'); setSimulatedLogin(null); }}
            className={clsx(
              'flex-1 py-2.5 px-4 rounded-lg font-body text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
              activeTab === 'admin'
                ? 'bg-paper text-forest font-semibold shadow-sm border border-gold/30'
                : 'text-ink/70 hover:text-forest'
            )}
          >
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Admin Portal</span>
          </button>
        </div>

        {simulatedLogin ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl text-neem font-medium mb-1">
              Authentication Verified
            </h3>
            <p className="font-body text-sm text-ink/80 max-w-xs mx-auto mb-5">
              {simulatedLogin === 'doctor'
                ? 'MR Representative dashboard is launching with clinical sample allotment.'
                : 'Master operations database console session established.'}
            </p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-mist text-forest border border-gold/30">
              Phase 2 Portal Activated
            </span>
          </div>
        ) : activeTab === 'doctor' ? (
          /* Doctor / MR Form */
          <form onSubmit={handleDoctorSubmit} className="space-y-4">
            <div>
              <label htmlFor="doctorId" className="block font-body text-xs sm:text-sm font-medium text-neem mb-1.5">
                MR Code or Registered Mobile
              </label>
              <input
                type="text"
                id="doctorId"
                required
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                placeholder="e.g. MR-CHARAK-2049 or 98765XXXXX"
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-gold/40 font-body text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="doctorPass" className="block font-body text-xs sm:text-sm font-medium text-neem mb-1.5">
                Security PIN / Password
              </label>
              <input
                type="password"
                id="doctorPass"
                required
                value={doctorPass}
                onChange={(e) => setDoctorPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-gold/40 font-body text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-body text-ink/70 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-forest focus:ring-gold-soft" />
                <span>Keep me signed in</span>
              </label>
              <a href="#contact" onClick={onClose} className="text-forest hover:text-gold underline font-medium">
                Request MR Access
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 rounded-xl mt-2 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-gold-soft" />
              <span>Enter Doctor & MR Portal</span>
            </Button>
          </form>
        ) : (
          /* Admin Form */
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block font-body text-xs sm:text-sm font-medium text-neem mb-1.5">
                Administrator Email
              </label>
              <input
                type="email"
                id="adminEmail"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@charakayurveda.in"
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-gold/40 font-body text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest"
              />
            </div>

            <div>
              <label htmlFor="adminPass" className="block font-body text-xs sm:text-sm font-medium text-neem mb-1.5">
                Master Password
              </label>
              <input
                type="password"
                id="adminPass"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-gold/40 font-body text-sm text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-body text-ink/70 pt-1">
              <span className="text-forest font-medium">Restricted Operational Console</span>
              <a href="mailto:care@charakayurveda.in" className="text-forest hover:text-gold underline">
                Forgot access?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 rounded-xl mt-2 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-gold-soft" />
              <span>Access Admin Dashboard</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
