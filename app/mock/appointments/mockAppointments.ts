import { faker } from '@faker-js/faker/locale/pl'
import type { AppointmentDoctor, AppointmentStatus, AppointmentType } from '~/types'

const VISIT_NAMES = [
  'Przegląd stomatologiczny',
  'Leczenie kanałowe',
  'Ekstrakcja zęba',
  'Wybielanie zębów',
  'Zakładanie plomby',
  'Czyszczenie kamienia',
  'Konsultacja ortodontyczna',
  'Zdjęcie rentgenowskie',
  'Zakładanie korony',
  'Leczenie paradontozy',
]

const SPECIALIZATIONS = [
  'Stomatolog ogólny',
  'Ortodonta',
  'Periodontolog',
  'Endodonta',
  'Chirurg stomatologiczny',
]

export const mockDoctors: AppointmentDoctor[] = [
  {
    uuid: 'doc-001',
    first_name: 'Anna',
    last_name: 'Kowalska',
    specialization: 'Stomatolog ogólny',
  },
  {
    uuid: 'doc-002',
    first_name: 'Marek',
    last_name: 'Nowak',
    specialization: 'Ortodonta',
  },
  {
    uuid: 'doc-003',
    first_name: 'Katarzyna',
    last_name: 'Wiśniewska',
    specialization: 'Endodonta',
  },
]

export const PATIENT_UUIDS = {
  JAN_KOWALSKI: 'pat-0001-jan-kowalski',
  MARIA_NOWAK: 'pat-0002-maria-nowak',
  PIOTR_WISNIEWSKI: 'pat-0003-piotr-wisniewski',
}

export const mockAppointments: AppointmentType[] = [
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.JAN_KOWALSKI,
    doctor: mockDoctors[0],
    name: 'Przegląd stomatologiczny',
    description: 'Rutynowy przegląd półroczny',
    date: new Date('2026-05-20T10:00:00'),
    duration_minutes: 30,
    status: 'scheduled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.JAN_KOWALSKI,
    doctor: mockDoctors[1],
    name: 'Konsultacja ortodontyczna',
    description: 'Omówienie planu leczenia aparatem',
    date: new Date('2026-06-03T14:00:00'),
    duration_minutes: 45,
    status: 'scheduled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.JAN_KOWALSKI,
    doctor: mockDoctors[0],
    name: 'Czyszczenie kamienia',
    description: 'Skaling ultradźwiękowy',
    date: new Date('2026-04-10T09:00:00'),
    duration_minutes: 60,
    status: 'completed',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.JAN_KOWALSKI,
    doctor: mockDoctors[2],
    name: 'Leczenie kanałowe',
    description: 'Leczenie kanałowe zęba 36',
    date: new Date('2026-03-15T11:30:00'),
    duration_minutes: 90,
    status: 'completed',
  },

  // Maria Nowak
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.MARIA_NOWAK,
    doctor: mockDoctors[0],
    name: 'Zakładanie plomby',
    description: 'Plomba kompozytowa ząb 14',
    date: new Date('2026-05-12T08:30:00'),
    duration_minutes: 45,
    status: 'scheduled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.MARIA_NOWAK,
    doctor: mockDoctors[2],
    name: 'Ekstrakcja zęba',
    description: 'Usunięcie zęba mądrości 48',
    date: new Date('2026-05-28T15:00:00'),
    duration_minutes: 60,
    status: 'scheduled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.MARIA_NOWAK,
    doctor: mockDoctors[0],
    name: 'Przegląd stomatologiczny',
    description: 'Przegląd roczny',
    date: new Date('2026-02-20T10:00:00'),
    duration_minutes: 30,
    status: 'completed',
  },

  // Piotr Wiśniewski
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.PIOTR_WISNIEWSKI,
    doctor: mockDoctors[1],
    name: 'Wybielanie zębów',
    description: 'Wybielanie nakładkowe',
    date: new Date('2026-06-10T13:00:00'),
    duration_minutes: 60,
    status: 'scheduled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.PIOTR_WISNIEWSKI,
    doctor: mockDoctors[0],
    name: 'Zakładanie korony',
    description: 'Korona ceramiczna na zębie 21',
    date: new Date('2026-04-25T09:30:00'),
    duration_minutes: 75,
    status: 'cancelled',
  },
  {
    uuid: faker.string.uuid(),
    patient_uuid: PATIENT_UUIDS.PIOTR_WISNIEWSKI,
    doctor: mockDoctors[2],
    name: 'Leczenie paradontozy',
    description: 'Kiretaż zamknięty',
    date: new Date('2026-03-05T11:00:00'),
    duration_minutes: 90,
    status: 'completed',
  },
]

export function getAppointmentsByPatient(patientUuid: string): AppointmentType[] {
  return mockAppointments.filter((a) => a.patient_uuid === patientUuid)
}

export function getUpcomingAppointments(patientUuid: string, limit = 2): AppointmentType[] {
  const now = new Date()
  return mockAppointments
    .filter((a) => a.patient_uuid === patientUuid && a.status === 'scheduled' && a.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, limit)
}

export function getLastAppointment(patientUuid: string): AppointmentType | undefined {
  const now = new Date()
  return mockAppointments
    .filter((a) => a.patient_uuid === patientUuid && a.status === 'completed' && a.date < now)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0]
}

export function generateMockAppointments(patientUuid: string, count: number): AppointmentType[] {
  const statuses: AppointmentStatus[] = ['scheduled', 'completed', 'cancelled']
  return Array.from({ length: count }).map(() => ({
    uuid: faker.string.uuid(),
    patient_uuid: patientUuid,
    doctor: {
      uuid: faker.string.uuid(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      specialization: faker.helpers.arrayElement(SPECIALIZATIONS),
    },
    name: faker.helpers.arrayElement(VISIT_NAMES),
    description: faker.lorem.sentence(),
    date: faker.date.between({ from: new Date('2025-01-01'), to: new Date('2026-12-31') }),
    duration_minutes: faker.helpers.arrayElement([30, 45, 60, 75, 90]),
    status: faker.helpers.arrayElement(statuses),
  }))
}
