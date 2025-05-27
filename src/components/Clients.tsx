import Image from "next/image";

const clientImages = [
  "/Baijanath-stamp.png",
  "/aristologo.png",
  "/smartshipping.jpg"
];

export default function Clients() {
  return (
    <section id="clients" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
            Our Clients
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            We have partnered with forward-thinking companies across various industries to deliver exceptional
            results.
          </p>
        </div>

        <div className="flex gap-8 justify-center">
          {clientImages.map((src, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 transition-all hover:grayscale-0 hover:scale-110"
            >
              <Image
                src={src}
                alt={`Client ${index + 1}`}
                width={120}
                height={120}
                className="object-contain h-15 w-auto rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
