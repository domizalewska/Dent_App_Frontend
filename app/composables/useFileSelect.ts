import { useFileDialog } from '@vueuse/core'

export function useFileSelect(accept: string, onSelect: (file: File) => void) {
  const { open, onChange } = useFileDialog({ accept, multiple: false })

  onChange((files) => {
    if (files?.[0]) onSelect(files[0])
  })

  return { open }
}
