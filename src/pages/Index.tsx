
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import PackageHighlights from '@/components/home/PackageHighlights';
import Trainers from '@/components/home/Trainers';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <PackageHighlights />
      <Trainers />
      <Testimonials />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
