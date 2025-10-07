import type { ChatCompletionMessageParam } from "openai/resources"

const conversations = new Map<string, ChatCompletionMessageParam[]>()

export function getCurrentConversation(conversationId: string) {
  return conversations.get(conversationId) ?? []
}

export function pushNewMsgToConversation(
  conversationId: string,
  role: "user" | "assistant",
  content: string
) {
  conversations.set(conversationId, [
    ...getCurrentConversation(conversationId),
    { role, content },
  ])
}
