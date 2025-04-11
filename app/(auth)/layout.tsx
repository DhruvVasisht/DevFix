"use client";

import React, { useEffect, useState } from 'react';
import { Code2, Terminal } from 'lucide-react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
                  animation: `float ${Math.random() * 10 + 5}s infinite linear`
                }}
              >
                {Math.random() > 0.5 ? '{' : Math.random() > 0.5 ? '<>' : '()'}
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
                  animation: `floatSlow ${Math.random() * 15 + 10}s infinite linear`
                }}
              >
                {
                  [
                    'const app = express()',
                    'import React from "react"',
                    'function main() {',
                    'git commit -m "fix"',
                    '<div className="container">',
                    'npm install',
                    'docker build',
                    'async/await'
                  ][Math.floor(Math.random() * 8)]
                }
              </div>
            ))}
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      {/* Main content container */}
      <div className="relative w-full max-w-[510px] p-8 z-10">
        {/* Logo section with pulse animation */}
        <div className="flex items-center justify-center mb-8 space-x-3">
          <div className="relative">
            <Code2 className="w-10 h-10 text-emerald-500 animate-pulse" />
            <div className="absolute inset-0 bg-emerald-500 rounded-full filter blur-xl opacity-20 animate-ping"></div>
          </div>
          <div className="relative">
            <Terminal className="w-10 h-10 text-emerald-500 animate-pulse" />
            <div className="absolute inset-0 bg-emerald-500 rounded-full filter blur-xl opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Glass effect container with subtle animations */}
        <div className={`backdrop-blur-xl bg-white/10 rounded-xl p-6 shadow-2xl border border-white/20 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-xl"></div>
          <div className="relative z-10">
            {children}
          </div>
        </div>

        {/* Typing animation for footer text */}
        <div className="text-center mt-6 text-sm text-gray-400 overflow-hidden">
          <p className="inline-block typing-animation">
            Where developers unite to solve problems
          </p>
        </div>
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
              animation: `floatParticle ${Math.random() * 20 + 10}s infinite linear`
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
      `}</style>
    </div>
  );
};

export default AuthLayout;
