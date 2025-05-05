"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function FooterSection() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Roadmap", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Partners", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Community", href: "#" },
        { name: "Help Center", href: "#" },
        { name: "Support", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Events", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Licenses", href: "#" },
        { name: "Settings", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", name: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", name: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", name: "Instagram" },
  ]

  return (
    <footer className="bg-background relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
              <span className="text-2xl font-bold">DevFix</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your developer collaboration hub for seamless communication and problem-solving. Build better software,
              together.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="h-10 w-10 rounded-full bg-muted/50 hover:bg-emerald-500/10 hover:text-emerald-500 flex items-center justify-center transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <p className="text-sm text-muted-foreground mb-3">Get the latest updates and news right to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
                />
                <button className="h-10 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex} className="md:col-span-1">
              <h3 className="font-semibold mb-4 text-lg">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href={link.href} className="text-muted-foreground hover:text-emerald-500 transition-colors">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} DevFix. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Cookies
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
