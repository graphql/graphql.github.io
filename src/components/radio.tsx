import { Radio as BaseRadio } from "@base-ui-components/react/radio"

import { clsx as cn } from "clsx"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"
import { RadioIcon } from "../app/conf/_design-system/pixelarticons/radio-icon"

export { RadioGroup } from "@base-ui-components/react/radio-group"

export const Radio = forwardRef<
  ElementRef<typeof BaseRadio.Root>,
  ComponentPropsWithoutRef<typeof BaseRadio.Root>
>(({ className, ...props }, ref) => {
  return (
    <BaseRadio.Root
      ref={ref}
      className={cn(
        "gql-focus-visible relative aspect-square disabled:cursor-not-allowed disabled:opacity-50",
        className || "size-5",
      )}
      {...props}
    >
      <BaseRadio.Indicator
        className="flex size-full -translate-y-px items-center justify-center"
        keepMounted
        render={RadioIcon}
      />
    </BaseRadio.Root>
  )
})

Radio.displayName = "Radio"
