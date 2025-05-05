"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
}: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const rawName = `${user.firstName} ${user.lastName}`;
    const sanitizedName = rawName.replace(/\s+/g, "_");

    (async () => {
      try {
        const res = await fetch(
          `/api/livekit?room=${chatId}&username=${sanitizedName}`
        );
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  const handleDisconnect = () => {
    // Redirect to general page (adjust route as needed)
    router.push(`/`);
  };

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      onDisconnected={handleDisconnect}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};
