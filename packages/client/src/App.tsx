// import { ChatBot } from "./components/chat-bot"

import { ReviewList } from "./components/review-list"

export default function App() {
  return (
    <div className="p-4 h-dvh">
      {/* <ChatBot /> */}
      <ReviewList productId={1} />
    </div>
  )
}
