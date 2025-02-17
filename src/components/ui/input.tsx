import * as React from "react"
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-sm",
  {
    variants: {
      variant: {
        default: "text-primary-foreground border-2 h-12  ",
        search:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (

      <Comp
        type={type}
        className={cn(inputVariants({ variant, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
