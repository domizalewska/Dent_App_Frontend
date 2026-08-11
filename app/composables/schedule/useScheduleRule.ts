import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { ScheduleRuleEndpoints, scheduleRulesKey } from '~/features/schedule'
import type { ScheduleRulePayload } from '~/types'

export const useScheduleRule = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRule(payload: ScheduleRulePayload) {
    await api(ScheduleRuleEndpoints.BASE, {
      method: 'POST',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie dodano regułę',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(scheduleRulesKey)
  }

  async function editRule(uuid: string, payload: ScheduleRulePayload) {
    await api(ScheduleRuleEndpoints.DETAILS(uuid), {
      method: 'PUT',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie edytowano regułę',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(scheduleRulesKey)
  }

  async function deleteRule(uuid: string) {
    await api(ScheduleRuleEndpoints.DETAILS(uuid), {
      method: 'DELETE',
    })
    toast('Sukces!', {
      description: 'Poprawnie usunięto regułę',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(scheduleRulesKey)
  }

  return {
    addRule,
    editRule,
    deleteRule,
  }
}
