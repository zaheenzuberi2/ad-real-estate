/**
 * Single source of truth for business identity.
 * Name/Address/Phone must stay byte-identical here, in the JSON-LD schema, and
 * on the Google Business Profile — mismatched NAP data is the most common cause
 * of weak local-search ranking.
 */

export const site = {
  name: "AD Real Estate",
  legalName: "AD Real Estate & Builders (Pvt) Ltd",
  tagline: "DHA · Bahria Town · Islamabad",
  description:
    "Property advisory for DHA and Bahria Town, Islamabad. Verified plots, villas and commercial units, with title checks, guided site visits and full transfer support for local and overseas buyers.",
  // Set to the live domain before launch; also update NEXT_PUBLIC_SITE_URL on Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adrealestate.pk",
  locale: "en_PK",

  phone: {
    display: "+92 304 1112523",
    href: "tel:+923041112523",
    intl: "+923041112523",
  },
  whatsapp: {
    number: "923041112523",
    href: "https://wa.me/923041112523",
  },
  email: "info@adgroupofcompanies.pk",

  social: {
    facebook: "https://www.facebook.com/share/19QyTndqDw/",
    instagram: "https://www.instagram.com/adrealestate__",
  },

  address: {
    street: "Plaza 09, Service Road, 01-A Main Expressway, Sector D, DHA Phase 5",
    city: "Islamabad",
    region: "Islamabad Capital Territory",
    country: "PK",
    postalCode: "44000",
  },
  geo: {
    lat: 33.5340,
    lng: 73.0951,
  },
  hours: "Mon – Sat · 10:00 AM – 8:00 PM",
  openingHoursSpec: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "10:00",
    closes: "20:00",
  },

  rating: {
    value: 5.0,
    count: 24,
  },
} as const;

/**
 * The site's builder, credited in the footer. Not the client's own
 * information, so kept separate from `site` above.
 */
export const developer = {
  name: "Zaheen Zuberi",
  url: "https://zaheenzuberi.com",
  whatsapp: "https://wa.me/923461223692",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.city}`;
