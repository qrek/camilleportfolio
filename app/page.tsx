import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Loader } from "@/components/ui/Loader";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Loader />
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Reveal>
          <About />
        </Reveal>
      </main>
      <Reveal>
        <SiteFooter />
      </Reveal>
    </>
  );
}
