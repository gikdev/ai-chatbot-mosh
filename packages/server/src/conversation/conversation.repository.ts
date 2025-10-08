import type { ChatCompletionMessageParam } from "openai/resources"

class ConversationRepository {
  private conversations = new Map<string, ChatCompletionMessageParam[]>()

  constructor() {}

  getCurrentConversation(conversationId: string) {
    return this.conversations.get(conversationId) ?? []
  }

  pushNewMsgToConversation(
    conversationId: string,
    role: "user" | "assistant",
    content: string
  ) {
    this.conversations.set(conversationId, [
      ...this.getCurrentConversation(conversationId),
      { role, content },
    ])
  }
}

export const conversationRepository = new ConversationRepository()
