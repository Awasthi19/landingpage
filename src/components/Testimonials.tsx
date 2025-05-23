export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechCorp",
      quote:
        "PSI Technologies transformed our digital infrastructure with innovative solutions that exceeded our expectations. Their team's expertise and dedication made all the difference.",
    },
    {
      name: "Michael Chen",
      position: "CEO, Innovate Inc",
      quote:
        "Working with PSI Technologies was a game-changer for our business. Their artistic approach to problem-solving delivered results that truly stand out in our industry.",
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director, Global Brands",
      quote:
        "The team at PSI Technologies understood our vision perfectly and delivered a solution that not only looks stunning but performs exceptionally well. Highly recommended!",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#06476d]/5">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Clients Say</h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Hear from our satisfied clients about their experience working with PSI Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative rounded-xl bg-white p-8 shadow-sm border">
              <div className="mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="inline-block h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg italic text-gray-700 mb-6">{`"${testimonial.quote}"`}</blockquote>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#06476d]/20 flex items-center justify-center text-[#06476d] font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}