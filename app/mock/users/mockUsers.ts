import type { User } from '~/types/users/typesUsers'
import { faker } from '@faker-js/faker/locale/en'

export const mockUser: User = {
  id: faker.string.uuid(),
  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  email: faker.internet.email(),
  phone: faker.phone.number(),
  last_active: faker.date.anytime(),
}

export function generateMockUsers(count: number): User[] {
  return Array.from({ length: count }).map(() => ({
    ...mockUser,
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.number(),
    last_active: faker.date.past(),
  }))
}
