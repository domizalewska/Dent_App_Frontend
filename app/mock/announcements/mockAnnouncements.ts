import type { Announcement } from '~/types'
import { faker } from '@faker-js/faker/locale/pl'

faker.seed(42)

function generateMockAnnouncement(): Announcement {
  return {
    uuid: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraph(),
    published_at: faker.date.recent({ days: 30 }).toISOString(),
    author: {
      uuid: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      is_active: true,
      is_admin: false,
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      competencies: [],
      job_position: { uuid: faker.string.uuid(), name: 'Lekarz', f_name: 'Lekarka', m_name: 'Lekarz' },
    },
  }
}

export const mockAnnouncements: Announcement[] = Array.from({ length: 5 }, generateMockAnnouncement)
