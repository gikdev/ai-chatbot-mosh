import express from "express"
import { conversationController } from "./conversation/conversation.controller"

const router = express.Router()

router.post("/api/chat", conversationController.sendMessage)

export default router
