import Link from "next/link";
import { HeroSection } from "@/components/landing/hero-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { TestimonialSection } from "@/components/landing/testimonial-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-white"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          <span className="text-xl font-bold">DevFix</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors">
            Features
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors">
            Testimonials
          </Link>
          <Link href="#aboutUs" className="text-sm font-medium hover:text-emerald-500 transition-colors">
            About Us
          </Link>
          <Link href="/sign-in" className="text-sm font-medium hover:text-emerald-500 transition-colors">
            Login
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/sign-in"
            className="hidden md:inline-flex h-9 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition items-center justify-center text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
      </main>

      <FooterSection />
    </div>
  );
}