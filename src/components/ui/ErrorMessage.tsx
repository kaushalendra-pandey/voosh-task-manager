"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const errorMessage = cva(
  "text-xs block font-medium text-red-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const ErrorMessage = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof errorMessage>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(errorMessage(), className)}
    {...props}
  />
))
ErrorMessage.displayName = LabelPrimitive.Root.displayName

export { ErrorMessage }
