"use client"

import { Hash, MessageSquare, Sparkles } from 'lucide-react'
import { motion } from "framer-motion"

interface ChatWelcomeProps {
  name: string
  type: "channel" | "conversation"
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 px-4 mb-8 mt-8"
    >
      <div className="flex flex-col items-center text-center">
        {type === "channel" ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
            className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-4 relative"
          >
            <Hash className="h-12 w-12 text-white" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 rounded-full bg-emerald-500 blur-xl -z-10 opacity-70"
            />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1
            }}
            className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center mb-4 relative"
          >
            <MessageSquare className="h-12 w-12 text-white" />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 rounded-full bg-purple-500 blur-xl -z-10 opacity-70"
            />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            {type === "channel" ? (
              <>
                Welcome to <span className="text-emerald-500">#{name}</span>
                <Sparkles className="h-5 w-5 text-emerald-500" />
              </>
            ) : (
              <>
                Chat with <span className="text-purple-500">{name}</span>
                <Sparkles className="h-5 w-5 text-purple-500" />
              </>
            )}
          </h2>
          
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            {type === "channel"
              ? `This is the start of the #${name} channel. Send messages, share files, and collaborate with your team.`
              : `This is the beginning of your direct message history with ${name}. Share ideas, files, and more in this private conversation.`}
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50"
      >
        <div className="flex items-start gap-4">
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-3 rounded-full">
            {type === "channel" ? (
              <Hash className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">
              {type === "channel" ? "Channel Tips" : "Conversation Tips"}
            </h3>
            <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {type === "channel" 
                  ? "Use # to mention channels" 
                  : "Share code snippets with ```code```"}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {type === "channel" 
                  ? "Use @ to mention members" 
                  : "Send files by dragging and dropping"}
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {type === "channel" 
                  ? "Share code snippets with ```code```" 
                  : "Use emojis to react to messages"}
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
