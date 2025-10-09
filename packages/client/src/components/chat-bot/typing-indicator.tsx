export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3 bg-secondary rounded-md self-start">
      <Dot className="[animation-delay:0s]" />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.4s]" />
    </div>
  )
}

const Dot = ({ className }: { className?: string }) => (
  <div
    className={`w-2 h-2 rounded-full bg-primary animate-pulse ${className}`}
  />
)
