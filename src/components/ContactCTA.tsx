import { MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppLink, buildMailtoLink } from "@/data/site";

export default function ContactCTA() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="label-mono mb-3 text-xs uppercase tracking-wider text-blue-bright">
          Contacto
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white-blue sm:text-4xl">
          ¿Tu negocio necesita una página que se sienta propia?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Cuéntame qué haces, qué deseas mostrar y cómo quieres que tus clientes te contacten.
          Podemos convertirlo en una experiencia web clara y profesional.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Hablar por WhatsApp
          </a>
          <a
            href={buildMailtoLink()}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-white-blue transition-colors hover:border-blue-bright hover:text-blue-bright"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Enviar correo
          </a>
        </div>
      </div>
    </section>
  );
}
