import type { Request, Response } from "express"
import { conversationService } from "./conversation.service"
import z from "zod"

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required.")
    .max(1000, "Prompt is too long(max 1000 chars)"),
  conversationId: z.uuid(),
})

class ConversationController {
  async sendMessage(req: Request, res: Response) {
    const result = chatSchema.safeParse(req.body)

    if (!result.success) res.status(400).json(result.error.format)

    const { prompt, conversationId } = req.body

    try {
      const { message } = await conversationService.sendMessage(
        prompt,
        conversationId
      )

      res.json({ message })
    } catch (err) {
      res.status(500).json({ error: "Failed to generate a response." })
    }
  }
}

export const conversationController = new ConversationController()
