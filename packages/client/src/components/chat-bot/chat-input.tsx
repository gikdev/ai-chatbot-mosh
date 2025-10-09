import { ArrowUpIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import type { KeyboardEvent } from "react"
import { useForm } from "react-hook-form"

export interface ChatFormData {
  prompt: string
}

interface ChatInputProps {
  onSubmit: (data: ChatFormData) => void
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>()

  const onSubmitWrapper = (data: ChatFormData) => {
    reset({ prompt: "" })
    onSubmit(data)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    if (!e.shiftKey) return
    e.preventDefault()
    handleSubmit(onSubmitWrapper)()
  }

  return (
    <form
      onKeyDown={onKeyDown}
      onSubmit={handleSubmit(onSubmitWrapper)}
      className="flex flex-col gap-2 items-end border-2 p-4 border-border rounded-md"
    >
      <textarea
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything... (Shift + Enter to submit)"
        autoFocus
        maxLength={1000}
        {...register("prompt", {
          validate: text => text.trim().length > 0,
        })}
      />

      <SubmitBtn disabled={!formState.isValid} />
    </form>
  )
}

const SubmitBtn = ({ disabled = false }: { disabled?: boolean }) => (
  <Button
    disabled={disabled}
    type="submit"
    size="icon"
    className="rounded-full"
  >
    <ArrowUpIcon weight="fill" />
  </Button>
)
