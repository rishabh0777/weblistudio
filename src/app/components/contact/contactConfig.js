export const WHATSAPP_NUMBER = "917897875600";

export const INSTAGRAM_URL = "https://www.instagram.com/webli_studio/";

export const GENERAL_MESSAGE =
  "Hi Webli Studio, I’d like to talk about a website for my business.";

export const hasWhatsApp = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

export function whatsappHref(message) {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";