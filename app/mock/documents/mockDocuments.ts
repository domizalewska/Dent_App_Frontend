import type { Document } from '~/types'
import { faker } from '@faker-js/faker/locale/en'

const categories = ['Zgoda', 'Formularz', 'Plan leczenia', 'Wywiad'] as const
const statuses = ['active', 'pending', 'archived'] as const
const fileTypes = ['pdf', 'word'] as const
const titles = [
  'Zgoda na leczenie ortodontyczne',
  'Zgoda na znieczulenie',
  'Formularz wywiadu medycznego',
  'Plan leczenia implantologicznego',
  'Zgoda na wykonanie zdjęcia RTG',
  'Wywiad alergiczny',
  'Formularz rejestracyjny pacjenta',
  'Plan leczenia kanałowego',
]

export function generateMockDocuments(count = 4): Document[] {
  return Array.from({ length: count }).map(() => ({
    uuid: faker.string.uuid(),
    title: faker.helpers.arrayElement(titles),
    status: faker.helpers.arrayElement(statuses),
    category: faker.helpers.arrayElement(categories),
    patient: `${faker.person.firstName()} ${faker.person.lastName()}`,
    fileType: faker.helpers.arrayElement(fileTypes),
    fileSize: `${faker.number.int({ min: 50, max: 5000 })} KB`,
  }))
}
