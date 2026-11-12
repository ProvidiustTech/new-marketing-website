/**
 * Single place to change contact details for the whole site.
 *
 * To switch the number that receives form submissions, change
 * `WHATSAPP_NUMBER` below. Local Nigerian format is fine ("0913 465 7970");
 * it is converted to international format (234…) automatically.
 */
export const WHATSAPP_NUMBER = "09030987132"; // test number — swap to "0913 465 7970" when ready

export const EMAIL = "support@providiustech.com";

export const SOCIALS = {
  facebook: "https://www.facebook.com/share/1E19DrpDTg/?mibextid=wwXIfr",
  instagram:
    "https://www.instagram.com/providiustech?xtok=MWRhOXZ2bHppZWN0dQ%3D%3D&utm_source=qr",
  x: "https://x.com/providiustech?s=11",
} as const;

/** Digits only, in international form, e.g. "2349030987132". */
export function whatsappDigits(local: string = WHATSAPP_NUMBER): string {
  const digits = local.replace(/\D/g, "");
  return digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
}

/** Opens a WhatsApp chat with the business, optionally pre-filled with a message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappDigits()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
