import dayjs from "dayjs"
import type { Review } from "../generated/prisma"
import { PrismaClient } from "../generated/prisma"

class ReviewsRepository {
  private prisma = new PrismaClient()

  async getReviews(productId: number, limit?: number): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    return reviews
  }

  async storeReviewSummary(productId: number, summary: string) {
    const generatedAt = new Date()
    const expiresAt = dayjs().add(7, "days").toDate()

    const data = { content: summary, expiresAt, generatedAt, productId }

    const newSummary = await this.prisma.summary.upsert({
      where: { productId },
      create: data,
      update: data,
    })

    return newSummary
  }

  async getReviewSummary(productId: number): Promise<string | null> {
    const summary = await this.prisma.summary.findFirst({
      where: {
        AND: [{ productId }, { expiresAt: { gt: new Date() } }],
      },
    })

    return summary ? summary.content : null
  }
}

export const reviewsRepository = new ReviewsRepository()
