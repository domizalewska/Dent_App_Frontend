import { toast } from 'vue-sonner'
import type { MessageGroupType, MessageType } from '~/types'
import { MessagesEndpoints, MessageGroupsEndpoints } from '~/features/messages/messages.endpoints'
import { toastErrorStyle } from '~/utils/toast'

const groups = ref<MessageGroupType[]>([])
const messages = ref<MessageType[]>([])
const selectedGroup = ref<MessageGroupType | null>(null)
const isLoadingMessages = ref(false)
const isLoadingGroups = ref(false)

export function useMessageGroups() {
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

  async function sendGroupMessage(message: string) {
    if (!selectedGroup.value) return
    try {
      await api(MessagesEndpoints.BASE, {
        method: 'POST',
        body: { message, message_group_uuid: selectedGroup.value.uuid },
      })
      await fetchMessages()
    } catch {
      toast.error('Błąd wysyłania wiadomości', { style: toastErrorStyle })
    }
  }

  async function selectGroup(group: MessageGroupType) {
    selectedGroup.value = group
    await fetchMessages()
  }

  async function createGroup(name: string, userUuids: string[]) {
    try {
      const response = await api<{ data: MessageGroupType }>(MessageGroupsEndpoints.BASE, {
        method: 'POST',
        body: { name, user_uuids: userUuids },
      })
      await fetchGroups()
      await selectGroup(response.data)
    } catch {
      toast.error('Błąd tworzenia grupy', { style: toastErrorStyle })
    }
  }

  async function renameGroup(uuid: string, name: string) {
    try {
      await api(MessageGroupsEndpoints.DETAILS(uuid), { method: 'PUT', body: { name } })
      await fetchGroups()
      if (selectedGroup.value?.uuid === uuid) {
        selectedGroup.value = { ...selectedGroup.value, name }
      }
    } catch {
      toast.error('Błąd zmiany nazwy grupy', { style: toastErrorStyle })
    }
  }

  async function deleteGroup(uuid: string) {
    try {
      await api(MessageGroupsEndpoints.DETAILS(uuid), { method: 'DELETE' })
      if (selectedGroup.value?.uuid === uuid) {
        selectedGroup.value = null
        messages.value = []
      }
      await fetchGroups()
    } catch {
      toast.error('Błąd usuwania grupy', { style: toastErrorStyle })
    }
  }

  async function addUserToGroup(groupUuid: string, userUuid: string) {
    try {
      await api(MessageGroupsEndpoints.ADD_USER(groupUuid, userUuid), { method: 'POST' })
      await fetchGroups()
    } catch {
      toast.error('Błąd dodawania użytkownika', { style: toastErrorStyle })
    }
  }

  async function removeUserFromGroup(groupUuid: string, userUuid: string) {
    try {
      await api(MessageGroupsEndpoints.REMOVE_USER(groupUuid, userUuid), { method: 'DELETE' })
      await fetchGroups()
      if (selectedGroup.value?.uuid === groupUuid) {
        selectedGroup.value = {
          ...selectedGroup.value,
          users: selectedGroup.value.users.filter((u) => u.uuid !== userUuid),
        }
      }
    } catch {
      toast.error('Błąd usuwania użytkownika', { style: toastErrorStyle })
    }
  }

  function clearGroup() {
    selectedGroup.value = null
    messages.value = []
  }

  return {
    groups,
    messages,
    selectedGroup,
    isLoadingMessages,
    isLoadingGroups,
    fetchGroups,
    fetchMessages,
    sendGroupMessage,
    selectGroup,
    createGroup,
    renameGroup,
    deleteGroup,
    addUserToGroup,
    removeUserFromGroup,
    clearGroup,
  }
}
