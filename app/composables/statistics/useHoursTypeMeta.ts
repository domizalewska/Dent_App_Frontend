import { HoursType } from '~/types'

const labels = {
  [HoursType.PRACA]: 'Praca',
  [HoursType.L4]: 'L4',
  [HoursType.URLOP]: 'Urlop',
}

const icons = {
  [HoursType.PRACA]: 'lucide:briefcase',
  [HoursType.L4]: 'lucide:thermometer',
  [HoursType.URLOP]: 'lucide:umbrella',
}

const solidBg = {
  [HoursType.PRACA]: 'bg-emerald-500',
  [HoursType.L4]: 'bg-amber-500',
  [HoursType.URLOP]: 'bg-blue-500',
}

const solidText = {
  [HoursType.PRACA]: 'text-emerald-500',
  [HoursType.L4]: 'text-amber-500',
  [HoursType.URLOP]: 'text-blue-500',
}

const badgeStyles = {
  [HoursType.PRACA]: 'bg-emerald-500/15 text-emerald-400',
  [HoursType.L4]: 'bg-amber-500/15 text-amber-400',
  [HoursType.URLOP]: 'bg-blue-500/15 text-blue-400',
}

const types = [HoursType.PRACA, HoursType.L4, HoursType.URLOP] as const

export function useHoursTypeMeta() {
  return { types, labels, icons, solidBg, solidText, badgeStyles }
}
