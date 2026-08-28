export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  phoneDisplay?: string;
  phoneIntl?: string;
  email?: string;
};

/**
 * TODO before launch: only Adeel Malik's title was confirmed from client
 * material. Confirm the other four designations with the client — publishing
 * invented job titles undermines the trust the page is built on.
 */
export const team: TeamMember[] = [
  {
    name: "Adeel Malik",
    role: "Chief Executive Officer",
    photo: "/images/adeel-malik.jpg",
    email: "info@adgroupofcompanies.pk",
  },
  {
    name: "Sajeel Malik",
    role: "Director, Sales & Operations",
    photo: "/images/sajeel-malik.jpg",
    phoneDisplay: "0345-5664266",
    phoneIntl: "923455664266",
  },
  {
    name: "Maj Ali Warraich",
    role: "Director, Client Relations",
    photo: "/images/maj-ali-warraich.jpg",
    phoneDisplay: "0324-6577364",
    phoneIntl: "923246577364",
  },
  {
    name: "Abdullah Sarwar",
    role: "Senior Sales Consultant",
    photo: "/images/abdullah-sarwar.jpg",
    phoneDisplay: "0320-5855553",
    phoneIntl: "923205855553",
  },
  {
    name: "Shumail Malik",
    role: "Senior Sales Consultant",
    photo: "/images/shumail-malik.jpg",
    phoneDisplay: "0336-8888688",
    phoneIntl: "923368888688",
  },
];
