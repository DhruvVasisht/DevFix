import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" ? (
        <h1 className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </h1>
      ) : (
        <h1 className="text-xl font-bold">{`Welcome to your conversation with ${name}`}</h1>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""} {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the beginning of this ${type}.`
          : `This is the start of your conversation with ${name}.`}
      </p>
    </div>
  );
};
