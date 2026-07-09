export function useFileSelect(accept: string, onSelect: (file: File) => void) {
  function open() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) onSelect(file)
    }
    input.click()
  }

  return { open }
}
