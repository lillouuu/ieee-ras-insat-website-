/**
 * Content for the inner pages. Sources: the brief supplied by the chapter and the
 * previous RAS INSAT website (github.com/IEEE-INSAT/IEEE-INSAT-RAS-Chapter-Website).
 * `toConfirm: true` = must be verified by the chapter before publication.
 */
import chapterGroup from "@/assets/ras/chapter-group.webp.asset.json";
import neghlbouh from "@/assets/ras/neghlbouh.webp.asset.json";
import trophy from "@/assets/ras/trophy.png.asset.json";
import ieeeLogo from "@/assets/ras/ieee-logo.png.asset.json";
import rasSocietyLogo from "@/assets/ras/ras-society-logo.png.asset.json";
import tb2 from "@/assets/ras/tb-2.webp.asset.json";
import tb4 from "@/assets/ras/tb-4.webp.asset.json";
import tb6 from "@/assets/ras/tb-6.webp.asset.json";
import tb9 from "@/assets/ras/tb-9.webp.asset.json";
import tb17 from "@/assets/ras/tb-17.webp.asset.json";
import { photos, type Photo } from "./site";

export const extraMedia = { neghlbouh: neghlbouh.url, trophy: trophy.url, ieeeLogo: ieeeLogo.url, rasSocietyLogo: rasSocietyLogo.url };

export const morePhotos = {
  chapterGroup: { src: chapterGroup.url, alt: "Around forty chapter members posing with a certificate at the Orange Digital Center, INSAT", caption: "The chapter at Orange Digital Center" },
  tb2: { src: tb2.url, alt: "Members walking along a tree-lined path", caption: "Team building" },
  tb4: { src: tb4.url, alt: "Members gathered outdoors", caption: "Team building" },
  tb6: { src: tb6.url, alt: "Members during an outdoor game", caption: "Team building" },
  tb9: { src: tb9.url, alt: "Members sitting on the grass playing cards", caption: "Down time" },
  tb17: { src: tb17.url, alt: "Members at an outdoor activity", caption: "Team building" },
} satisfies Record<string, Photo>;

export const allPhotos: (Photo & { tag: "Workshops" | "Community" | "Events" })[] = [
  { ...morePhotos.chapterGroup, tag: "Community" },
  { ...photos.ss1, tag: "Workshops" },
  { ...photos.ss2, tag: "Events" },
  { ...photos.raspberry, tag: "Workshops" },
  { ...photos.ieeeday, tag: "Events" },
  { ...photos.teamGroup, tag: "Community" },
  { ...photos.tb1, tag: "Community" },
  { ...morePhotos.tb9, tag: "Community" },
  { ...photos.tb5, tag: "Community" },
  { ...morePhotos.tb2, tag: "Community" },
  { ...photos.tb3, tag: "Community" },
  { ...morePhotos.tb17, tag: "Community" },
];

/** History, starting with the founding. Ordered by date. */
export const history: { year: string; title: string; body: string; tone: "ieee" | "amber" | "crimson" | "purple" | "navy"; toConfirm?: boolean }[] = [
  { year: "2015", title: "The chapter is born", body: "IEEE RAS INSAT Student Branch Chapter is established in March 2015 at the National Institute of Applied Science and Technology, Tunis.", tone: "ieee" },
  { year: "2017", title: "First international recognition", body: "Best RAS Student Chapter Poster Award at IEEE TSYP, Sousse.", tone: "amber" },
  { year: "2018", title: "Outstanding chapter", body: "Outstanding Student Branch Chapter Award from the IEEE Tunisia Section, and Runner-Up in Region 8 Educational Activities.", tone: "crimson" },
  { year: "2019", title: "Chapter of the Year, Region 8", body: "IEEE Region 8 Student Branch Chapter of the Year, large chapter category — Valencia.", tone: "purple" },
  { year: "2020", title: "Innovation under pressure", body: "Winner of the 24h Innovation Challenge at ENICarthage. Summer School brings members together for intensive hands-on training.", tone: "amber" },
  { year: "2022", title: "Eurobot begins", body: "First participation in the EUROBOT qualifications — a yearly commitment ever since. TICAD Best Project Award.", tone: "ieee" },
  { year: "NXP", title: "Bringing the NXP Cup to Tunisia", body: "The chapter brings the NXP Cup qualification to Tunisia and organises the Tunisian qualification for two consecutive years.", tone: "navy", toConfirm: true },
  { year: "2023–24", title: "National Robotics Week grows", body: "Bronze (NRW 4.0, 2023) then Silver (NRW 5.0, 2024) Darrel Chong Student Activity Awards. 2024 Tunisia RAS SBC Award of the Year.", tone: "crimson" },
  { year: "2025", title: "Award of the Year, again", body: "2025 Tunisia RAS Student Branch Chapter Award of the Year.", tone: "purple" },
  { year: "2026", title: "Firsts & worldwide recognition", body: "Organises Tunisia's first Micromouse competition. Recognised as a Best IEEE RAS Student Chapter at ICRA 2026, Vienna.", tone: "amber", toConfirm: true },
];

