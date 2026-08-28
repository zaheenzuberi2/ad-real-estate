export type Review = {
  name: string;
  meta: string;
  text: string;
  truncated?: boolean;
};

/**
 * Transcribed from the client's Google Business listing.
 * Replace with a live Google Places API pull before launch so the count and
 * rating can never drift out of date — and so review schema stays truthful.
 */
export const reviews: Review[] = [
  {
    name: "Verified Client",
    meta: "Google review · 5 months ago",
    text: "I had a very good experience dealing with this estate agency. The team was professional, helpful, and always quick to respond to any questions. They made the whole process smooth and stress-free, keeping me updated at every stage. I would definitely recommend their services to anyone looking to buy, sell, or rent a property.",
  },
  {
    name: "Iraj Butt",
    meta: "2 reviews · 5 months ago",
    text: "I've known the team at AD Real Estates personally, and I can honestly say they are professional, trustworthy, and genuinely dedicated to what they do. They are hardworking, honest, and always treat people with respect.",
    truncated: true,
  },
  {
    name: "Rana Nadeem",
    meta: "3 reviews · 5 months ago",
    text: "Excellent service and highly professional team. They handled everything smoothly and kept me informed throughout the process. Truly reliable and trustworthy real estate consultants in Islamabad. Highly recommended.",
  },
];
