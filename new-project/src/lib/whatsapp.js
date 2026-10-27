import { contact, site } from "../data/site";

export function whatsappUrl(message) {
  const number = contact.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message.trim())}`;
}

export function productEnquiryUrl(productName, pack) {
  return whatsappUrl(
    `Hello ${site.brand},\nI would like to know more about ${productName}${pack ? ` (${pack})` : ""}.`
  );
}

export function formEnquiryUrl({ name, type, city, phone, message }) {
  const lines = [
    `Enquiry — ${site.brand}`,
    `Name: ${name}`,
    `Profile: ${type}`,
    `City: ${city}`,
    `Phone: ${phone}`,
    message && `Message: ${message}`,
  ].filter(Boolean);
  return whatsappUrl(lines.join("\n"));
}
