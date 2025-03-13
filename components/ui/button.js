import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] border border-[#1A1A1A]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "bg-transparent text-white hover:bg-[#1A1A1A] border border-[#1A1A1A]",
        secondary:
          "bg-[#0F0F0F] text-white hover:bg-[#1A1A1A] border border-[#1A1A1A]",
        ghost: "text-[#A1A1AA] hover:text-white hover:bg-transparent",
        link: "text-white hover:text-[#A1A1AA] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
