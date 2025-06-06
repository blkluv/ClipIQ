import Navbar from '../components/landingpage/Navbar';
import HeroSection from '../components/landingpage/HeroSection';
import PartnersBar from '../components/landingpage/PartnersBar';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import DynamicResourceManagement from '../components/landingpage/DynamicResourceManagement';
import DemoBanner from '../components/landingpage/DemoBanner';
import FAQSection from '../components/landingpage/FAQSection';
import Footer from '../components/landingpage/Footer';

const page =()=> {
  return (
    <div className="bg-[#18181b] text-white min-h-screen w-full font-sans scroll-smooth">
      <Navbar />
      <HeroSection />
      <PartnersBar />
      <FeaturesSection />
      <DynamicResourceManagement />
      <DemoBanner />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default page;
