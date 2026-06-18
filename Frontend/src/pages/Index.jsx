import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
const Index = () => {
    return (<div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <Testimonials />
      <Footer />
    </div>);
};
export default Index;
