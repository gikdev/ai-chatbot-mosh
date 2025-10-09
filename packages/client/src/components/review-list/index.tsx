import Skeleton from "react-loading-skeleton"
import {
  useReviewsQuery,
  useSummaryMutation,
  type Review as IReview,
} from "./reviews.api"
import { Review } from "./review"
import { ReviewSkeleton } from "./review/loading"
import { SummarizeBtn } from "./summarize-btn"

interface ReviewListProps {
  productId: number
}

export function ReviewList({ productId }: ReviewListProps) {
  const reviewsQuery = useReviewsQuery(productId)
  const summaryMutation = useSummaryMutation(productId)

  if (reviewsQuery.isSuccess && reviewsQuery.data.reviews.length <= 0)
    return null

  const currentSummary =
    reviewsQuery.data?.summary || summaryMutation.data?.summary

  return (
    <div className="flex flex-col gap-5">
      {reviewsQuery.isSuccess && (
        <div className="flex flex-col gap-2">
          {currentSummary ? (
            <p>{currentSummary}</p>
          ) : (
            <>
              {summaryMutation.isError && (
                <p>{summaryMutation.error.message}</p>
              )}

              {summaryMutation.isPending && <Skeleton count={5} />}

              <SummarizeBtn
                isLoading={summaryMutation.isPending}
                onClick={() => summaryMutation.mutate()}
              />
            </>
          )}
        </div>
      )}

      {reviewsQuery.isError && (
        <div className="flex flex-col gap-4">{reviewsQuery.error.message}</div>
      )}

      {reviewsQuery.isPending && <ReviewsSkeleton />}

      {reviewsQuery.isSuccess && (
        <Reviews reviews={reviewsQuery.data.reviews} />
      )}
    </div>
  )
}

const ReviewsSkeleton = () => (
  <div className="flex flex-col gap-4">
    <ReviewSkeleton />
    <ReviewSkeleton />
    <ReviewSkeleton />
  </div>
)

const Reviews = ({ reviews }: { reviews: IReview[] }) => (
  <div className="flex flex-col gap-4">
    {reviews.map(r => (
      <Review
        key={r.id}
        author={r.author}
        content={r.content}
        rating={r.rating}
      />
    ))}
  </div>
)
