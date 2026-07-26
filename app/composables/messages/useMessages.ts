import { toast } from 'vue-sonner'
import type { MessageGroupType, MessageType, User } from '~/types'
import { MessagesEndpoints, MessageGroupsEndpoints } from '~/features/messages/messages.endpoints'
import { toastErrorStyle } from '~/utils/toast'

const groups = ref<MessageGroupType[]>([])
const messages = ref<MessageType[]>([])
const privateMessages = ref<MessageType[]>([])
const selectedGroup = ref<MessageGroupType | null>(null)
const selectedUser = ref<User | null>(null)
const isLoadingMessages = ref(false)
const isLoadingGroups = ref(false)

export function useMessages() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetchGroups() {
    try {
      isLoadingGroups.value = true
      const response = await api<{ data: MessageGroupType[] }>(MessageGroupsEndpoints.BASE)
      groups.value = response.data
    } catch {
      toast.error('Błąd pobierania grup', { style: toastErrorStyle })
    } finally {
      isLoadingGroups.value = false
    }
  }

  async function fetchMessages() {
    if (!selectedGroup.value) return
    try {
      isLoadingMessages.value = true
      const response = await api<MessageType[]>(
        MessageGroupsEndpoints.MESSAGES(selectedGroup.value.uuid),
      )
      messages.value = response
    } catch {
      toast.error('Błąd pobierania wiadomości', { style: toastErrorStyle })
    } finally {
      isLoadingMessages.value = false
    }
  }

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

  async function sendMessage(message: string, recipientUuid?: string) {
    if (!recipientUuid && !selectedGroup.value) return
    try {
      await api(MessagesEndpoints.BASE, {
        method: 'POST',
        body: {
          message,
          ...(recipientUuid
            ? { recipient_uuid: recipientUuid }
            : { message_group_uuid: selectedGroup.value!.uuid }),
        },
      })
      if (recipientUuid) {
        await fetchPrivateMessages()
      } else {
        await fetchMessages()
      }
    } catch {
      toast.error('Błąd wysyłania wiadomości', { style: toastErrorStyle })
    }
  }

  async function selectGroup(group: MessageGroupType) {
    selectedGroup.value = group
    selectedUser.value = null
    await fetchMessages()
  }

  async function selectUser(user: User) {
    selectedUser.value = user
    selectedGroup.value = null
    await fetchPrivateMessages()
  }

  function clearGroup() {
    selectedGroup.value = null
    selectedUser.value = null
    messages.value = []
  }

  return {
    groups,
    messages,
    privateMessages,
    selectedGroup,
    selectedUser,
    isLoadingMessages,
    isLoadingGroups,
    fetchGroups,
    fetchMessages,
    fetchPrivateMessages,
    sendMessage,
    selectGroup,
    selectUser,
    clearGroup,
  }
}
