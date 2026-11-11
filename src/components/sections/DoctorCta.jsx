import { Clock, MessageCircle, Stethoscope } from "lucide-react";
import SplitText from "../bits/SplitText";
import ArrowLink from "../ui/ArrowLink";
import Crest from "../ui/Crest";
import { doctorConsultUrl } from "../../lib/whatsapp";
import { doctor } from "../../data/site";

const points = [
  { icon: Stethoscope, text: `Speak with our ${doctor.title}` },
  { icon: MessageCircle, text: doctor.free ? "Free, on WhatsApp" : "On WhatsApp" },
  { icon: Clock, text: "Before you choose a product" },
];

// "Ask our doctor" band. Copy is kept to the client's approved wording in data/site.js.
export default function DoctorCta() {
  return (
    <section id="doctor" className="relative bg-forest overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(201,164,92,0.16), transparent 65%)" }}
      />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label text-gold">Ask our doctor</p>
          <SplitText className="display mt-6 text-[clamp(2.6rem,5vw,5.2rem)]">
            Questions? Ask an <em className="gold-text font-normal">Ayurvedic doctor.</em>
          </SplitText>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/70">
            {doctor.line} Talk it through with our {doctor.title} on WhatsApp{doctor.free ? ", free of charge" : ""}, and
            use any product as directed by an Ayurvedic physician.
          </p>
          <div className="mt-10">
            <ArrowLink href={doctorConsultUrl("Rati Shakti")} variant="gold" external>
              {doctor.free ? "Free consultation on WhatsApp" : "Consult on WhatsApp"}
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-[28px] border border-gold/20 bg-ink/40 p-8 sm:p-10">
            <Crest className="h-14 w-14 text-gold" />
            <ul className="mt-8 space-y-5">
              {points.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                    <Icon size={18} strokeWidth={1.4} />
                  </span>
                  <span className="font-display text-xl text-ivory">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
