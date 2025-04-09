"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const isActive = params?.serverId === id;

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            isActive ? "h-[36px]" : "h-0"
          )}
        />
        <div
          className={cn(
            "relative flex mx-3 h-[48px] w-[48px] transition-all overflow-hidden",
            isActive
              ? "rounded-[16px] bg-primary/10 text-primary"
              : "rounded-[24px]"
          )}
        >
          <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority src={imageUrl} alt="Channel" className="object-cover hover:cursor-pointer"/>
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
