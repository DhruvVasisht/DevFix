"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

export function FooterSection() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Documentation", href: "/docs" },
      ],
    },
          {
        title: "Company",
        links: [
          { name: "About", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Contact", href: "/contact" },
        ],
      },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: "https://github.com", name: "GitHub" },
    { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com", name: "Twitter" },
    { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com", name: "LinkedIn" },
  ]

  return (
    <section id="aboutUs">
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
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
            <p className="text-muted-foreground text-sm mb-4">
              Your developer collaboration hub for seamless communication and problem-solving.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full bg-muted/50 hover:bg-emerald-500/10 hover:text-emerald-500 flex items-center justify-center transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 md:w-2/3">
            {footerLinks.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="font-medium mb-3 text-sm">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground text-sm hover:text-emerald-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} DevFix. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-emerald-500 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-emerald-500 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
   
   </footer>
   </section>
  )
}
