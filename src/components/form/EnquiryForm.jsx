import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { Field } from './Field';
import { Button } from '../ui/Button';
import { products } from '../../data/products';
import { validateForm } from '../../lib/validators';
import { getFormWhatsAppUrl } from '../../lib/whatsapp';

export function EnquiryForm({ className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    city: '',
    phone: '',
    product: 'Rati Shakti Capsules',
    message: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const waUrl = getFormWhatsAppUrl(formData);
    setLastWhatsAppUrl(waUrl);

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className={clsx('bg-paper rounded-3xl border border-gold/40 p-6 sm:p-8 md:p-10 shadow-lg', className)}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 bg-mist rounded-full flex items-center justify-center mx-auto mb-4 text-forest">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display text-2xl text-neem mb-2 font-semibold">
            Enquiry Prepared
          </h3>
          <p className="font-body text-base text-ink/80 max-w-md mx-auto mb-6">
            Your WhatsApp app has been prompted with your message. If it did not open automatically, please click below:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              variant="primary"
              href={lastWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open in WhatsApp</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  role: '',
                  city: '',
                  phone: '',
                  product: 'Rati Shakti Capsules',
                  message: '',
                  consent: false
                });
              }}
            >
              Send Another Enquiry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <Field label="Full Name" id="name" required error={errors.name}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Rajesh Sharma"
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl bg-paper border font-body text-base text-ink transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest',
                  errors.name ? 'border-red-500' : 'border-gold/40'
                )}
              />
            </Field>

            {/* Role */}
            <Field label="I am a" id="role" required error={errors.role}>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                aria-describedby={errors.role ? 'role-error' : undefined}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl bg-paper border font-body text-base text-ink transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest',
                  errors.role ? 'border-red-500' : 'border-gold/40'
                )}
              >
                <option value="">Select profile...</option>
                <option value="Doctor / Ayurvedic Physician">Doctor / Ayurvedic Physician</option>
                <option value="Chemist / Pharmacy Owner">Chemist / Pharmacy Owner</option>
                <option value="Distributor / Stockist">Distributor / Stockist</option>
                <option value="Customer / Individual">Customer / Individual</option>
                <option value="Other">Other</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* City */}
            <Field label="City / State" id="city" required error={errors.city}>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Varanasi, UP"
                aria-describedby={errors.city ? 'city-error' : undefined}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl bg-paper border font-body text-base text-ink transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest',
                  errors.city ? 'border-red-500' : 'border-gold/40'
                )}
              />
            </Field>

            {/* Phone */}
            <Field label="Mobile Number" id="phone" required error={errors.phone}>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={13}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={clsx(
                  'w-full px-4 py-3 rounded-xl bg-paper border font-body text-base text-ink transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest',
                  errors.phone ? 'border-red-500' : 'border-gold/40'
                )}
              />
            </Field>
          </div>

          {/* Product of Interest */}
          <Field label="Product of Interest" id="product" required error={errors.product}>
            <select
              id="product"
              name="product"
              value={formData.product}
              onChange={handleChange}
              aria-describedby={errors.product ? 'product-error' : undefined}
              className={clsx(
                'w-full px-4 py-3 rounded-xl bg-paper border font-body text-base text-ink transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest',
                errors.product ? 'border-red-500' : 'border-gold/40'
              )}
            >
              <option value="General trade / Institutional enquiry">General trade / Institutional enquiry</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.category.replace('-', ' ')})
                </option>
              ))}
            </select>
          </Field>

          {/* Message */}
          <Field label="Message / Requirements (Optional)" id="message">
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Provide details about your clinic, dealership, or requirement..."
              className="w-full px-4 py-3 rounded-xl bg-paper border border-gold/40 font-body text-base text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-gold-soft focus:border-forest"
            />
          </Field>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gold text-forest focus:ring-gold-soft"
              />
              <span className="font-body text-xs sm:text-sm text-ink/80 leading-normal">
                I understand that submitting this enquiry opens a prefilled message to Charak Ayurveda's official WhatsApp desk, and I consent to being contacted regarding this request per the{' '}
                <Link to="/privacy" className="text-forest underline font-medium hover:text-gold" target="_blank">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="font-body text-xs text-red-600 mt-1">{errors.consent}</p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 text-gold-soft" />
              <span>Submit & Open WhatsApp</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
