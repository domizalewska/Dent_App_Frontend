import type { Receipt } from '~/types/receipt/receipt.type'
import { faker } from '@faker-js/faker/locale/pl'

const statuses = ['active', 'used', 'expired', 'cancelled'] as const

const receiptNames = [
  'Recepta na antybiotyki',
  'Recepta na środki przeciwbólowe',
  'Recepta na leki przeciwzapalne',
  'Recepta na płukankę antyseptyczną',
  'Recepta na żel znieczulający',
]

function generateMockReceipt(): Receipt {
  return {
    uuid: faker.string.uuid(),
    name: faker.helpers.arrayElement(receiptNames),
    code: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
    status: faker.helpers.arrayElement(statuses),
    created_at: faker.date.past({ years: 1 }).toISOString(),
    updated_at: faker.date.recent({ days: 30 }).toISOString(),
    patient: null as any,
    doctor: {
      uuid: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      pesel: faker.string.numeric(11),
      is_active: true,
      is_admin: false,
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      competencies: [],
      street: faker.location.street(),
      house_number: faker.location.buildingNumber(),
      apartment_number: faker.location.buildingNumber(),
      postal_code: faker.location.zipCode('##-###'),
      city: faker.location.city(),
    },
    place: null as any,
    medicine: null as any,
  }
}

export const mockReceipts: Receipt[] = Array.from({ length: 5 }, generateMockReceipt)
