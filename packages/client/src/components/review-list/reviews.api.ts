import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

export interface Review {
  id: number
  author: string
  content: string
  createdAt: string
  rating: number
}

interface GetReviewsReponse {
  summary: string | null
  reviews: Review[]
}

interface SummarizeResponse {
  summary: string
}

async function fetchReviews(productId: number) {
  const { data } = await axios.get<GetReviewsReponse>(
    `/api/products/${productId}/reviews`
  )

  return data
}

async function summarizeReviews(productId: number) {
  const { data } = await axios.post<SummarizeResponse>(
    `/api/products/${productId}/reviews/summarize`
  )

  return data
}

export function useReviewsQuery(productId: number) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
  })
}

export function useSummaryMutation(productId: number) {
  return useMutation({
    mutationFn: () => summarizeReviews(productId),
  })
}
