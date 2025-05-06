"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Code2, Terminal, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1114] via-[#1a1b1e] to-[#141518] flex items-center justify-center relative overflow-hidden">
      {/* Animated code elements background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {mounted &&
            Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-emerald-500/20 transform rotate-3"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 1 + 0.5}rem`,
                  animation: `float ${Math.random() * 10 + 5}s infinite linear`,
                }}
              >
                {Math.random() > 0.5 ? "{" : Math.random() > 0.5 ? "<>" : "()"}
              </div>
            ))}

          {/* Code snippets */}
          {mounted &&
            Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`code-${i}`}
                className="absolute text-emerald-500/10 font-mono text-xs whitespace-nowrap"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  animation: `floatSlow ${Math.random() * 15 + 10}s infinite linear`,
                }}
              >
                {
                  [
                    "const app = express()",
                    'import React from "react"',
                    "function main() {",
                    'git commit -m "fix"',
                    '<div className="container">',
                    "npm install",
                    "docker build",
                    "async/await",
                  ][Math.floor(Math.random() * 8)]
                }
              </div>
            ))}
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      {/* Main content container - now split into two halves */}
      <div className="relative w-full max-w-6xl p-4 md:p-6 lg:p-8 z-10 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 items-center">
        {/* Left half - Welcome content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left px-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Logo section with pulse animation */}
          <div className="flex items-center justify-center lg:justify-start mb-6 md:mb-8 space-x-2 md:space-x-3">
            <div className="relative">
              <Code2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 animate-pulse" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full filter blur-xl opacity-20 animate-ping"></div>
            </div>
            <div className="relative">
              <Terminal className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 animate-pulse" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full filter blur-xl opacity-20 animate-ping"></div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white ml-2">DevFix</h1>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Welcome to <span className="text-emerald-500">DevFix</span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
            Join our community of developers collaborating to solve problems, share knowledge, and build amazing
            projects together.
          </p>

          <div className="relative mb-6 md:mb-8 p-3 md:p-4 border border-emerald-500/30 rounded-lg bg-emerald-500/5 max-w-md mx-auto lg:mx-0">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium">Structured Communication</h3>
                <p className="text-gray-400 text-sm">Organize discussions by topics for clarity and easy access</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-all duration-300 flex items-center justify-center gap-2 mx-auto lg:mx-0"
          >
            Learn More About Us
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Right half - Auth form */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center items-center "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 50 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Glass effect container with subtle animations */}

          <div className="mx-4 sm:mx-8 lg:mx-12 relative z-10 w-full flex  justify-center items-center">{children}</div>

          {/* Typing animation for footer text */}
          <div className="text-center mt-6 text-sm text-gray-400 overflow-hidden">
            <p className="inline-block typing-animation">Where developers unite to solve problems</p>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {mounted &&
        Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-emerald-500"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `floatParticle ${Math.random() * 20 + 10}s infinite linear`,
            }}
          />
        ))}

      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, 10px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes floatSlow {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -10px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes floatParticle {
          0% { transform: translate(0, 0); opacity: 0; }
          25% { opacity: 0.5; }
          50% { transform: translate(100px, -100px); opacity: 0.2; }
          75% { opacity: 0.5; }
          100% { transform: translate(0, 0); opacity: 0; }
        }

        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .typing-animation {
          border-right: 2px solid rgba(255, 255, 255, 0.5);
          white-space: nowrap;
          overflow: hidden;
          animation: typing 4s steps(40) 1s 1 normal both, blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: rgba(255, 255, 255, 0.5) }
        }

        @media (max-width: 640px) {
          h2 {
            font-size: 1.75rem;
          }
          p {
            font-size: 0.95rem;
          }
          .typing-animation {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout
