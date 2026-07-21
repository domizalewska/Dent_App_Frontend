import type { MessageGroupType, MessageType } from '~/types'
import { mockMessageGroups, mockMessagesByGroup } from '~/mock/messages/mockMessages'

const groups = ref<MessageGroupType[]>([...mockMessageGroups])
const messages = ref<MessageType[]>([])
const selectedGroup = ref<MessageGroupType | null>(null)
const isLoadingMessages = ref(false)

export function useMessages() {
  function fetchGroups() {
    groups.value = [...mockMessageGroups]
  }

  function fetchMessages() {
    if (!selectedGroup.value) return
    isLoadingMessages.value = true
    messages.value = [...(mockMessagesByGroup[selectedGroup.value.uuid] ?? [])]
    isLoadingMessages.value = false
  }

  function sendMessage(text: string) {
    if (!selectedGroup.value) return
    const { user: currentUser } = useAuth()
    if (!currentUser.value) return

    const newMsg: MessageType = {
      uuid: `msg-${Date.now()}`,
      user_uuid: currentUser.value.uuid,
      recipient_user_uuid: '',
      message_group_uuid: selectedGroup.value.uuid,
      message: text,
      created_at: new Date().toISOString(),
      user: currentUser.value,
    }
    messages.value.push(newMsg)
  }

  function selectGroup(group: MessageGroupType) {
    selectedGroup.value = group
    fetchMessages()
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
    fetchGroups,
    fetchMessages,
    sendMessage,
    selectGroup,
    clearGroup,
  }
}
