import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Community, JoinCta, Numbers, Partners, Projects, RoboticsWeek, TechUniverse, Timeline, WhoWeAre } from "@/components/home/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IEEE RAS INSAT — Engineering Intelligence, Building What's Next" },
      { name: "description", content: "IEEE Robotics and Automation Society INSAT Student Branch Chapter: robotics projects, competitions, workshops and a community of builders in Tunis." },
      { property: "og:title", content: "IEEE RAS INSAT — Engineering Intelligence" },
      { property: "og:description", content: "Robotics projects, competitions, workshops and a community of builders at INSAT, Tunis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Numbers />
      <TechUniverse />
      <Projects />
      <Timeline />
      <RoboticsWeek />
      <Community />
      <Partners />
      <JoinCta />
    </>
  );
}
