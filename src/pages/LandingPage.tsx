import Navbar from '../components/Landing page/Navbar';
import Hero from '../components/Landing page/Hero';
import SocialProof from '../components/Landing page/SocialProof';
import HowItWorks from '../components/Landing page/HowItWorks';
import Features from '../components/Landing page/Features';
import ComparisonSection from '../components/Landing page/ComparisonSection';
import Pricing from '../components/Landing page/Pricing';
import Footer from '../components/Landing page/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <ComparisonSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
