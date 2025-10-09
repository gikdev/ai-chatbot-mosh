import { llmClient } from "../llm/client"
import { reviewsRepository } from "./reviews.repository"
import summarizeReviewsPromptTemplate from "./summarize-reviews.prompt.txt"

class ReviewsService {
  async summarizeReviews(productId: number) {
    const existingSummary = await reviewsRepository.getReviewSummary(productId)

    if (existingSummary && existingSummary.expiresAt > new Date()) {
      return existingSummary.content
    }

    const reviews = await reviewsRepository.getReviews(productId, 10)

    const joinedReviews = reviews.map(r => r.content).join("\n\n")
    const prompt = summarizeReviewsPromptTemplate.replace(
      "{{REVIEWS}}",
      joinedReviews
    )
    const summary = await llmClient.generateTextWithPrompt({
      prompt,
      maxTokens: 500,
    })

    reviewsRepository.storeReviewSummary(productId, summary)

    return summary
  }
}

export const reviewsService = new ReviewsService()
