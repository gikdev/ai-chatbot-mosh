import type { ChatCompletionMessageParam } from "openai/resources"
import path from "path"
import fs from "fs"
import template from "../prompts/chatbot.txt"

const parkInfo = fs.readFileSync(
  path.join(__dirname, "..", "prompts", "WonderWorld.md"),
  "utf-8"
)
const instructions = template.replace("{{PARK_INFO}}", parkInfo)

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
    let current = this.getCurrentConversation(conversationId)

    // If this is a new conversation, start it with the system message
    if (current.length === 0) {
      current = [{ role: "system", content: instructions }]
    }

    this.conversations.set(conversationId, [...current, { role, content }])
  }
}

export const conversationRepository = new ConversationRepository()
