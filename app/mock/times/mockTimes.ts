import type { Time } from '~/types/times'
import { faker } from '@faker-js/faker/locale/en'

export function generateMockTimes(): Time[] {
  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ]

  return hours.map((time) => ({
    uuid: faker.string.uuid(),
    time,
  }))
}
