import { contact, doctor, site } from "../data/site";

export function whatsappUrl(message, number = contact.whatsappNumber) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message.trim())}`;
}

export function productEnquiryUrl(productName, pack) {
  return whatsappUrl(
    `Hello ${site.brand},\nI would like to know more about ${productName}${pack ? ` (${pack})` : ""}.`
  );
}

// Goes to the doctor's own number once it is set in data/site.js, otherwise to the main business number.
export function doctorConsultUrl(productName) {
  return whatsappUrl(
    `Hello ${site.brand},\nI would like a ${doctor.free ? "free " : ""}consultation with your ${doctor.title}${
      productName ? ` about ${productName}` : ""
    }.`,
    doctor.whatsappNumber || contact.whatsappNumber
  );
}

export function comboEnquiryUrl(combo) {
  const lines = combo.items.map(({ product, pack }) => `• ${product.name} (${product.packs[pack].label})`);
  return whatsappUrl(`Hello ${site.brand},\nI would like to order the ${combo.name} combo:\n${lines.join("\n")}`);
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
