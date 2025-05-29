"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLSeTYSw5eJu4vZPUv7sUe_toNtRDAUHQzasDmri7tDahKQfZ2w/formResponse";
      const formDataToSend = new FormData();
      formDataToSend.append("entry.1222978686", formData.name);
      formDataToSend.append("entry.1269650341", formData.email);
      formDataToSend.append("entry.1960365084", formData.subject);
      formDataToSend.append("entry.2034277300", formData.message);

      await fetch(formUrl, {
        method: "POST",
        body: formDataToSend,
        mode: "no-cors",
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="inline-block rounded-lg bg-[#06476d]/10 px-3 py-1 text-sm text-[#06476d] mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Ready to transform your business with innovative digital
              solutions? Contact us today to discuss your project.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Our Location</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a
                      href="https://maps.google.com/?q=Krishnapur,+Kanchanpur+District,+Sudurpaschim+Province,+Nepal"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      H01 Mahendra Highway
                      <br />
                      Krishnapur, Kanchanpur District, Sudurpaschim Province,
                      Nepal
                      <br />
                      PO Box 10400
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Email Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a href="mailto:m.info.psi@gmail.com">m.info.psi@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#06476d]/10 flex items-center justify-center text-[#06476d]">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium">Call Us</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    <a href="tel:+9779862466900">+977 9862466900</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#06476d] hover:bg-[#053a5a] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>

              {submitStatus === "success" && (
                <div className="p-3 bg-green-100 text-green-800 border border-green-300 rounded-md text-sm">
                  Your message has been sent successfully!
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-3 bg-red-100 text-red-800 border border-red-300 rounded-md text-sm">
                  There was an error sending your message. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
