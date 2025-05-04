"use client";

import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import qs from 'query-string'
import { zodResolver } from '@hookform/resolvers/zod'
import { Member, Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import { ShieldCheck, ShieldAlert, FileIcon, Edit, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/use-modal-store'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface ChatItemProps {
  id: string;
  content: string;
  fileUrl: string | null;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
  GUEST: null,
};

const formSchema = z.object({
  content: z.string().min(1),
})


export const ChatItem = ({
  id,
  content,
  fileUrl,
  member,
  timestamp,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { onOpen } = useModal()

  const params = useParams()
  const router = useRouter()

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

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
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setIsEditing(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keyDown', handleKeyDown)
  }, [])


  useEffect(() => {
    form.reset({
      content: content,
    })
  }, [content])



  const [fileType, setFileType] = useState<string | null>(null);

  const isAdmin = currentMember.role === "ADMIN";
  const isModerator = currentMember.role === "MODERATOR";
  const isOwner = currentMember.id === member.id;
  const canEdit = !deleted && isOwner && !fileUrl;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner)
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;

  useEffect(() => {
    const detectFileType = async () => {
      if (!fileUrl) return;

      try {
        const response = await fetch(fileUrl, { method: "HEAD" });
        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/pdf")) {
          setFileType("pdf");
        } else if (contentType?.startsWith("image/")) {
          setFileType("image");
        } else {
          setFileType(null);
        }
      } catch (error) {
        console.error("Error detecting file type:", error);
        setFileType(null);
      }
    };

    detectFileType();
  }, [fileUrl]);

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 w-full transition">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center">
              <p className="font-semibold cursor-pointer hover:underline">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square w-48 h-48 overflow-hidden rounded-md border flex items-center bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPdf && (
            <div className="relative flex items-center p-2 mt-2 rounded-md">
              <FileIcon className="h-10 w-10 fill-blue-200 stroke-indigo-400" />
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
          {!isImage && !isPdf && fileUrl && (
            <div className="relative flex items-center p-2 mt-2 rounded-md">
              <FileIcon className="h-10 w-10 fill-blue-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-1 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
           {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex items-center w-full gap-x-2 pt-2'
              >
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            autoComplete='off'
                            disabled={isLoading}
                            className='p-2 bg-zinc-300/80 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-800 dark:text-zinc-200'
                            placeholder='Edited Message'
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size='sm' variant='primary'>
                  Save
                </Button>
              </form>
              <span className='text-[10px] mt-1 text-zinc-400'>
                Press ESC to Canel, Enter to Save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className='hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-gray-200 dark:bg-zinc-900 border rounded-sm'>
          {canEdit && (
            <ActionTooltip label='Edit'>
              <Edit
                onClick={() => setIsEditing(true)}
                className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-indigo-400 dark:hover:text-indigo-500 transition'
              />
            </ActionTooltip>
          )}
          <ActionTooltip label='Delete'>
            <Trash2
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className='cursor-pointer ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-600 transition'
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
