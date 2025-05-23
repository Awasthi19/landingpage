import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Let&apos;s Start a Conversation</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Ready to transform your business with innovative digital solutions? Contact us today to discuss your
              project.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Our Location</h3>
                  <p className="text-sm text-muted-foreground mt-1">123 Innovation Drive, Tech City, TC 10101</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">info@psitechnologies.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
              </div>
              <Button className="w-full bg-[#06476d] hover:bg-[#053a5a] text-white">Send Message</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}