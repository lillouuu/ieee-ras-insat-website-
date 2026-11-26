/**
 * Central, editable content for the IEEE RAS INSAT website.
 * Anything marked `toConfirm: true` must be verified by the chapter before publication.
 */
import heroVideo from "@/assets/ras/hero.mp4.asset.json";
import ieeeday from "@/assets/ras/ieeeday.webp.asset.json";
import raspberry from "@/assets/ras/raspberry-workshop.webp.asset.json";
import ss1 from "@/assets/ras/summer-school-1.webp.asset.json";
import ss2 from "@/assets/ras/summer-school-2.webp.asset.json";
import teamGroup from "@/assets/ras/team-group.webp.asset.json";
import teamBg from "@/assets/ras/team-bg.webp.asset.json";
import tb1 from "@/assets/ras/tb-1.webp.asset.json";
import tb3 from "@/assets/ras/tb-3.webp.asset.json";
import tb5 from "@/assets/ras/tb-5.webp.asset.json";
import tb8 from "@/assets/ras/tb-8.webp.asset.json";
import tb12 from "@/assets/ras/tb-12.webp.asset.json";
import a2017 from "@/assets/ras/award-2017.webp.asset.json";
import a2018 from "@/assets/ras/award-2018.webp.asset.json";
import a2019 from "@/assets/ras/award-2019.webp.asset.json";
import a2020 from "@/assets/ras/award-2020.webp.asset.json";
import rasLogoWhite from "@/assets/ras/ras-logo-white.png.asset.json";
import rasLogo from "@/assets/ras/ras-logo.png.asset.json";
import nrwLogo from "@/assets/ras/nrw-logo.png.asset.json";

export const media = {
  heroVideo: heroVideo.url,
  heroPoster: raspberry.url,
  rasLogoWhite: rasLogoWhite.url,
  rasLogo: rasLogo.url,
  nrwLogo: nrwLogo.url,
};

export type Photo = { src: string; alt: string; caption: string };

export const photos = {
  teamGroup: { src: teamGroup.url, alt: "IEEE RAS INSAT members posing together indoors", caption: "The chapter, together" },
  teamBg: { src: teamBg.url, alt: "Chapter members at a team activity", caption: "Team life" },
  ieeeday: { src: ieeeday.url, alt: "Members smiling inside an Instagram photo frame on IEEE Day", caption: "IEEE Day" },
  raspberry: { src: raspberry.url, alt: "Instructor leading a Raspberry Pi workshop in a classroom", caption: "Raspberry Pi workshop, 2019" },
  ss1: { src: ss1.url, alt: "Students working around tables during Summer School", caption: "Summer School" },
  ss2: { src: ss2.url, alt: "Members presenting a robotics stand with trophies", caption: "Summer School showcase" },
  tb1: { src: tb1.url, alt: "Members playing a blindfold game outdoors", caption: "Team building" },
  tb3: { src: tb3.url, alt: "Members gathered in a circle on the grass", caption: "Team building" },
  tb5: { src: tb5.url, alt: "Blindfolded member being guided by teammates", caption: "Trust exercise" },
  tb8: { src: tb8.url, alt: "A member crouching during an outdoor challenge", caption: "Outdoor challenge" },
  tb12: { src: tb12.url, alt: "Members lined up outdoors under trees", caption: "Team building" },
} satisfies Record<string, Photo>;

/** Figures shown on the current ras-insat.ieee.tn site. Need confirmation before final publication. */
export const stats = [
  { value: 100, prefix: "+", label: "Competitions", note: "Participations across national & international contests", toConfirm: true },
  { value: 70, prefix: "+", label: "Workshops", note: "Hands-on technical sessions", toConfirm: true },
  { value: 20, prefix: "+", label: "Awards", note: "Chapter & team recognitions", toConfirm: true },
];

export const domains = [
  { code: "01", slug: "mobile-robotics", name: "Mobile Robotics", short: "Wheels, tracks & legs", body: "Designing robots that perceive, plan and move through the real world — from line followers to competition-grade autonomous platforms.", shape: "wheels" },
  { code: "02", slug: "embedded-pcb", name: "Embedded Systems & PCB Design", short: "Firmware meets copper", body: "Microcontrollers, sensors, custom boards and the firmware that brings them to life. We route our own PCBs and debug at the signal level.", shape: "chip" },
  { code: "03", slug: "vision-edge-ai", name: "Computer Vision & Edge AI", short: "Machines that see", body: "Cameras, neural networks and on-device inference — giving robots the ability to recognise, track and decide in real time.", shape: "eye" },
  { code: "04", slug: "mechanical-mechatronics", name: "Mechanical Design & Mechatronics", short: "CAD to chassis", body: "Modelling, prototyping and fabricating the bodies of our machines, where mechanics, electronics and software meet.", shape: "gear" },
  { code: "05", slug: "autonomous-control", name: "Autonomous Systems & Control", short: "Closing the loop", body: "PID, state estimation and motion planning — the mathematics that lets a robot hold a line, balance or reach a goal on its own.", shape: "loop" },
] as const;