export const awards: { year: string; title: string; by: string; kind: "Chapter" | "Event" | "Project"; toConfirm?: boolean }[] = [
  { year: "2026", title: "Best IEEE RAS Student Chapter recognition", by: "ICRA 2026, Vienna — official wording to confirm", kind: "Chapter", toConfirm: true },
  { year: "2025", title: "Tunisia RAS SBC Award of the Year", by: "IEEE RAS Tunisia", kind: "Chapter" },
  { year: "2024", title: "Tunisia RAS SBC Award of the Year", by: "IEEE RAS Tunisia", kind: "Chapter" },
  { year: "2024", title: "Silver Darrel Chong Award — NRW 5.0", by: "IEEE Student Activities", kind: "Event" },
  { year: "2023", title: "Bronze Darrel Chong Award — NRW 4.0", by: "IEEE Student Activities", kind: "Event" },
  { year: "2022", title: "TICAD Best Project Award", by: "TICAD", kind: "Project" },
  { year: "2020", title: "Winner — 24h Innovation Challenge", by: "ENICarthage", kind: "Project" },
  { year: "2019", title: "Student Branch Chapter of the Year", by: "IEEE Region 8", kind: "Chapter" },
  { year: "2018", title: "Outstanding Student Branch Chapter Award", by: "IEEE Tunisia Section", kind: "Chapter" },
  { year: "2018", title: "Runner-Up, Region 8 Educational Activities", by: "IEEE Region 8", kind: "Chapter" },
  { year: "2017", title: "Best RAS Student Chapter Poster Award", by: "IEEE TSYP, Sousse", kind: "Chapter" },
];

export const competitions = [
  { name: "NXP Cup", role: "Organiser — Tunisian qualification", detail: "We brought the NXP Cup qualification to Tunisia and organised the national qualification for two consecutive years.", tone: "bg-ieee text-paper", years: "Years to confirm", toConfirm: true },
  { name: "EUROBOT", role: "Competitor — every year since 2022", detail: "Our teams design autonomous robots for each season's new rules and take them to the EUROBOT qualifications.", tone: "bg-amber text-ink", years: "2022 → today" },
  { name: "Micromouse", role: "Organiser — Tunisia's first", detail: "In 2026 we organised the first Micromouse competition in Tunisia: tiny robots mapping an unknown maze and racing to its centre.", tone: "bg-crimson text-paper", years: "2026" },
];

export type Flagship = { slug: string; name: string; tagline: string; body: string; facts: string[]; tone: string; toConfirm?: boolean };
export const flagships: Flagship[] = [
  { slug: "nrw", name: "National Robotics Week", tagline: "Our flagship congress", body: "Workshops open to all levels, technical conferences with industry experts, a forum, challenges and a hackathon. Edition 3.1 ran under the theme “Robots beyond the limits”; NRW 4.0 and 5.0 earned Bronze and Silver Darrel Chong Awards.", facts: ["Workshops", "Conferences", "Forum", "Hackathon"], tone: "bg-purple text-paper" },
  { slug: "odyssey", name: "RAS Odyssey", tagline: "Initiative", body: "Description, format and edition dates to be supplied by the chapter.", facts: [], tone: "bg-navy text-paper", toConfirm: true },
  { slug: "robocraft", name: "RoboCraft", tagline: "Initiative", body: "Description, format and edition dates to be supplied by the chapter.", facts: [], tone: "bg-amber text-ink", toConfirm: true },
  { slug: "innoweek", name: "InnoWeek", tagline: "Initiative", body: "Description, format and edition dates to be supplied by the chapter.", facts: [], tone: "bg-crimson text-paper", toConfirm: true },
];

/** Board shown on the previous website (2021/2022 mandate). Archive only — not the current board. */
export const pastBoard = {
  mandate: "2021–2022",
  members: [
    { name: "Mohamed Taher Bazzazi", role: "Chairman" },
    { name: "Emna Ben Othmen", role: "Vice Chairwoman" },
    { name: "Ahmed Barnat", role: "Training Manager" },
    { name: "Donia Hamada", role: "Media Manager" },
    { name: "Rim Besbes", role: "Treasurer & Sponsoring Manager" },
    { name: "Rim Chihi", role: "General Secretary" },
    { name: "Meryem Soltani", role: "Human Resources Manager" },
  ],
};

export const structure = ["Chair", "Vice Chair", "General Secretary", "Treasurer", "Training", "Media", "Sponsoring", "Human Resources"];

export const projectsPortfolio = [
  { name: "NEGHLBOUH", kind: "IoT", body: "A smart tracking gadget — an IoT project focused on tracking solutions for everyday use cases.", image: neghlbouh.url },
  { name: "24h Innovation Challenge entry", kind: "Autonomous robotics", body: "Autonomous robotics project that won the ENICarthage Innovation Challenge in 2020." },
  { name: "TICAD Best Project", kind: "Project", body: "Project recognised with the TICAD Best Project Award in 2022. Project details to be supplied.", toConfirm: true },
  { name: "Eurobot robots", kind: "Mobile robotics", body: "A new autonomous robot every season since 2022. Robot names and results to be supplied.", toConfirm: true },
] as { name: string; kind: string; body: string; image?: string; toConfirm?: boolean }[];

export const partnershipOptions = [
  { k: "Sponsorship", d: "Support National Robotics Week and our flagship events, with visibility to hundreds of engineering students." },
  { k: "Technical collaboration", d: "Co-develop projects or prototypes with our teams on real problems from your field." },
  { k: "Workshops & talks", d: "Run a training session or keynote and meet motivated future engineers early." },
  { k: "Challenges", d: "Sponsor or design a competition challenge around your technology." },
  { k: "Equipment", d: "Provide boards, sensors, tools or components that go straight into student robots." },
  { k: "Event partnership", d: "Partner on competitions such as Micromouse, NXP Cup qualifications or Eurobot preparation." },
];
