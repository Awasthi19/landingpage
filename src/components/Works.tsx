import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Works() {
  const projects = [
    { title: "Digital Transformation", category: "Enterprise Solution", src: "/cloudcomputingteam.jpg" },
    { title: "E-Commerce Platform", category: "Web Development", src: "/ecommerce.jpg" },
    { title: "Mobile Banking App", category: "App Development", src: "/fintechapp.png" },
    { title: "AI-Powered Analytics", category: "Data Science", src: "/download.png" },
    { title: "IoT Smart Home", category: "Connected Devices", src: "/iot.jpg" },
    { title: "Immersive VR Experience", category: "Virtual Reality", src: "/vr.jpg" },
  ];

  return (
    <section id="works" className="py-20 bg-slate-50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Artistic Digital Creations</h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Explore our diverse portfolio of innovative projects that showcase our expertise and creative approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#06476d] to-[#0a7bb8] overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-70"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                <div className="text-xs font-medium text-white/80 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <div className="mt-4 transform translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                    View Project
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-[#06476d] text-[#06476d] hover:bg-[#06476d] hover:text-white">
            View All Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}