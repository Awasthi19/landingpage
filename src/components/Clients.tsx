import Image from "next/image";

export default function Clients() {
  return (
    <section id="clients" className="py-20">
      <div className="container">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 grayscale transition-all hover:grayscale-0 hover:scale-110"
            >
              <Image
                src={`/placeholder.svg?height=80&width=160&text=Client+${index + 1}`}
                alt={`Client ${index + 1}`}
                width={160}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}