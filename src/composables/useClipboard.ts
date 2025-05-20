import { useToast } from 'primevue'

export type ClipboardMessages = {
  success: {
    summary: string
    detail: string
  }
  error: {
    summary: string
    detail: string
  }
}

export function useClipboard() {
  const toast = useToast()
  const copy = async (text: string, messages: ClipboardMessages) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.add({
        severity: 'success',
        life: 3000,
        ...messages.success
      })
    } catch (err) {
      toast.add({
        severity: 'error',
        life: 3000,
        ...messages.error
      })
    }
  }
  return { copy }
}
