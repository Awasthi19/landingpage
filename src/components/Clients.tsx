import Image from "next/image";

const clientImages = [
  "/aristologo.png",
  "/Baijanath-stamp.png",
  "/smartshipping.jpg",
];

export default function Clients() {
  return (
    <section id="clients" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
            Our Clients
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            We have partnered with forward-thinking companies across various
            industries to deliver exceptional results.
          </p>
        </div>

        {/* Scrolling container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-12 w-max">
            {[...clientImages, ...clientImages].map((src, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <div style={{ width: 120, height: 120, position: "relative" }}>
                  <Image
                    src={src}
                    alt={`Client ${index + 1}`}
                    fill
                    style={{ objectFit: "contain", borderRadius: "50%" }}
                    sizes="120px"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
