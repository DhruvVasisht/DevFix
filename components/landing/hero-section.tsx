"use client"

// import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';
import { ArrowRight, Code, MessageSquare, Video } from "lucide-react"

export function HeroSection() {
  const router = useRouter();
  // const router = useRouter()

  // const handleLoginRedirect = () => {
  //   router.push("/login")
  // }


  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium max-w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now in public beta
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Where Developers <br />
              <span className="text-emerald-500">Collaborate</span> and <span className="text-emerald-500">Solve</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              DevFix is your all-in-one platform for structured communication, real-time collaboration, and efficient
              problem-solving in the developer community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button onClick={() => router.push('/sign-in')}
                className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition flex items-center justify-center gap-2 font-medium"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-6 py-3 bg-background border border-input rounded-md hover:bg-accent transition flex items-center justify-center gap-2 font-medium">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium">{i}</span>
                  </div>
                ))}
              </div>
              <span>Join 10,000+ developers</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-background border rounded-xl shadow-2xl overflow-hidden">
              <div className="h-10 bg-muted border-b flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-medium ml-2">DevFix - Project Collaboration</div>
              </div>
              <div className="grid grid-cols-12 h-[400px]">
                <div className="col-span-3 border-r p-3 space-y-3">
                  <div className="h-8 bg-muted rounded-md w-full" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-6 bg-muted/60 rounded-md w-full" />
                    ))}
                  </div>
                </div>
                <div className="col-span-9 p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-emerald-500/20 flex items-center justify-center">
                      <Code className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-blue-500/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="h-10 w-10 rounded-md bg-purple-500/20 flex items-center justify-center">
                      <Video className="h-5 w-5 text-purple-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-20 bg-muted/60 rounded-md w-full" />
                    <div className="h-20 bg-muted/60 rounded-md w-full" />
                    <div className="h-20 bg-muted/60 rounded-md w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 h-64 w-64 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-6 -left-6 h-64 w-64 bg-blue-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
