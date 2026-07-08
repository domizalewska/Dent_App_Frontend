import { getCurrentYearMonth } from '~/utils/formatDate'

export function useStatisticsPeriod() {
  const period = useState('statistics-period', getCurrentYearMonth)
  return { period }
}
