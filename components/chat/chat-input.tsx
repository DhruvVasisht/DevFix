"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useModal } from "@/hooks/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Code, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { EmojiPicker } from "../emoji-picker"
import { useState } from "react"
import { ActionTooltip } from "../action-tooltip"

interface ChatInputProps {
  apiUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Record<string, any>
  name: string
  type: "conversation" | "channel"
}

const formSchema = z.object({
  content: z.string().min(1),
})

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal()
  const router = useRouter()
  const [isCodeMode, setIsCodeMode] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      let content = value.content

      // If in code mode, wrap the content in code formatting
      if (isCodeMode) {
        // Try to detect language from content
        let language = ""

        if (content.includes("import React") || content.includes("<div>") || content.includes("function(")) {
          language = "javascript"
        } else if (content.includes("def ") && content.includes(":")) {
          language = "python"
        } else if (content.includes("public class") || content.includes("System.out")) {
          language = "java"
        } else if (content.includes("#include") || content.includes("int main()")) {
          language = "cpp"
        } else if (content.includes("<html>") || content.includes("<!DOCTYPE")) {
          language = "html"
        } else if (
          content.includes("@media") ||
          (content.includes("{") && content.includes("}") && content.includes(":"))
        ) {
          language = "css"
        }

        // If language detected, include it in the code block
        if (language) {
          content = "```" + language + "\n" + content + "\n```"
        } else {
          content = "```\n" + content + "\n```"
        }

        setIsCodeMode(false)
      }

      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      })

      await axios.post(url, { content })
      form.reset()
      router.refresh()
    } catch (error) {
      console.log("Error sending message:", error)
    }
  }

  const toggleCodeMode = () => {
    setIsCodeMode(!isCodeMode)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="w-full relative p-4 pb-6">
                  <div className="absolute top-7 left-8 flex space-x-2">
                    <ActionTooltip align="center" label="Upload file">
                      <button
                        type="button"
                        onClick={() =>
                          onOpen("messageFile", {
                            apiUrl: apiUrl,
                            query,
                          })
                        }
                        className="h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                      >
                        <Plus className="text-white dark:text-[#313338]" />
                      </button>
                    </ActionTooltip>
                    <ActionTooltip align="center" label="Toggle code formatting">
                      <button
                        type="button"
                        onClick={toggleCodeMode}
                        className={`h-[24px] w-[24px] ${
                          isCodeMode
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300"
                        } transition rounded-full p-1 flex items-center justify-center`}
                        title="Toggle code formatting"
                      >
                        <Code className="text-white dark:text-[#313338]" />
                      </button>
                    </ActionTooltip>
                  </div>
                  <Input
                    disabled={isLoading}
                    placeholder={
                      isCodeMode
                        ? "Enter code... (will be formatted as a code block)"
                        : `Message ${type === "conversation" ? name : "#" + name}`
                    }
                    {...field}
                    className={`w-full px-20 py-6 ${
                      isCodeMode
                        ? "bg-zinc-800/90 dark:bg-zinc-900/90 font-mono text-emerald-400 dark:text-emerald-300"
                        : "bg-zinc-200/90 dark:bg-zinc-700/75 text-zinc-600 dark:text-zinc-200"
                    } border-[1px] transition-all duration-200`}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
