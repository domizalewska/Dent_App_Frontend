import { useConfirmDialog } from '@vueuse/core'

export const useJobPositions = () => {
  const { $api } = useNuxtApp()
  const { confirm } = useConfirmDialog()
  const toast = useToast()
  const api = $api as typeof api
}
