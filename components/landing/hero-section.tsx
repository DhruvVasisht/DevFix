"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Hash, Plus, Search, Bell, Pin, MessageSquare } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroSection() {
  const router = useRouter()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // This ensures we only render theme-dependent UI after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLoginRedirect = () => {
    router.push("/login")
  }

  // Use resolvedTheme which gives the actual theme (not "system")
  // Only check theme after component has mounted to avoid hydration mismatch
  const isDarkTheme = mounted && (resolvedTheme === "dark" || theme === "dark")

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium max-w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now in public beta
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="block"
              >
                Where Developers <br />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="block"
              >
                <span className="text-emerald-500">Collaborate</span> and{" "}
                <span className="text-emerald-500">Solve</span>
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              DevFix is your all-in-one platform for structured communication, real-time collaboration, and efficient
              problem-solving in the developer community.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                onClick={handleLoginRedirect}
                className="px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition flex items-center justify-center gap-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-background border border-input rounded-md hover:bg-accent transition flex items-center justify-center gap-2 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
              <span>Where ideas come to life</span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Discord-like Chat Interface */}
            <motion.div
              className="relative bg-background border rounded-xl shadow-2xl overflow-hidden"
              whileHover={{
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Mac-style window header */}
              <div className="h-10 bg-muted border-b flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs font-medium ml-2">DevFix - Developer Collaboration</div>
              </div>

              <div className="flex h-[450px]">
                {/* Left Sidebar */}
                <div
                  className={`w-60 ${isDarkTheme ? "bg-[#2b2d31] border-[#1e1f22]" : "bg-[#f2f3f5] border-[#e3e5e8]"} border-r flex flex-col`}
                >
                  {/* Server Name */}
                  <div
                    className={`h-12 px-4 flex items-center justify-between border-b ${isDarkTheme ? "border-[#1e1f22]" : "border-[#e3e5e8]"} shadow-sm`}
                  >
                    <h3 className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-800"} truncate`}>
                      Coding Shuttle
                    </h3>
                    <button
                      className={`${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="px-2 pt-3">
                    <div
                      className={`${isDarkTheme ? "bg-[#1e1f22] text-gray-400" : "bg-[#e3e5e8] text-gray-500"} rounded-md px-2 py-1 flex items-center text-sm`}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      <span>Search</span>
                      <span className="ml-auto text-xs opacity-50">CTRL K</span>
                    </div>
                  </div>

                  {/* Channels */}
                  <div className="mt-4 px-2 flex-1 overflow-y-auto">
                    <div className="mb-4">
                      <div className="flex items-center justify-between px-1 mb-1">
                        <h4 className="text-xs font-semibold text-gray-400 tracking-wider">THREADS</h4>
                        <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>

                      <div className="space-y-0.5">
                        <div
                          className={`flex items-center px-2 py-1 rounded ${isDarkTheme ? "bg-[#35373c]" : "bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <Hash className={`h-4 w-4 mr-1.5 ${isDarkTheme ? "text-white" : "text-gray-800"}`} />
                          <span className={`${isDarkTheme ? "text-white" : "text-gray-800"} text-sm`}>general</span>
                          <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                            <Bell
                              className={`h-4 w-4 ${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}
                            />
                            <Pin
                              className={`h-4 w-4 ${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}
                            />
                          </div>
                        </div>

                        <div
                          className={`flex items-center px-2 py-1 rounded ${isDarkTheme ? "hover:bg-[#35373c]" : "hover:bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <Hash
                            className={`h-4 w-4 mr-1.5 ${isDarkTheme ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-800"}`}
                          />
                          <span
                            className={`${isDarkTheme ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} text-sm`}
                          >
                            code-with-me
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between px-1 mb-1">
                        <h4 className="text-xs font-semibold text-gray-400 tracking-wider">PING PODS</h4>
                        <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>

                      <div className="space-y-0.5">
                        <div
                          className={`flex items-center px-2 py-1 rounded ${isDarkTheme ? "hover:bg-[#35373c]" : "hover:bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <MessageSquare
                            className={`h-4 w-4 mr-1.5 ${isDarkTheme ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-800"}`}
                          />
                          <span
                            className={`${isDarkTheme ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} text-sm`}
                          >
                            talk-with-me
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between px-1 mb-1">
                        <h4 className="text-xs font-semibold text-gray-400 tracking-wider">PIXEL PODS</h4>
                        <Plus className="h-4 w-4 text-gray-400 hover:text-white cursor-pointer" />
                      </div>

                      <div className="space-y-0.5">
                        <div
                          className={`flex items-center px-2 py-1 rounded ${isDarkTheme ? "hover:bg-[#35373c]" : "hover:bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <MessageSquare
                            className={`h-4 w-4 mr-1.5 ${isDarkTheme ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-gray-800"}`}
                          />
                          <span
                            className={`${isDarkTheme ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} text-sm`}
                          >
                            dungeon
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between px-1 mb-1">
                        <h4 className="text-xs font-semibold text-gray-400 tracking-wider">DEVELOPERS</h4>
                      </div>

                      <div className="space-y-1">
                        <div
                          className={`flex items-center px-1 py-1 rounded ${isDarkTheme ? "hover:bg-[#35373c]" : "hover:bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <div className="h-8 w-8 rounded-full bg-orange-500 mr-2 flex items-center justify-center text-white text-xs font-bold">
                            DV
                          </div>
                          <span
                            className={`${isDarkTheme ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} text-sm`}
                          >
                            Dhruv Vasisht
                          </span>
                        </div>

                        <div
                          className={`flex items-center px-1 py-1 rounded ${isDarkTheme ? "hover:bg-[#35373c]" : "hover:bg-[#d4d6d9]"} group cursor-pointer`}
                        >
                          <div className="h-8 w-8 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-white text-xs font-bold">
                            TD
                          </div>
                          <span
                            className={`${isDarkTheme ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} text-sm`}
                          >
                            Tanay Das
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Bar */}
                  <div className={`h-14 ${isDarkTheme ? "bg-[#232428]" : "bg-[#ebedef]"} px-2 flex items-center`}>
                    <div className="flex items-center flex-1">
                      <div className="h-8 w-8 rounded-full bg-orange-500 mr-2 flex items-center justify-center text-white text-xs font-bold">
                        D
                      </div>
                      <div className="flex flex-col">
                        <span className={`${isDarkTheme ? "text-white" : "text-gray-800"} text-sm font-medium`}>
                          Dhruv
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Chat Area */}
                <div className={`flex-1 flex flex-col ${isDarkTheme ? "bg-[#313338]" : "bg-white"}`}>
                  {/* Channel Header */}
                  <div
                    className={`h-12 border-b ${isDarkTheme ? "border-[#1e1f22]" : "border-[#e3e5e8]"} px-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                      <Hash className={`h-5 w-5 mr-2 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`} />
                      <span className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}>general</span>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`${isDarkTheme ? "bg-[#383a40]" : "bg-[#f2f3f5]"} rounded-md px-2 py-1 flex items-center`}
                      >
                        <span className="hidden md:inline text-emerald-400 text-xs font-medium">
                          Live: Real-time updates
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {[
                      {
                        name: "Dhruv Vasisht",
                        avatar: "DV",
                        color: "bg-orange-500",
                        time: "10:30 PM",
                        message: "Welcome to DevFix! This is where developers collaborate.",
                      },
                      {
                        name: "Tanay Das",
                        avatar: "TD",
                        color: "bg-blue-500",
                        time: "10:32 PM",
                        message: "Thanks for the invite! Looking forward to working together.",
                      },
                      {
                        name: "Sahil Mehra",
                        avatar: "SM",
                        color: "bg-purple-500",
                        time: "10:33 PM",
                        message: "I just pushed some code to the repository. Can someone review it?",
                      },
                      {
                        name: "Akshat Jain",
                        avatar: "AJ",
                        color: "bg-green-500",
                        time: "10:35 PM",
                        message: "I'll take a look at it right away!",
                      },
                    ].map((msg, index) => (
                      <div className="flex" key={index}>
                        <div
                          className={`h-10 w-10 rounded-full ${msg.color} mr-3 flex-shrink-0 flex items-center justify-center text-white font-bold`}
                        >
                          {msg.avatar}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className={`font-medium ${isDarkTheme ? "text-white" : "text-gray-800"}`}>
                              {msg.name}
                            </span>
                            <span
                              className={`hidden md:inline ml-2 text-xs ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}
                            >
                              Today at {msg.time}
                            </span>
                          </div>
                          <p className={`${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4">
                    <div
                      className={`${isDarkTheme ? "bg-[#383a40]" : "bg-[#e3e5e8]"} rounded-lg p-3 flex items-center`}
                    >
                      <Plus className={`h-5 w-5 ${isDarkTheme ? "text-gray-400" : "text-gray-500"} mr-2`} />
                      <input
                        type="text"
                        placeholder="Message #general"
                        className={`bg-transparent border-none outline-none ${isDarkTheme ? "text-gray-300" : "text-gray-700"} w-full`}
                      />
                      <div className={`flex space-x-2 ${isDarkTheme ? "text-gray-400" : "text-gray-500"}`}>
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -z-10 -bottom-6 -right-6 h-64 w-64 bg-emerald-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -z-10 -top-6 -left-6 h-64 w-64 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>
    </section>
  )
}
