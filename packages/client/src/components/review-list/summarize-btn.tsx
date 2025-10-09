import { CircleNotchIcon, SparkleIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"

interface SummarizeBtnProps {
  isLoading: boolean
  onClick: () => void
}

export function SummarizeBtn({ onClick, isLoading }: SummarizeBtnProps) {
  const title = isLoading ? "Summarizing..." : "Summarize"

  return (
    <Button onClick={onClick} disabled={isLoading} className="self-start">
      {isLoading ? (
        <CircleNotchIcon className="animate-spin" />
      ) : (
        <SparkleIcon />
      )}

      <span>{title}</span>
    </Button>
  )
}
