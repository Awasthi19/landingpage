import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#06476d] py-24 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/20 [mask-image:linear-gradient(0deg,white,transparent)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Innovative Solutions for a Digital Future
          </h1>
          <p className="mt-6 text-lg text-white/80">
            PSI Technologies delivers cutting-edge digital solutions that transform businesses and create
            exceptional user experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#06476d] hover:bg-white/90">
              Explore Our Work <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white bg-[#0b2e43] text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}