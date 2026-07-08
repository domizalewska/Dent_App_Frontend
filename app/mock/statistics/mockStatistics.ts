import type { StatisticUser } from '~/types'
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

export const mockStatisticsUsers: StatisticUser[] = Array.from({ length: 5 }, generateMockStatisticUser)
