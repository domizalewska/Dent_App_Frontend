import { ref } from 'vue'

export const header = ref<string[]>([])

export function useHeader() {
  function setHeader(...parts: string[]) {
    header.value = parts
  }

  function resetHeader() {
    header.value = []
  }
  return { header, setHeader, resetHeader }
}
