import HeroSection from '@/components/home/HeroSection';
import DesignPhilosophy from '@/components/home/DesignPhilosophy';
import SelectedWorks from '@/components/home/SelectedWorks';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import FeaturedProjectsCarousel from '@/components/home/FeaturedProjectsCarousel';
import Testimonials from '@/components/home/Testimonials';
import FaqSection from '@/components/home/FaqSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DesignPhilosophy />
      <SelectedWorks />
      <ProcessTimeline />
      <FeaturedProjectsCarousel />
      <Testimonials />
      <FaqSection />
    </>
  );
}
