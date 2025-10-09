import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources"

interface GenerateTextWithPromptOptions {
  prompt: string
  temperature?: number
  maxTokens?: number
}

export interface Message {
  role: "user" | "assistant" | "developer" | "system"
  content: string
}

interface GenerateTextWithMessagesOptions {
  messages: Message[]
  temperature?: number
  maxTokens?: number
}

class LlmClient {
  client = new OpenAI({
    baseURL: process.env.LIARA_BASE_URL,
    apiKey: process.env.LIARA_API_KEY,
  })

  async generateTextWithPrompt({
    prompt,
    maxTokens = 300,
    temperature = 0.2,
  }: GenerateTextWithPromptOptions) {
    const response = await this.client.chat.completions.create({
      model: process.env.LIARA_MODEL_NAME as string,
      temperature,
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    })

    return response.choices[0]?.message.content || ""
  }

  async generateTextWithMessages({
    messages,
    maxTokens = 300,
    temperature = 0.2,
  }: GenerateTextWithMessagesOptions) {
    const response = await this.client.chat.completions.create({
      model: process.env.LIARA_MODEL_NAME as string,
      temperature,
      max_completion_tokens: maxTokens,
      messages,
    })

    return response.choices[0]?.message.content || ""
  }
}

export const llmClient = new LlmClient()
