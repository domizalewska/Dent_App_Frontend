import { toast } from 'vue-sonner'
import type { MessageType, User } from '~/types'
import { MessagesEndpoints, MessageGroupsEndpoints } from '~/features/messages/messages.endpoints'
import { toastErrorStyle } from '~/utils/toast'

const privateMessages = ref<MessageType[]>([])
const selectedUser = ref<User | null>(null)
const isLoadingMessages = ref(false)

export function useMessages() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetchPrivateMessages() {
    try {
      isLoadingMessages.value = true
      const response = await api<{ data: MessageType[] }>(MessagesEndpoints.BASE)
      privateMessages.value = response.data
    } catch {
      toast.error('Błąd pobierania wiadomości prywatnych', { style: toastErrorStyle })
    } finally {
      isLoadingMessages.value = false
    }
  }

  async function sendPrivateMessage(message: string, recipientUuid: string) {
    try {
      await api(MessagesEndpoints.BASE, {
        method: 'POST',
        body: { message, recipient_uuid: recipientUuid },
      })
      await fetchPrivateMessages()
    } catch {
      toast.error('Błąd wysyłania wiadomości', { style: toastErrorStyle })
    }
  }

  async function selectUser(user: User) {
    selectedUser.value = user
    await fetchPrivateMessages()
  }

  function clearUser() {
    selectedUser.value = null
    privateMessages.value = []
  }

  return {
    privateMessages,
    selectedUser,
    isLoadingMessages,
    fetchPrivateMessages,
    sendPrivateMessage,
    selectUser,
    clearUser,
  }
}
