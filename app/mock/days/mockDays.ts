import type { Day } from '~/types'
import { faker } from '@faker-js/faker/locale/en'

export const mockDay: Day = {
  uuid: faker.string.uuid(),
  name: 'Pon',
  number: 21,
  slot: faker.number.int({ min: 0, max: 8 }),
}

export function generateMockDays(): Day[] {
  const names = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie']
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - today.getDay() + 1)

  return names.map((name, index) => ({
    uuid: faker.string.uuid(),
    name,
    number: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index).getDate(),
    slot: faker.number.int({ min: 0, max: 8 }),
  }))
}
