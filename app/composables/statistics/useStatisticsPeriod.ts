import type { Ref } from 'vue'
import { getCurrentYearMonth } from '~/utils/formatDate'

export interface YearMonth {
  year: number
  month: number
}

export function useStatisticsPeriod(): { period: Ref<YearMonth> } {
  const period = useState<YearMonth>('statistics-period', getCurrentYearMonth)
  return { period }
}
