"use client"

import { type Member, MemberRole, type Profile } from "@prisma/client"
import UserAvatar from "../user-avatar"
import { ActionTooltip } from "../action-tooltip"
import { Edit, FileIcon, ShieldCheck, ShieldIcon as ShieldUser, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import qs from "query-string"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter, useParams } from "next/navigation"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

interface ChatItemProps {
  id: string
  content: string
  member: Member & {
    profile: Profile
  }
  timestamp: string
  fileUrl: string | null
  deleted: boolean
  currentMember: Member
  isUpdated: boolean
  socketUrl: string
  socketQuery: Record<string, string>
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldUser className="h-4 w-4 ml-2 text-indigo-500" />,
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const { onOpen } = useModal()
  const params = useParams()
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      })

      await axios.patch(url, values)

      form.reset()
      setIsEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content, form])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const fileType = fileUrl?.split(".").pop()

  const isAdmin = currentMember.role === MemberRole.ADMIN
  const isModerator = currentMember.role === MemberRole.MODERATOR
  const isOwner = currentMember.id === member.id
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
  const canEditMessage = !deleted && isOwner && !fileUrl
  const isPDF = fileType === "pdf" && fileUrl
  const isImage = !isPDF && fileUrl

  // Function to detect and format code blocks
  const formatContent = (text: string) => {
    // Check for explicit code blocks (```code```)
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```/g
    let match
    let lastIndex = 0
    const parts = []
    let hasCodeBlock = false

    while ((match = codeBlockRegex.exec(text)) !== null) {
      hasCodeBlock = true
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>)
      }

      const language = match[1] || "javascript"
      const code = match[2].trim()

      // Add the code block with proper syntax highlighting
      parts.push(
        <div key={`code-${match.index}`} className="w-full rounded-md overflow-hidden my-2">
          <div className="bg-zinc-800 dark:bg-zinc-900 px-4 py-1.5 text-xs text-zinc-300 flex justify-between items-center">
            <span>{language}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code)
              }}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={resolvedTheme === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0.375rem 0.375rem",
              fontSize: "0.875rem",
            }}
            wrapLines={true}
            showLineNumbers={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>,
      )

      lastIndex = match.index + match[0].length
    }

    // Check if the content looks like code (without explicit code block markers)
    const isLikelyCode = (content: string) => {
      // Only check if the content has multiple lines and contains code-like patterns
      if (!content.includes("\n")) return false

      const codePatterns = [
        /function\s+\w+\s*\(/,
        /const|let|var\s+\w+\s*=/,
        /import\s+.*\s+from\s+['"].*['"]/,
        /class\s+\w+/,
        /<\w+[^>]*>.*<\/\w+>/,
        /\w+\s*$$$$\s*=>\s*{/,
        /if\s*$$[^)]*$$\s*{/,
        /for\s*$$[^)]*$$\s*{/,
        /^\s*#include/m,
        /^\s*package\s+\w+/m,
        /^\s*def\s+\w+\s*\(/m,
        /^\s*from\s+\w+\s+import/m,
        /^\s*public\s+class/m,
        /^\s*\/\//m, // JavaScript/C-style comments
        /^\s*\/\*/m, // Multi-line comments
        /^\s*#/m, // Python/Shell comments
      ]

      // Check if at least two patterns match to increase confidence
      let matchCount = 0
      for (const pattern of codePatterns) {
        if (pattern.test(content)) {
          matchCount++
          if (matchCount >= 2) return true
        }
      }

      // Also check for indentation patterns common in code
      const lines = content.split("\n")
      let indentedLines = 0

      for (const line of lines) {
        if (/^\s{2,}/.test(line)) {
          indentedLines++
        }
      }

      // If more than 30% of lines are indented, likely code
      return indentedLines / lines.length > 0.3
    }

    // If no explicit code blocks but content looks like code, format the whole thing as code
    if (!hasCodeBlock && isLikelyCode(text)) {
      // Try to detect the language based on content patterns
      let detectedLanguage = "javascript" // Default

      if (text.includes("import React") || text.includes("function Component") || text.includes("const [")) {
        detectedLanguage = "jsx"
      } else if (text.includes("def ") && text.includes(":")) {
        detectedLanguage = "python"
      } else if (text.includes("public class") || text.includes("System.out.println")) {
        detectedLanguage = "java"
      } else if (text.includes("#include") || text.includes("int main()")) {
        detectedLanguage = "cpp"
      } else if (text.includes("<html>") || text.includes("<!DOCTYPE")) {
        detectedLanguage = "html"
      } else if (text.includes("@media") || (text.includes("{") && text.includes("}") && text.includes(":"))) {
        detectedLanguage = "css"
      }

      return (
        <div className="w-full rounded-md overflow-hidden my-2">
          <div className="bg-zinc-800 dark:bg-zinc-900 px-4 py-1.5 text-xs text-zinc-300 flex justify-between items-center">
            <span>{detectedLanguage}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(text)
              }}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={detectedLanguage}
            style={resolvedTheme === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0.375rem 0.375rem",
              fontSize: "0.875rem",
            }}
            wrapLines={true}
            showLineNumbers={true}
          >
            {text}
          </SyntaxHighlighter>
        </div>
      )
    }

    // Add any remaining text after the last code block
    if (hasCodeBlock && lastIndex < text.length) {
      parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>)
    }

    // Process inline code (wrapped in single backticks)
    if (!hasCodeBlock && !isLikelyCode(text)) {
      const inlineCodeRegex = /`([^`]+)`/g
      let inlineMatch
      let inlineLastIndex = 0
      const inlineParts = []

      while ((inlineMatch = inlineCodeRegex.exec(text)) !== null) {
        // Add text before the inline code
        if (inlineMatch.index > inlineLastIndex) {
          inlineParts.push(text.substring(inlineLastIndex, inlineMatch.index))
        }

        // Add the inline code
        inlineParts.push(
          <code
            key={inlineMatch.index}
            className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {inlineMatch[1]}
          </code>,
        )

        inlineLastIndex = inlineMatch.index + inlineMatch[0].length
      }

      // Add any remaining text
      if (inlineLastIndex < text.length) {
        inlineParts.push(text.substring(inlineLastIndex))
      }

      return inlineParts.length > 1 ? inlineParts : text
    }

    return parts.length > 0 ? parts : text
  }

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={() => router.push(`/servers/${params?.serverId}/conversations/${member.id}`)}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={() => router.push(`/servers/${params?.serverId}/conversations/${member.id}`)}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>{roleIconMap[member.role]}</ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image src={fileUrl || "/placeholder.svg"} alt={content} fill className="object-cover" />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <div
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1",
              )}
            >
              {deleted ? "This message has been deleted." : formatContent(content)}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">(edited)</span>
              )}
            </div>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form className="flex items-center w-full gap-x-2 pt-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">Press escape to cancel, enter to save</span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => onOpen("deleteMessage", { apiUrl: `${socketUrl}/${id}`, query: socketQuery })}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  )
}
