import type { PreviewFeedback } from '../types.ts'

interface FormFeedbackProps {
  id: string
  feedback: PreviewFeedback | null
}

export default function FormFeedback({ id, feedback }: FormFeedbackProps) {
  const className = feedback
    ? `message show${feedback.type === 'success' ? ' success' : ''}`
    : undefined

  return (
    <div id={id} className={className} role="status" aria-live="polite">
      {feedback?.message}
    </div>
  )
}
