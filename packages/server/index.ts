import dotenv from "dotenv"
import express from "express"
import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources"
import z from "zod"

dotenv.config()

const client = new OpenAI({
  baseURL: process.env.LIARA_BASE_URL,
  apiKey: process.env.LIARA_API_KEY,
})

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello world!")
})

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World! How are you?",
  })
})

const conversations = new Map<string, ChatCompletionMessageParam[]>()

const getCurrentConversation = (converstionId: string) =>
  conversations.get(converstionId) ?? []

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required.")
    .max(1000, "Prompt is too long(max 1000 chars)"),
  conversationId: z.uuid(),
})

app.post("/api/chat", async (req, res) => {
  const result = chatSchema.safeParse(req.body)

  if (!result.success) res.status(400).json(result.error.format)

  const { prompt, conversationId } = req.body

  const msg: ChatCompletionMessageParam = {
    role: "user",
    content: prompt,
  }

  conversations.set(conversationId, [
    ...getCurrentConversation(conversationId),
    msg,
  ])

  try {
    const completion = await client.chat.completions.create({
      model: process.env.LIARA_MODEL_NAME as string,
      temperature: 0.2,
      max_completion_tokens: 100,
      messages: getCurrentConversation(conversationId),
    })

    const firstMsg = completion.choices[0]?.message
    if (firstMsg)
      conversations.set(conversationId, [
        ...getCurrentConversation(conversationId),
        {
          role: "assistant",
          content: firstMsg.content || "",
        },
      ])

    res.json({
      message: firstMsg?.content || "",
    })
  } catch (err) {
    res.status(500).json({ error: "Failed to generate a response." })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
