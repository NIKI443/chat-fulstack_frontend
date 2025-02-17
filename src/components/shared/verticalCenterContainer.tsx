import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const VerticalCenterContainer: React.FC<
  React.PropsWithChildren<Props>
> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1280px] h-svh before:h-[85%] lg:before:h-[75%] before:inline-block before:align-middle",
        className
      )}
    >
      {children}
    </div>
  );
};
