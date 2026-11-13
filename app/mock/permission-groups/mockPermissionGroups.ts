import type { PermissionGroupType, PermissionType } from '~/types'

export const mockPermissions: PermissionType[] = [
  { uuid: '1', name: 'patients.index', description: 'Przeglądanie listy pacjentów' },
  { uuid: '2', name: 'patients.show', description: 'Przeglądanie profilu pacjenta' },
  { uuid: '3', name: 'patients.store', description: 'Dodawanie pacjentów' },
  { uuid: '4', name: 'patients.update', description: 'Edycja danych pacjenta' },
  { uuid: '5', name: 'patients.destroy', description: 'Usuwanie pacjentów' },
  { uuid: '6', name: 'users.index', description: 'Przeglądanie listy pracowników' },
  { uuid: '7', name: 'users.show', description: 'Przeglądanie profilu pracownika' },
  { uuid: '8', name: 'users.store', description: 'Dodawanie pracowników' },
  { uuid: '9', name: 'users.update', description: 'Edycja danych pracownika' },
  { uuid: '10', name: 'users.destroy', description: 'Usuwanie pracowników' },
  { uuid: '11', name: 'calendar.index', description: 'Przeglądanie kalendarza' },
  { uuid: '12', name: 'calendar.today', description: 'Przeglądanie dzisiejszych wizyt' },
  { uuid: '13', name: 'calendar.store', description: 'Dodawanie wizyt' },
  { uuid: '14', name: 'calendar.update', description: 'Edycja wizyt' },
  { uuid: '15', name: 'calendar.destroy', description: 'Usuwanie wizyt' },
  { uuid: '16', name: 'treatments.index', description: 'Przeglądanie usług' },
  { uuid: '17', name: 'treatments.store', description: 'Dodawanie usług' },
  { uuid: '18', name: 'treatments.update', description: 'Edycja usług' },
  { uuid: '19', name: 'treatments.destroy', description: 'Usuwanie usług' },
  { uuid: '20', name: 'statistics.index', description: 'Przeglądanie statystyk' },
  { uuid: '21', name: 'statistics.show', description: 'Przeglądanie szczegółów statystyk' },
  { uuid: '22', name: 'announcements.index', description: 'Przeglądanie ogłoszeń' },
  { uuid: '23', name: 'announcements.store', description: 'Dodawanie ogłoszeń' },
  { uuid: '24', name: 'announcements.update', description: 'Edycja ogłoszeń' },
  { uuid: '25', name: 'announcements.destroy', description: 'Usuwanie ogłoszeń' },
  { uuid: '26', name: 'schedule.index', description: 'Przeglądanie grafiku pracowników' },
  { uuid: '27', name: 'schedule.store', description: 'Dodawanie wpisów grafiku' },
  { uuid: '28', name: 'schedule.update', description: 'Edycja wpisów grafiku' },
  { uuid: '29', name: 'schedule.destroy', description: 'Usuwanie wpisów grafiku' },
  { uuid: '30', name: 'job_positions.index', description: 'Przeglądanie stanowisk' },
  { uuid: '31', name: 'job_positions.store', description: 'Dodawanie stanowisk' },
  { uuid: '32', name: 'job_positions.update', description: 'Edycja stanowisk' },
  { uuid: '33', name: 'job_positions.destroy', description: 'Usuwanie stanowisk' },
  { uuid: '34', name: 'permission_group.index', description: 'Przeglądanie grup uprawnień' },
  { uuid: '35', name: 'permission_group.show', description: 'Przeglądanie grupy uprawnień' },
  { uuid: '36', name: 'permission_group.store', description: 'Dodawanie grup uprawnień' },
  { uuid: '37', name: 'permission_group.update', description: 'Edycja grup uprawnień' },
  { uuid: '38', name: 'permission_group.destroy', description: 'Usuwanie grup uprawnień' },
  {
    uuid: '39',
    name: 'permission_group.assign_permissions',
    description: 'Przypisywanie uprawnień',
  },
]

export const mockPermissionGroups: PermissionGroupType[] = [
  {
    uuid: 'pg-1',
    name: 'Administrator',
    description: 'Pełny dostęp do systemu',
    permissions: mockPermissions,
  },
  {
    uuid: 'pg-2',
    name: 'Lekarz',
    description: 'Dostęp do kalendarza i pacjentów',
    permissions: mockPermissions.filter((p) =>
      [
        'patients.index',
        'patients.show',
        'calendar.index',
        'calendar.today',
        'calendar.store',
        'calendar.update',
      ].includes(p.name),
    ),
  },
  {
    uuid: 'pg-3',
    name: 'Recepcja',
    description: 'Zarządzanie wizytami i pacjentami',
    permissions: mockPermissions.filter(
      (p) =>
        p.name.startsWith('patients') ||
        p.name.startsWith('calendar') ||
        p.name === 'announcements.index',
    ),
  },
]
