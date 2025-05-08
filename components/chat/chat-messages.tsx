"use client"

import { Fragment, useRef, type ElementRef, useState } from "react"
import { format } from "date-fns"
import type { Member, Message, Profile } from "@prisma/client"

import { Loader2, MessageCircleMore, ServerCrash } from "lucide-react"

import { ChatWelcome } from "./chat-welcome"
import { ChatItem } from "./chat-item"

import { useChatQuery } from "@/hooks/use-chat-query"
import { useChatSocket } from "@/hooks/use-chat-socket"
import { useChatScroll } from "@/hooks/use-chat-scroll"
import ChatAi from "./chat-ai"
import { motion } from "framer-motion"

const DATE_FORMAT = "d MMM yyyy, hh:mm a"

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

interface ChatMessagesProps {
  name: string
  member: Member
  chatId: string
  apiUrl: string
  socketUrl: string
  socketQuery: Record<string, string>
  paramKey: "channelId" | "conversationId"
  paramValue: string
  type: "channel" | "conversation"
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`
  const addKey = `chat:${chatId}:messages`
  const updateKey = `chat:${chatId}:messages:update`

  const chatRef = useRef<ElementRef<"div">>(null)
  const bottomRef = useRef<ElementRef<"div">>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  })

  useChatSocket({ queryKey, addKey, updateKey })

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  })

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="w-full max-w-md px-4">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/40 blur-md -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.h3
              className="text-lg font-semibold mt-4 text-zinc-700 dark:text-zinc-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Loading messages
            </motion.h3>

            <motion.div
              className="flex space-x-1 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.div
                className="h-2 w-2 rounded-full bg-indigo-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-indigo-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="h-2 w-2 rounded-full bg-indigo-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
              />
            </motion.div>
          </div>

          {/* Message skeletons */}
          <div className="space-y-4 w-full">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              >
                <div className={`flex ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"} max-w-[80%] gap-2`}>
                  {i % 2 === 0 && (
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 animate-pulse" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-3 w-24 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
                      <div className="h-2 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                    <div
                      className={`p-4 rounded-xl ${i % 2 === 0 ? "rounded-tl-none bg-white dark:bg-zinc-800" : "rounded-tr-none bg-indigo-500/10 dark:bg-indigo-500/20"} shadow-sm`}
                    >
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                        <div className="h-3 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                        {i === 1 && <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />}
                      </div>
                    </div>
                  </div>
                  {i % 2 !== 0 && (
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-800 animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="w-full h-12 mt-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="h-10 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center px-4">
              <div className="h-3 w-32 bg-zinc-300 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative"
        >
          <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center">
            <ServerCrash className="h-8 w-8 text-rose-500" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-rose-500/20 blur-md -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <motion.h3
          className="text-lg font-semibold mt-4 text-zinc-700 dark:text-zinc-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Something went wrong!
        </motion.h3>
        <motion.p
          className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 text-center max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          We couldn't load your messages. Please check your connection and try again.
        </motion.p>
        <motion.button
          className="mt-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md text-sm font-medium transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
      </div>
    )
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto relative">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center py-2">
              <Loader2 className="h-6 w-6 text-indigo-500 animate-spin my-2" />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Loading more messages</span>
            </div>
          ) : (
            <motion.button
              onClick={() => fetchNextPage()}
              className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 text-sm my-4 dark:hover:text-indigo-300 transition px-4 py-1.5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load previous messages
            </motion.button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.items?.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                member={message.member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />

      {status === "success" && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-20 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-indigo-500/30 z-50 animate-bounce transition-all duration-300 hover:scale-105 group"
            aria-label="Open Gemini Chat"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
                <MessageCircleMore />
              </span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </div>
          </button>

          {isModalOpen && <ChatAi onClose={() => setIsModalOpen(false)} />}
        </>
      )}
    </div>
  )
}
