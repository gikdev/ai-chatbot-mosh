import { useRef, useState } from "react"
import axios from "axios"
import { v4 } from "uuid"
import { useMessages } from "./use-messages"
import { TypingIndicator } from "./typing-indicator"
import { Messages } from "./messages"
import { ChatInput, type ChatFormData } from "./chat-input"

interface ChatResponse {
  message: string
}

type ChatState = "idle" | "typing" | "error"

export function ChatBot() {
  const conversationId = useRef(v4())
  const { addBotMessage, addUserMessage, messages } = useMessages()
  const [chatState, setChatState] = useState<ChatState>("idle")
  const [error, setError] = useState("")

  const onSubmit = async ({ prompt }: ChatFormData) => {
    try {
      addUserMessage(prompt)
      setChatState("typing")

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

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col gap-3 flex-1 h-full overflow-y-auto">
        <Messages messages={messages} />

        {chatState === "typing" && <TypingIndicator />}

        {chatState === "error" && !!error && (
          <p className="text-destructive text-xs text-start self-start">
            {error}
          </p>
        )}
      </div>

      <ChatInput onSubmit={onSubmit} />
    </div>
  )
}
