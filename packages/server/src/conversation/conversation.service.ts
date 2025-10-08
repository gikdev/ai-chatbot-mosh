import OpenAI from "openai"
import { conversationRepository } from "./conversation.repository"

interface ChatResponse {
  id: string
  message: string
}

class ConversationService {
  client = new OpenAI({
    baseURL: process.env.LIARA_BASE_URL,
    apiKey: process.env.LIARA_API_KEY,
  })

  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    conversationRepository.pushNewMsgToConversation(
      conversationId,
      "user",
      prompt
    )

    const completion = await this.client.chat.completions.create({
      model: process.env.LIARA_MODEL_NAME as string,
      temperature: 0.2,
      max_completion_tokens: 240,
      messages: conversationRepository.getCurrentConversation(conversationId),
    })

    const msg = completion.choices[0]?.message.content || ""
    if (msg)
      conversationRepository.pushNewMsgToConversation(
        conversationId,
        "assistant",
        msg
      )

    return { id: completion.id, message: msg }
  }
}

export const conversationService = new ConversationService()
