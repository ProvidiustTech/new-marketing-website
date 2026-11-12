import Banner from "@/components/Banner";
import Channels from "@/components/Channels";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Nav from "@/components/Nav";
import Partners from "@/components/Partners";
import Reviews from "@/components/Reviews";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Partners />
      <Stats />
      <HowItWorks />
      <Channels />
      <Banner />
      <Reviews />
      <Faq />
      <Footer />
    </main>
  );
}
