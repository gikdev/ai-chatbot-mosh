export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-3 bg-secondary rounded-md self-start">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0s]" />
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.2s]" />
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:0.4s]" />
    </div>
  )
}
