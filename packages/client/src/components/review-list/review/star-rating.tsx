import { StarIcon } from "@phosphor-icons/react"

export function StarRating({ rating }: { rating: number }) {
  const placeholders = [1, 2, 3, 4, 5]

  return (
    <div className="flex gap-1 text-yellow-500">
      {placeholders.map(p => (
        <StarIcon key={p} weight={p <= rating ? "fill" : "regular"} />
      ))}
    </div>
  )
}
