import { useCallback, useState } from "react"
import { v4 } from "uuid"

export interface Message {
  id: string
  content: string
  role: "user" | "bot"
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  const addBotMessage = useCallback((content: string) => {
    setMessages(m => [...m, { id: v4(), content, role: "bot" }])
  }, [])

  const addUserMessage = useCallback((content: string) => {
    setMessages(m => [...m, { id: v4(), content, role: "user" }])
  }, [])

  return { messages, addUserMessage, addBotMessage }
}
