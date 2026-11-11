import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import SplitText from "../bits/SplitText";
import Magnet from "../bits/Magnet";
import { formEnquiryUrl } from "../../lib/whatsapp";
import { contact, enquiryTypes } from "../../data/site";

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!v.city.trim()) errors.city = "Please enter your city.";
  const phone = v.phone.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, "");
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Please enter a valid 10-digit mobile number.";
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="label block text-ink/50 transition-colors group-focus-within:text-gold-dark">
        {label}
      </label>
      {children}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold-dark transition-transform duration-700 ease-lux group-focus-within:scale-x-100" />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#9b2c1f]">
          {error}
        </p>
      )}
    </div>
  );
}

const input =
  "mt-2 w-full border-b border-ink/20 bg-transparent pb-3 pt-1 font-display text-2xl text-ink placeholder:text-ink/25 focus:outline-none";

export default function Contact({ type, onTypeChange }) {
  const [values, setValues] = useState({ name: "", city: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }
    window.open(formEnquiryUrl({ ...values, type }), "_blank", "noopener,noreferrer");
    setOpened(true);
  };

  const err = (k) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  return (
    <section id="contact" className="relative bg-ivory py-28 text-ink sm:py-40">
      <div className="shell grid gap-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-gold-dark">Chapter 06 — Enquire</p>
          <SplitText className="display mt-8 text-[clamp(3.4rem,7vw,7.5rem)]">
            Let&rsquo;s <em className="font-normal italic text-gold-dark">talk.</em>
          </SplitText>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-ink/60">
            Whether you are a doctor, a chemist, a distributor or a customer, write to us and our team will respond.
          </p>

          <ul className="mt-14 space-y-6 border-t border-ink/10 pt-10">
            <li className="flex gap-4">
              <Phone size={18} strokeWidth={1.4} className="mt-1 text-gold-dark" />
              <a href={contact.phoneHref} className="font-display text-2xl hover:text-gold-dark">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail size={18} strokeWidth={1.4} className="mt-1 text-gold-dark" />
              <a href={`mailto:${contact.email}`} className="font-display text-2xl hover:text-gold-dark">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-4">
              <MapPin size={18} strokeWidth={1.4} className="mt-1 shrink-0 text-gold-dark" />
              <p className="text-[15px] leading-relaxed text-ink/70">
                {contact.address}
                <br />
                <span className="text-ink/45">{contact.hours}</span>
                {contact.mapsUrl && (
                  <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-gold-dark underline-offset-4 hover:underline">
                    Open in Google Maps
                  </a>
                )}
              </p>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} noValidate className="space-y-10 rounded-[32px] bg-ivory-deep p-7 sm:p-12 lg:col-span-6 lg:col-start-7">
          <fieldset>
            <legend className="label text-ink/50">I am a</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {enquiryTypes.map((t) => (
                <label
                  key={t}
                  className={`cursor-pointer rounded-full border px-4 py-2.5 text-[13px] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                    t === type ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink/70 hover:border-ink/40"
                  }`}
                >
                  <input type="radio" name="type" value={t} checked={t === type} onChange={() => onTypeChange(t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-10 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" autoComplete="name" value={values.name} onChange={set("name")} className={input} placeholder="Your name" {...err("name")} />
            </Field>
            <Field id="city" label="City" error={errors.city}>
              <input id="city" autoComplete="address-level2" value={values.city} onChange={set("city")} className={input} placeholder="Your city" {...err("city")} />
            </Field>
          </div>
          <Field id="phone" label="Mobile number" error={errors.phone}>
            <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} className={input} placeholder="10-digit number" {...err("phone")} />
          </Field>
          <Field id="message" label="Message (optional)">
            <textarea id="message" rows={3} value={values.message} onChange={set("message")} className={`${input} resize-none`} placeholder="Tell us what you are looking for" />
          </Field>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Magnet strength={0.2}>
              <button
                type="submit"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ivory transition-colors duration-500 hover:bg-forest"
              >
                Continue on WhatsApp
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </button>
            </Magnet>
            <p className="max-w-[16rem] text-xs leading-relaxed text-ink/50" aria-live="polite">
              {opened
                ? "WhatsApp has opened with your message. Press send there to reach our team."
                : "Your enquiry opens in WhatsApp, ready to send."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
