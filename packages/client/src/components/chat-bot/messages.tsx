import { cx } from "class-variance-authority"
import ReactMarkdown from "react-markdown"
import type { Message } from "./use-messages"
import { useEffect, useRef, type ClipboardEvent } from "react"

const onCopyMessage = (e: ClipboardEvent) => {
  const selection = window.getSelection()?.toString().trim()
  if (!selection) return
  e.preventDefault()
  e.clipboardData.setData("text/plain", selection)
}

interface MessagesProps {
  messages: Message[]
}

export function Messages({ messages }: MessagesProps) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return messages.map((m, i) => (
    <div
      key={m.id}
      onCopy={onCopyMessage}
      ref={i === messages.length - 1 ? lastMessageRef : null}
      className={cx("px-3 py-1 rounded-md", {
        "bg-primary text-primary-foreground self-end max-w-4/5":
          m.role === "user",
        "bg-secondary text-secondary-foreground self-start max-w-4/5":
          m.role === "bot",
      })}
    >
      <ReactMarkdown>{m.content}</ReactMarkdown>
    </div>
  ))
}
