import Hero from "@/components/Hero";
import HomeSections from "@/components/HomeSections";
import { showcase, siteContent, testimonials } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero
        title="Skúste niečo nové"
        accent="nové"
        subtitle={siteContent.brand.philosophy}
        ctaLabel="Objaviť kolekciu"
        ctaHref="/kava"
      />
      <HomeSections
        heading={{ before: "Talianska ", accent: "káva", after: " a anglický čaj" }}
        cards={showcase}
        philosophy={siteContent.brand.philosophy}
        partners={siteContent.partners}
        testimonials={testimonials}
      />
    </>
  );
}
