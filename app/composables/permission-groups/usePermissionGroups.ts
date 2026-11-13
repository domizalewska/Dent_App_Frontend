import { toast } from 'vue-sonner'
import type { PermissionGroupPayload } from '~/types'
import { PermissionGroupsEndpoints } from '~/features/permission-groups'
import { permissionGroupsKey, permissionGroupDetailKey } from '~/features/permission-groups'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export const usePermissionGroups = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addGroup(payload: PermissionGroupPayload) {
    return toast.promise(
      api(PermissionGroupsEndpoints.BASE, { method: 'POST', body: payload }).then(() =>
        refreshNuxtData(permissionGroupsKey),
      ),
      {
        success: { message: 'Grupa uprawnień została dodana', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania grupy', style: toastErrorStyle },
      },
    )
  }

  async function editGroup(uuid: string, payload: PermissionGroupPayload) {
    return toast.promise(
      api(PermissionGroupsEndpoints.DETAILS(uuid), { method: 'PUT', body: payload }).then(() =>
        refreshNuxtData([permissionGroupsKey, permissionGroupDetailKey(uuid)]),
      ),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteGroup(uuid: string) {
    return toast.promise(
      api(PermissionGroupsEndpoints.DETAILS(uuid), { method: 'DELETE' }).then(() =>
        refreshNuxtData(permissionGroupsKey),
      ),
      {
        success: { message: 'Grupa uprawnień została usunięta', style: toastSuccessStyle },
        error: { message: 'Błąd podczas usuwania grupy', style: toastErrorStyle },
      },
    )
  }

  async function assignPermissions(uuid: string, permissionUuids: string[]) {
    return toast.promise(
      api(PermissionGroupsEndpoints.ASSIGN_PERMISSIONS(uuid), {
        method: 'PATCH',
        body: { permissions: permissionUuids },
      }).then(() => refreshNuxtData([permissionGroupsKey, permissionGroupDetailKey(uuid)])),
      {
        success: { message: 'Uprawnienia zostały zaktualizowane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas aktualizacji uprawnień', style: toastErrorStyle },
      },
    )
  }

  return { addGroup, editGroup, deleteGroup, assignPermissions }
}
