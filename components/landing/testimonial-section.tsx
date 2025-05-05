"use client"

import { motion } from "framer-motion"

export function TestimonialSection() {
  const testimonials = [
    {
      quote: "DevFix has completely transformed how our remote team collaborates on complex coding problems.",
      author: "Sarah Chen",
      role: "Senior Developer at TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      delay: 0.1,
      gradient: "from-emerald-500/20 to-blue-500/20",
    },
    {
      quote:
        "The structured channels and real-time communication features have made our development process twice as efficient.",
      author: "Michael Rodriguez",
      role: "CTO at StartupX",
      avatar: "/placeholder.svg?height=80&width=80",
      delay: 0.2,
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      quote: "As a team lead, the moderation tools help me maintain a productive environment for all developers.",
      author: "Jamal Washington",
      role: "Engineering Manager at DevSolutions",
      avatar: "/placeholder.svg?height=80&width=80",
      delay: 0.3,
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ]

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent z-10" />

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium max-w-fit mx-auto mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Loved by <span className="text-emerald-500">Developers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            See what developers are saying about their experience with DevFix.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
              viewport={{ once: true }}
              className="bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-border relative group hover:border-emerald-500/50 transition-colors"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl blur-sm -z-10" />

              <div className="absolute -top-5 left-5 h-10 w-10 bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              <div className="mb-8 mt-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-500"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground mb-8 italic">"{testimonial.quote}"</p>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br ${testimonial.gradient} p-0.5">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <span className="text-sm font-medium">{testimonial.author.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col md:flex-row items-center justify-between bg-muted/30 border border-border rounded-xl p-8 relative overflow-hidden"
        >
          <div className="absolute -z-10 -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Ready to join our community?</h3>
            <p className="text-muted-foreground">Join thousands of developers already using DevFix.</p>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition flex items-center justify-center gap-2 font-medium">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            <button className="px-6 py-3 bg-background border border-input rounded-md hover:bg-accent transition flex items-center justify-center gap-2 font-medium">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
