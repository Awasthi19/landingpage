import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Works />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}