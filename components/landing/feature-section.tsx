"use client"

import { Code, FileCode, MessageSquare, Shield, Users, Video } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureSection() {
  const features = [
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Codespace Creation",
      description: "Create dedicated spaces for discussions, teamwork, and project coordination.",
      color: "from-emerald-500/20 to-blue-500/20",
      delay: 0.1,
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      title: "Structured Channels",
      description: "Organize conversations by topics for clarity and easy access to information.",
      color: "from-blue-500/20 to-purple-500/20",
      delay: 0.2,
    },
    {
      icon: <Video className="h-6 w-6 text-purple-500" />,
      title: "Real-time Communication",
      description: "Seamless audio and video chat for instant problem-solving and collaboration.",
      color: "from-purple-500/20 to-pink-500/20",
      delay: 0.3,
    },
    {
      icon: <FileCode className="h-6 w-6 text-pink-500" />,
      title: "File Sharing",
      description: "Exchange code snippets, documents, and resources efficiently.",
      color: "from-pink-500/20 to-orange-500/20",
      delay: 0.4,
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      title: "Moderation Tools",
      description: "Maintain a respectful environment with robust moderation features.",
      color: "from-orange-500/20 to-yellow-500/20",
      delay: 0.5,
    },
    {
      icon: <Code className="h-6 w-6 text-yellow-500" />,
      title: "Developer-Focused",
      description: "Built specifically for the unique needs of the developer community.",
      color: "from-yellow-500/20 to-emerald-500/20",
      delay: 0.6,
    },
  ]

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
            Powerful Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4"
          >
            Designed for <span className="text-emerald-500">Developers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            DevFix combines powerful features to streamline communication, enhance collaboration, and accelerate issue
            resolution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-emerald-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 ${feature.color}" />
              <div className="absolute -z-10 -inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity rounded-xl" />

              <div className="h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>

              <div className="mt-6 flex items-center text-sm font-medium text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
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
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 bg-muted/30 border border-border rounded-xl p-8 relative overflow-hidden"
        >
          <div className="absolute -z-10 -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium max-w-fit mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Code Assistance</h3>
              <p className="text-muted-foreground mb-6">
                Get intelligent code suggestions, automated bug detection, and personalized learning resources to level
                up your development skills.
              </p>
              <button className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-md hover:bg-blue-500/20 transition flex items-center justify-center gap-2 font-medium max-w-fit">
                Join Waitlist
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
            </div>
            <div className="relative">
              <div className="bg-background border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-xs space-y-2 bg-muted/50 p-3 rounded-md">
                  <div className="flex">
                    <span className="text-emerald-500 mr-2">AI:</span>
                    <span>I noticed a potential memory leak in your code.</span>
                  </div>
                  <div className="flex">
                    <span className="text-emerald-500 mr-2">AI:</span>
                    <span>Try using useCallback to memoize this function:</span>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded border border-emerald-500/20 mt-2">
                    <pre className="text-xs">
                    
                    </pre>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -inset-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-lg rounded-xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
