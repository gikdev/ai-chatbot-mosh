import type { Request, Response } from "express"
import { reviewsService } from "./reviews.service"
import { productRepository } from "../product/product.repository"
import { reviewsRepository } from "./reviews.repository"

class ReviewsController {
  async getProductByIdReviews(req: Request, res: Response) {
    const productId = Number(req.params.id)

    if (Number.isNaN(productId))
      return res.status(400).json({ error: "Invalid product ID." })

    const product = await productRepository.getProduct(productId)
    if (!product) return res.status(400).json({ error: "Invalid product" })

    const reviews = await reviewsRepository.getReviews(productId)
    const summary = await reviewsRepository.getReviewSummary(productId)

    res.json({ summary, reviews })
  }

  async summarizeReviews(req: Request, res: Response) {
    const productId = Number(req.params.id)

    if (Number.isNaN(productId))
      return res.status(400).json({ error: "Invalid product ID." })

    const product = await productRepository.getProduct(productId)
    if (!product) return res.status(400).json({ error: "Invalid product" })

    const reviews = await reviewsRepository.getReviews(productId, 1)

    if (reviews.length === 0)
      return res.status(400).json({ error: "The are no reviews to summarize" })

    const summary = await reviewsService.summarizeReviews(productId)

    res.json({ summary })
  }
}

export const reviewsController = new ReviewsController()
