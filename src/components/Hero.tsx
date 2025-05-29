import React, { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { GlobeDemo } from "./world";

export default function Hero() {
  const circles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => {
      const size = Math.random() * 100 ; // size between 50 and 350
      return {
        id: i,
        width: size,
        height: size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
      };
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#06476d] pt-[43px] pb-[10px] md:pt-32 md:pb-12">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/20 [mask-image:linear-gradient(0deg,white,transparent)]" />
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              top: `${circle.top}%`,
              left: `${circle.left}%`,
              opacity: circle.opacity,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between">
          <div className="mx-[24px] max-w-3xl text-left md:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Innovative Solutions for a Digital Future
            </h1>
            <p className="mt-6 text-lg text-white/80">
              PSI Technologies delivers cutting-edge digital solutions that
              transform businesses and create exceptional user experiences.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#06476d] hover:bg-white/90">
                Explore Our Work <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white bg-[#0b2e43] text-white hover:bg-white/10"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 md:top-10 right-0 translate-x-1/2 md:translate-x-1/4 z-9 w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
        <GlobeDemo />
      </div>

      {/* Feature Banner Card */}
      <div className="pb-2 md:pb-5 mx-[24px] md:mx-8 mt-12 relative z-10">
        <Card className="bg-white shadow-lg">
          <CardContent className="py-6 px-6 md:py-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* SaaS Dashboard Illustration */}
              <div className="w-full md:w-48 h-[88px] md:h-[88px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-grid-blue-500/10"></div>
                <div className="relative z-10 flex items-center space-x-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#06476d] rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-12 md:w-16 h-1.5 md:h-2 bg-blue-300 rounded"></div>
                    <div className="w-8 md:w-12 h-1.5 md:h-2 bg-blue-200 rounded"></div>
                    <div className="w-14 md:w-20 h-1.5 md:h-2 bg-blue-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-left space-y-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Join 10,000+ teams already scaling with PSI
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  From startups to enterprise, businesses trust our platform to
                  automate processes, manage data, and drive results.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="border-[#06476d] text-[#06476d] hover:bg-[#06476d] hover:text-white whitespace-nowrap"
                >
                  See Customer Stories
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
