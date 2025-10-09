import { llmClient } from "../llm/client"
import { conversationRepository } from "./conversation.repository"
import { v4 } from "uuid"

interface ChatResponse {
  id: string
  message: string
}

class ConversationService {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    conversationRepository.pushNewMsgToConversation(
      conversationId,
      "user",
      prompt
    )

    const messages =
      conversationRepository.getCurrentConversation(conversationId)
    const msg = await llmClient.generateTextWithMessages({ messages })

    if (msg)
      conversationRepository.pushNewMsgToConversation(
        conversationId,
        "assistant",
        msg
      )

    return { id: v4(), message: msg }
  }
}

export const conversationService = new ConversationService()
