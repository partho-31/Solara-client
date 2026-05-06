import CategorySection from "@/components/modules/Home/CategorySection";
import Collections from "@/components/modules/Home/Collections";
import FeaturesSection from "@/components/modules/Home/FeaturesSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import NewsletterBanner from "@/components/modules/Home/NewsletterBanner";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="pt-25">
      <HeroSection />
      <Collections />
      <FeaturesSection />
      <CategorySection />
      <TestimonialsSection />
      <NewsletterBanner />
    </div>
  );
}
