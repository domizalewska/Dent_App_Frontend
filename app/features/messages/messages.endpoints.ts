export const MessagesEndpoints = {
  BASE: '/message',
  DETAILS: (uuid: string) => `/message/${uuid}`,
  FILES: (messageUuid: string) => `/message/${messageUuid}/file`,
  FILE_DETAILS: (messageUuid: string, fileUuid: string) => `/message/${messageUuid}/file/${fileUuid}`,
  FILE_DOWNLOAD: (messageUuid: string, fileUuid: string) => `/message/${messageUuid}/file-download/${fileUuid}`,
}

export const MessageGroupsEndpoints = {
  BASE: '/message-group',
  DETAILS: (uuid: string) => `/message-group/${uuid}`,
  MESSAGES: (uuid: string) => `/message-group/${uuid}/messages`,
  ADD_USER: (groupUuid: string, userUuid: string) => `/message-group/${groupUuid}/users/${userUuid}`,
  REMOVE_USER: (groupUuid: string, userUuid: string) => `/message-group/${groupUuid}/users/${userUuid}`,
}
