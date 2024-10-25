import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Arrow } from "@radix-ui/react-tooltip"

interface TooltipElementProps {
  title: string | React.ReactNode
  delayDuration: number
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left" | undefined
}

function TooltipElement({
  title,
  delayDuration,
  children,
  side = "top",
}: TooltipElementProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild className="bg-transparent">
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align="center" className="bg-white border text-black w-full max-w-[90vw] h-auto">
          {title}
          <Arrow width={11} height={5} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipElement;