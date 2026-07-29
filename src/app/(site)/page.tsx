import { BookCall } from "@/components/site/BookCall";
import { Faq } from "@/components/site/Faq";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { Hero } from "@/components/site/Hero";
import { Problems } from "@/components/site/Problems";
import { ProcessSection } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TeamSection } from "@/components/site/Team";
import { TechStack } from "@/components/site/TechStack";
import { TrustedBy } from "@/components/site/TrustedBy";
import { WhyUs } from "@/components/site/WhyUs";
import { getContent } from "@/lib/content/repository";
import { themeStyle } from "@/lib/theme";

export default async function HomePage() {
  const content = await getContent();
  const { settings } = content;

  return (
    <div
      className="w-full overflow-x-hidden"
      style={themeStyle(settings)}
      data-palette={settings.palette}
    >
      <SiteHeader site={content.site} />

      <main>
        <Hero hero={content.hero} layout={settings.heroLayout} />
        <TrustedBy trustedBy={content.trustedBy} />
        <Problems problems={content.problems} />
        <Services services={content.services} />
        <TechStack
          stack={content.stack}
          display={settings.stackDisplay}
          speed={settings.marqueeSpeed}
        />
        <ProcessSection process={content.process} />
        <FeaturedWork work={content.work} />
        <WhyUs why={content.why} />
        <TeamSection team={content.team} />
        <Faq faq={content.faq} />
        <BookCall booking={content.booking} />
      </main>

      <SiteFooter site={content.site} />
    </div>
  );
}
