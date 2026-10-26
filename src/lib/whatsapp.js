import { config } from '../data/config';

function getCleanNumber() {
  return (config.whatsappNumber || '').replace(/[^\d]/g, '');
}

export function buildWhatsAppUrl(messageText) {
  const number = getCleanNumber();
  if (!number) return '#';
  const encoded = encodeURIComponent(messageText.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

export function getGeneralWhatsAppUrl() {
  const msg = `Hello ${config.brandName},\nI would like to know more about your Ayurvedic products.`;
  return buildWhatsAppUrl(msg);
}

export function getProductWhatsAppUrl(productName, packLabel) {
  const packInfo = packLabel ? ` - ${packLabel}` : '';
  const msg = `Hello ${config.brandName},\nI am interested in:\nProduct: ${productName}${packInfo}\nPlease share availability and details.`;
  return buildWhatsAppUrl(msg);
}

export function getDoctorWhatsAppUrl() {
  const msg = `Hello ${config.brandName},\nI am a Doctor / Distributor and would like to receive your institutional catalog and therapeutic monographs.`;
  return buildWhatsAppUrl(msg);
}

export function getFormWhatsAppUrl(formData) {
  const lines = [
    `*Trade / Clinical Enquiry - ${config.brandName}*`,
    `Name: ${formData.name}`,
    `Role: ${formData.role}`,
    `City: ${formData.city}`,
    `Phone: ${formData.phone}`,
    `Product of Interest: ${formData.product}`,
    formData.message ? `Message: ${formData.message}` : null
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join('\n'));
}
