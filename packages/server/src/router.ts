import express from "express"
import { conversationController } from "./conversation/conversation.controller"
import { reviewsController } from "./reviews/reviews.controller"

const router = express.Router()

router.post("/api/chat", conversationController.sendMessage)

router.get("/api/products/:id/reviews", reviewsController.getProductByIdReviews)
router.post(
  "/api/products/:id/reviews/summarize",
  reviewsController.summarizeReviews
)

export default router
