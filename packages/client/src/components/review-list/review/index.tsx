import { StarRating } from "./star-rating"

interface ReviewProps {
  rating: number
  author: string
  content: string
}

export function Review({ author, content, rating }: ReviewProps) {
  return (
    <div className="">
      <div className="">{author}</div>
      <StarRating rating={rating} />
      <p className="py-2">{content}</p>
    </div>
  )
}
