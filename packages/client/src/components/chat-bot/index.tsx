import { ArrowUpIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react"
import axios from "axios"
import { v4 } from "uuid"
import { useMessages } from "./use-messages"
import { cx } from "class-variance-authority"
import ReactMarkdown from "react-markdown"
import { TypingIndicator } from "./typing-indicator"

interface ChatBotProps {}

interface FormData {
  prompt: string
}

interface ChatResponse {
  message: string
}

type ChatState = "idle" | "typing" | "error"

export function ChatBot({}: ChatBotProps) {
  const conversationId = useRef(v4())
  const lastMessageRef = useRef<HTMLDivElement | null>(null)
  const { addBotMessage, addUserMessage, messages } = useMessages()
  const [chatState, setChatState] = useState<ChatState>("idle")
  const [error, setError] = useState("")
  const { register, handleSubmit, reset, formState } = useForm<FormData>()

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const onSubmit = async ({ prompt }: FormData) => {
    try {
      addUserMessage(prompt)
      setChatState("typing")
      reset({ prompt: "" })

      const { data } = await axios.post<ChatResponse>("/api/chat", {
        conversationId: conversationId.current,
        prompt,
      })

      setChatState("idle")
      addBotMessage(data.message)
    } catch (err) {
      setChatState("error")
      setError("Something went wrong.")
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    if (!e.shiftKey) return
    e.preventDefault()
    handleSubmit(onSubmit)()
  }

  const onCopyMessage = (e: ClipboardEvent) => {
    const selection = window.getSelection()?.toString().trim()
    if (!selection) return
    e.preventDefault()
    e.clipboardData.setData("text/plain", selection)
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-3 flex-1 h-full overflow-y-auto">
        {messages.map((m, i) => (
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
        ))}

        {chatState === "typing" && <TypingIndicator />}

        {chatState === "error" && !!error && (
          <p className="text-destructive text-xs text-start self-start">
            {error}
          </p>
        )}
      </div>

      <form
        onKeyDown={onKeyDown}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 items-end border-2 p-4 border-border rounded-md"
      >
        <textarea
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder="Ask anything... (Shift + Enter to submit)"
          autoFocus
          maxLength={1000}
          {...register("prompt", {
            validate: text => text.trim().length > 0,
          })}
        />

        <SubmitBtn disabled={!formState.isValid} />
      </form>
    </div>
  )
}

const SubmitBtn = ({ disabled = false }: { disabled?: boolean }) => (
  <Button
    disabled={disabled}
    type="submit"
    size="icon"
    className="rounded-full"
  >
    <ArrowUpIcon weight="fill" />
  </Button>
)
