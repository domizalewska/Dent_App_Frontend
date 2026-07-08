import type { DailyDetailEntry, HoursDistributionItem, StatisticUser } from '~/types'
import { HoursType } from '~/types'
import { faker } from '@faker-js/faker/locale/pl'

const jobPositions = [
  { uuid: faker.string.uuid(), name: 'Lekarz', f_name: 'Lekarka', m_name: 'Lekarz' },
  { uuid: faker.string.uuid(), name: 'Higienistka', f_name: 'Higienistka', m_name: 'Higienista' },
  { uuid: faker.string.uuid(), name: 'Asystentka', f_name: 'Asystentka', m_name: 'Asystent' },
]

function generateMockStatisticUser(): StatisticUser {
  return {
    user: {
      uuid: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      is_active: true,
      is_admin: false,
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      competencies: [],
      job_position: faker.helpers.arrayElement(jobPositions),
    },
    work_hours: faker.number.int({ min: 100, max: 184 }),
    vacation_hours: faker.number.int({ min: 0, max: 40 }),
    sick_leave_hours: faker.number.int({ min: 0, max: 24 }),
  }
}

export const mockStatisticsUsers: StatisticUser[] = Array.from(
  { length: 5 },
  generateMockStatisticUser,
)

export const mockStatisticUser = mockStatisticsUsers[0]

export const mockDistribution: HoursDistributionItem[] = (() => {
  const praca = faker.number.int({ min: 100, max: 160 })
  const urlop = faker.number.int({ min: 0, max: 40 })
  const l4 = faker.number.int({ min: 0, max: 24 })
  const total = praca + urlop + l4
  return [
    { type: HoursType.PRACA, hours: praca, percent: Math.round((praca / total) * 100) },
    { type: HoursType.URLOP, hours: urlop, percent: Math.round((urlop / total) * 100) },
    { type: HoursType.L4, hours: l4, percent: Math.round((l4 / total) * 100) },
  ].filter((i) => i.hours > 0)
})()

export const mockDailyDetails: DailyDetailEntry[] = Array.from({ length: 10 }, () => ({
  date: faker.date.recent({ days: 30 }).toISOString(),
  type: faker.helpers.arrayElement(Object.values(HoursType)),
  source: faker.helpers.arrayElement(['Grafik', 'Urlop wypoczynkowy', 'Zwolnienie lekarskie']),
  hours: faker.number.int({ min: 1, max: 8 }),
}))
