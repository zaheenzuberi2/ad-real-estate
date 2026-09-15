export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  phoneDisplay?: string;
  phoneIntl?: string;
  email?: string;
};

export const team: TeamMember[] = [
  {
    name: "Adeel Malik",
    role: "Chief Executive Officer",
    photo: "/images/adeel-malik.jpg",
    email: "info@adgroupofcompanies.pk",
  },
  {
    name: "Maj (R) Ali Warraich",
    role: "Executive Director",
    photo: "/images/maj-ali-warraich.jpg",
    phoneDisplay: "0324-6577364",
    phoneIntl: "923246577364",
  },
  {
    name: "Sajeel Malik",
    role: "Director",
    photo: "/images/sajeel-malik.jpg",
    phoneDisplay: "0345-5664266",
    phoneIntl: "923455664266",
  },
  {
    name: "Abdullah Sarwar",
    role: "Head of Sales",
    photo: "/images/abdullah-sarwar.jpg",
    phoneDisplay: "0320-5855553",
    phoneIntl: "923205855553",
  },
  {
    name: "Shumail Malik",
    role: "Director",
    photo: "/images/shumail-malik.jpg",
    phoneDisplay: "0336-8888688",
    phoneIntl: "923368888688",
  },
];
