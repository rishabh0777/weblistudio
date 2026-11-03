/* ==========================================================================
   Webli Studio — Contact configuration
   Single source of truth for the contact page and the inquiry form.

   TODO(WEBLI): No WhatsApp number exists in the codebase yet.
   Set WHATSAPP_NUMBER to the number in international format, digits only,
   no "+" or spaces (e.g. "919876543210" for +91 98765 43210).

   Until it is set:
   - the page's WhatsApp button falls back to the Instagram profile,
   - the form's final step offers "copy message" + Instagram instead of
     opening WhatsApp,
   so visitors never reach a dead link.
   ========================================================================== */

export const WHATSAPP_NUMBER = "917897875600"; // TODO(WEBLI): replace with the real number

export const INSTAGRAM_URL = "https://www.instagram.com/webli_studio/";

export const GENERAL_MESSAGE =
  "Hi Webli Studio, I’d like to talk about a website for my business.";

export const hasWhatsApp = /^\d{8,15}$/.test(WHATSAPP_NUMBER);

/** Returns a wa.me link with the message prefilled, or null if no number is set. */
export function whatsappHref(message) {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}