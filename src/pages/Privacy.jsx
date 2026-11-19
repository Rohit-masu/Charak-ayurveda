import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Crest from "../components/ui/Crest";
import { contact, legal, site } from "../data/site";

// DRAFT privacy policy. Placeholders in data/site.js `legal` must be filled and the text reviewed
// by the client (or their lawyer) before launch. Keep it accurate to how the site actually works:
// the enquiry form stores nothing on the website; it only opens WhatsApp with a prefilled message.
const sections = [
  {
    h: "Who we are",
    p: [
      `This website is run by ${legal.company} (“${site.brand}”, “we”, “us”). ${legal.address ? `Our registered address is ${legal.address}.` : ""}`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "When you use the enquiry form we ask for your name, city, mobile number, the kind of enquiry (for example doctor, chemist, distributor, customer or career application) and an optional message.",
      "The form does not save this information on our website. When you press “Continue on WhatsApp”, it opens WhatsApp on your device with your details written into a message. Nothing is sent to us until you press send in WhatsApp.",
      "If you contact us by WhatsApp, phone or email, we receive what you choose to share in that conversation.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "We use your details only to reply to your enquiry: to share product or catalogue information, to discuss stocking or distribution, to arrange a consultation with our doctor, or to consider a job application.",
      "We do not sell your personal information, and we do not share it with anyone outside our team except where the law requires it.",
    ],
  },
  {
    h: "WhatsApp",
    p: [
      "Messages sent through WhatsApp are also handled by WhatsApp (Meta) under its own privacy policy. Please read it if you have questions about how WhatsApp treats your data.",
    ],
  },
  {
    h: "Cookies and tracking",
    p: [
      "This website does not use advertising or analytics cookies, and it does not track you across other websites. Fonts and images are served from our own site.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      `We keep enquiry conversations only for as long as we need them to respond and to follow up, and no longer than ${legal.retention}, unless the law requires us to keep them longer.`,
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask us to see, correct or delete the personal information we hold about you, or to stop contacting you, at any time. These rights follow applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
      `To make a request, email ${legal.privacyEmail || contact.email} or message us on WhatsApp at ${contact.phoneDisplay}.`,
    ],
  },
  {
    h: "Medical information",
    p: [
      "Please do not share detailed medical records through the enquiry form. Our doctor consultation happens directly on WhatsApp, and our doctor will ask for what is needed.",
    ],
  },
  {
    h: "Changes",
    p: ["If we change this policy we will update this page and the date below."],
  },
];

const year = new Date().getFullYear();

export default function Privacy() {
  useEffect(() => {
    document.title = `Privacy policy — ${site.brand}`;
    document.documentElement.dataset.ready = "true";
  }, []);

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <header className="border-b border-charcoal/10">
        <div className="shell flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-bronze">
            <Crest className="h-10 w-10" />
            <span className="leading-none">
              <span className="block font-display text-[19px] tracking-[0.22em] text-charcoal">CHARAK</span>
              <span className="label mt-1 block text-[8.5px] text-bronze-dark">Ayurveda</span>
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/70 transition-colors hover:text-bronze-dark"
          >
            <ArrowLeft size={14} /> Back to the site
          </a>
        </div>
      </header>

      <main className="shell py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          {legal.draft && (
            <p className="mb-10 inline-block rounded-full border border-bronze/40 bg-sand px-4 py-2 text-xs text-bronze-dark">
              Draft — to be reviewed by {site.brand} before launch
            </p>
          )}
          <p className="label text-bronze-dark">{site.brand}</p>
          <h1 className="display mt-6 text-[clamp(2.8rem,6vw,5rem)]">
            Privacy <em className="font-normal italic text-bronze-dark">policy.</em>
          </h1>
          <p className="mt-6 text-sm text-charcoal/55">Last updated: {legal.updated}</p>

          <div className="mt-14 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {sections.map((s) => (
              <section key={s.h} className="grid gap-4 py-10 sm:grid-cols-[200px_1fr] sm:gap-10">
                <h2 className="font-display text-2xl leading-tight">{s.h}</h2>
                <div className="space-y-4">
                  {s.p.filter(Boolean).map((t) => (
                    <p key={t} className="max-w-[62ch] text-[15px] leading-relaxed text-charcoal/75">
                      {t}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-charcoal py-8 text-ivory">
        <div className="shell flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-ivory/50">
          <span>
            © {year} {site.brand}
          </span>
          <a href="/" className="hover:text-bronze">
            Back to the site
          </a>
        </div>
      </footer>
    </div>
  );
}
