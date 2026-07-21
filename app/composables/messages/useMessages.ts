import type { MessageGroupType, MessageType } from '~/types'
import { MessageGroupsEndpoints, messageGroupsKey } from '~/features/messages'

const groups = ref<MessageGroupType[]>([])
const messages = ref<MessageType[]>([])
const selectedGroup = ref<MessageGroupType | null>(null)
const isLoadingMessages = ref(false)

export function useMessages() {
  const { $api, $echo } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetchGroups() {
    const data = await api<MessageGroupType[]>(MessageGroupsEndpoints.BASE)
    groups.value = data
  }

  async function fetchMessages() {
    if (!selectedGroup.value) return
    isLoadingMessages.value = true
    try {
      const data = await api<MessageType[]>(
        MessageGroupsEndpoints.MESSAGES(selectedGroup.value.uuid),
      )
      messages.value = data
    } finally {
      isLoadingMessages.value = false
    }
  }

  async function sendMessage(text: string) {
    if (!selectedGroup.value) return
    await api(MessageGroupsEndpoints.MESSAGES(selectedGroup.value.uuid), {
      method: 'POST',
      body: { message: text },
    })
  }

  async function selectGroup(group: MessageGroupType) {
    if (selectedGroup.value?.uuid === group.uuid) return
    stopListening()
    selectedGroup.value = group
    await fetchMessages()
    startListening()
  }

  function clearGroup() {
    stopListening()
    selectedGroup.value = null
    messages.value = []
  }

  function startListening() {
    if (!selectedGroup.value || !$echo) return
    $echo
      .private(`message-group.${selectedGroup.value.uuid}`)
      .listen('.MessageSent', (e: MessageType) => {
        messages.value.push(e)
      })
  }

  function stopListening() {
    if (!selectedGroup.value || !$echo) return
    $echo.leave(`message-group.${selectedGroup.value.uuid}`)
  }

  return {
    groups,
    messages,
    selectedGroup,
    isLoadingMessages,
    fetchGroups,
    sendMessage,
    selectGroup,
    clearGroup,
  }
}
