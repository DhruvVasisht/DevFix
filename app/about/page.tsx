import Link from "next/link"
import { ArrowLeft, Users, Target, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About DevFix</h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                DevFix was born from the frustration of scattered developer communication across multiple platforms. 
                We believe that great software is built through great collaboration, and our mission is to provide 
                developers with a unified platform where ideas flow freely, problems get solved efficiently, and 
                teams build better together.
              </p>
            </section>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-muted-foreground">
                  Building a supportive community where developers of all levels can learn, share, and grow together.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
                <p className="text-muted-foreground">
                  Structured channels and AI-powered assistance to help you find solutions faster than ever.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
                <p className="text-muted-foreground">
                  Instant communication, live code sharing, and seamless integration with your development workflow.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                DevFix started as a simple idea during a late-night coding session. Our founders were juggling between 
                Slack for team communication, Discord for casual chats, GitHub for code reviews, and Stack Overflow for 
                problem-solving. The constant context switching was killing productivity and breaking the flow state 
                that developers cherish.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We decided to build something different - a platform designed specifically for developers, by developers. 
                A place where the tools you need are integrated, the community is supportive, and the focus is always 
                on creating great software together.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/20 p-6 rounded-lg">
                  <div className="h-16 w-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    DV
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Dhruv Vasisht</h3>
                  <p className="text-emerald-500 mb-2">Co-Founder & CEO</p>
                  <p className="text-muted-foreground">
                    Full-stack developer passionate about building tools that empower other developers. 
                    Previously worked at tech startups focusing on developer productivity.
                  </p>
                </div>

                <div className="bg-muted/20 p-6 rounded-lg">
                  <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    TD
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tanay Das</h3>
                  <p className="text-emerald-500 mb-2">Co-Founder & CTO</p>
                  <p className="text-muted-foreground">
                    Systems architect with expertise in real-time communication and scalable infrastructure. 
                    Loves solving complex technical challenges and building robust platforms.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why DevFix?</h2>
              <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-6 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  We're not just another chat app. DevFix is designed specifically for the developer workflow, 
                  with features like structured problem-solving channels, AI-powered code assistance, integrated 
                  screen sharing, and tools that understand how developers think and work. Join us in building 
                  the future of developer collaboration.
                </p>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Join Us?</h2>
              <p className="text-muted-foreground mb-6">
                Be part of a community that's shaping the future of developer collaboration.
              </p>
              <Link 
                href="/sign-in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
              >
                Get Started Today
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 