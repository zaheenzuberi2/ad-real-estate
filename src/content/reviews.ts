export type Review = {
  name: string;
  meta: string;
  text: string;
  truncated?: boolean;
};

/**
 * Transcribed verbatim from AD Real Estate's Google Business listing
 * ("AD REAL ESTATE Registered company in DHA ISLAMABAD", 5.0 · 25 reviews).
 * Wrapping quote marks, emoji and markdown from the originals are stripped;
 * the wording is otherwise unchanged. The long ones are cut with `truncated`.
 */
export const reviews: Review[] = [
  {
    name: "Verified Client",
    meta: "Google review · 6 months ago",
    text: "I had a very good experience dealing with this estate agency. The team was professional, helpful, and always quick to respond to any questions. They made the whole process smooth and stress-free, keeping me updated at every stage. I would definitely recommend their services to anyone looking to buy, sell, or rent a property.",
  },
  {
    name: "Iraj Butt",
    meta: "2 reviews · 6 months ago",
    text: "I've known the team at AD Real Estate personally, and I can honestly say they are professional, trustworthy, and genuinely dedicated to what they do. They are hardworking, honest, and always treat people with respect. It's great to see a real estate business that values integrity and professionalism so highly.",
    truncated: true,
  },
  {
    name: "Rana Nadeem",
    meta: "3 reviews · 6 months ago",
    text: "Excellent service and highly professional team. They handled everything smoothly and kept me informed throughout the process. Truly reliable and trustworthy real estate consultants in Islamabad. Highly recommended.",
  },
  {
    name: "Riaz Rathore",
    meta: "Google review · 6 months ago",
    text: "AD Real Estate delivers the best customer service in town by far. Their team is professional, helpful, and brings invaluable experience to the table. I highly recommend them.",
  },
  {
    name: "Sobia Manzoor",
    meta: "Google review · 6 months ago",
    text: "We recently purchased our first property through this company and couldn't be happier with the experience. The service was exceptional, and the team were incredibly friendly, honest, and professional. They made what could have been a stressful process feel smooth and straightforward. We would highly recommend them to anyone looking to buy a home.",
  },
  {
    name: "Awais Ahmed",
    meta: "Google review · 5 months ago",
    text: "I live in London and purchased a commercial plot through AD Real Estate. The staff is professional, friendly, and always ready to help. Overall, a reliable partner for real estate.",
  },
  {
    name: "Mohammad Jawad",
    meta: "Google review · 6 months ago",
    text: "Working with AD Real Estate was a game-changer. Their market knowledge and dedication are unmatched. They truly listen to what you need and deliver results beyond expectations. Highly recommended.",
  },
  {
    name: "Talat Abbas",
    meta: "Google review · 6 months ago",
    text: "Excellent experience. Professional, knowledgeable, and responsive team in Islamabad. They made buying a property smooth and stress free. Highly recommended.",
  },
  {
    name: "Ziram Fatima",
    meta: "Google review · 1 week ago",
    text: "I am very satisfied with the services provided by AD Real Estate. The team was professional, helpful, and guided me throughout the entire process. They helped me find a property that matched my needs and budget. I highly recommend them to anyone looking for a reliable and trustworthy real estate service.",
  },
  {
    name: "Adeel Adnan Butt",
    meta: "Google review · 6 months ago",
    text: "As an overseas investor, finding a trustworthy real estate company is never easy, but AD Real Estate truly exceeded my expectations. From the very beginning, their transparency, honesty, and highly professional approach gave me complete confidence in my decision. They guided me through every step, answered all my questions patiently, and ensured the entire process was smooth and stress-free.",
    truncated: true,
  },
  {
    name: "Mohsin Khalil",
    meta: "Google review · 6 months ago",
    text: "Authentic and experienced organisation. The whole team at AD Real Estate is experienced and fully in command of the real estate business. Recommended.",
  },
  {
    name: "Nadeem Mughal",
    meta: "Google review · 6 months ago",
    text: "Had a very pleasant experience dealing with AD Real Estate. Very professional people.",
  },
  {
    name: "Jameel Raza",
    meta: "Google review · 2 years ago",
    text: "Highly professional and trustworthy name in the real estate business.",
  },
];
