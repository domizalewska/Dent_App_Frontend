import { ref } from 'vue';

export const header = ref();

export function useHeader() {
  function setHeader(title: string) {
    header.value = title;
  }

  function resetHeader() {
    header.value = '';
  }
  return { header, setHeader, resetHeader };
}