export type DomainShape = (typeof domains)[number]["shape"];

/** Competitions the chapter takes part in. Descriptions describe the competition itself; chapter results still to be supplied. */
export const projects = [
  { name: "NXP Cup", domain: "Autonomous Systems & Control", context: "International student competition", body: "Teams build autonomous model cars that race a track using a camera and NXP microcontrollers — vision, control and embedded code under race-day pressure.", resultsToConfirm: true },
  { name: "EUROBOT", domain: "Mobile Robotics", context: "International robotics competition", body: "Teams design autonomous robots that complete a new set of tasks each season, head to head against opponents on a shared table.", resultsToConfirm: true },
  { name: "Micromouse", domain: "Embedded Systems & PCB Design", context: "Maze-solving competition", body: "A tiny autonomous robot must map an unknown maze and find the fastest path to its centre — a classic test of sensing, algorithms and compact hardware.", resultsToConfirm: true },
];

/** Verified from award certificates published on the current site. */
export const milestones = [
  { year: "Founding", title: "Chapter founded at INSAT", body: "Founding date to be supplied from chapter records.", toConfirm: true },
  { year: "2017", title: "Best RAS Student Chapter Poster Award", body: "Awarded at IEEE TSYP, Sousse, December 2017.", image: a2017.url },
  { year: "2018", title: "Outstanding Student Branch Chapter Award", body: "Presented by the IEEE Tunisia Section for exemplary achievements during 2018.", image: a2018.url },
  { year: "2019", title: "Region 8 Student Branch Chapter of the Year", body: "IEEE Region 8 award, large chapter category — Valencia, October 2019.", image: a2019.url },
  { year: "2020", title: "Winner — Innovation Challenge E4H", body: "Won at ENICarthage, January 2020, with an autonomous robotics project.", image: a2020.url },
];

/** No partner list has been verified yet — add official names + logos here. */
export const partners: { name: string; logo: string }[] = [];

export const contact = {
  address: "676 INSAT Centre Urbain Nord BP, Tunis Cedex 1080",
  phone: "58 945 105",
  email: "ieee.ras.insat@gmail.com",
};

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/INSAT.RAS" },
  { label: "Instagram", href: "https://www.instagram.com/ieee_ras_insat/" },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/impact", label: "Impact" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
] as const;

/** Events archive. Dates not confirmed by chapter records are flagged. */
export type EventItem = { slug: string; name: string; kind: "Flagship" | "Workshop" | "Community" | "Competition"; date: string; toConfirm?: boolean; body: string; photos: Photo[] };
export const events: EventItem[] = [
  { slug: "nrw", name: "National Robotics Week", kind: "Flagship", date: "Edition dates to confirm", toConfirm: true, body: "Our flagship event: robotics challenges and competitions, workshops, a forum and keynotes that gather the Tunisian robotics community at INSAT.", photos: [] },
  { slug: "summer-school", name: "Summer School", kind: "Workshop", date: "2020", toConfirm: true, body: "An intensive programme of hands-on technical training where members build, test and present projects together.", photos: [photos.ss1, photos.ss2] },
  { slug: "raspberry", name: "Raspberry Pi Workshop", kind: "Workshop", date: "2019", body: "A technical session introducing members to the Raspberry Pi, Linux and connected hardware.", photos: [photos.raspberry] },
  { slug: "ieee-day", name: "IEEE Day", kind: "Community", date: "Year to confirm", toConfirm: true, body: "Celebrating IEEE worldwide with the INSAT community — games, photos and good company.", photos: [photos.ieeeday] },
  { slug: "team-building", name: "Team Building", kind: "Community", date: "Year to confirm", toConfirm: true, body: "Outdoor challenges and trust games that turn members into teammates.", photos: [photos.tb1, photos.tb3, photos.tb5, photos.tb8, photos.tb12] },
];

export const joinFaq = [
  { q: "Who can join?", a: "IEEE RAS INSAT is a student chapter at INSAT. Students curious about robotics, automation or engineering are welcome — no prior experience needed to start learning." },
  { q: "Do I need to be an IEEE member?", a: "Chapter membership is linked to IEEE and IEEE RAS membership. Contact us for the current membership steps and fees." },
  { q: "When does recruitment open?", a: "Recruitment dates are announced each year on our channels. Send us a message and we'll let you know when the next call opens." },
  { q: "Can I join without technical skills?", a: "Yes. Besides technical teams, the chapter needs people for event organisation, communication, design and partnerships." },
];
