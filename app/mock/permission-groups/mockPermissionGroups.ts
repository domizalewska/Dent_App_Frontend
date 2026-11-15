import type { PermissionGroupType, PermissionType } from '~/types'

export const mockPermissions: PermissionType[] = [
  { uuid: '1', resource: 'patients', type: 'index', created_at: '', updated_at: '' },
  { uuid: '2', resource: 'patients', type: 'show', created_at: '', updated_at: '' },
  { uuid: '3', resource: 'patients', type: 'store', created_at: '', updated_at: '' },
  { uuid: '4', resource: 'patients', type: 'update', created_at: '', updated_at: '' },
  { uuid: '5', resource: 'patients', type: 'destroy', created_at: '', updated_at: '' },
  { uuid: '6', resource: 'users', type: 'index', created_at: '', updated_at: '' },
  { uuid: '7', resource: 'users', type: 'show', created_at: '', updated_at: '' },
  { uuid: '8', resource: 'users', type: 'store', created_at: '', updated_at: '' },
  { uuid: '9', resource: 'users', type: 'update', created_at: '', updated_at: '' },
  { uuid: '10', resource: 'users', type: 'destroy', created_at: '', updated_at: '' },
  { uuid: '11', resource: 'calendar', type: 'index', created_at: '', updated_at: '' },
  { uuid: '12', resource: 'calendar', type: 'store', created_at: '', updated_at: '' },
  { uuid: '13', resource: 'calendar', type: 'update', created_at: '', updated_at: '' },
  { uuid: '14', resource: 'calendar', type: 'destroy', created_at: '', updated_at: '' },
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
      ['patients.index', 'patients.show', 'calendar.index'].includes(`${p.resource}.${p.type}`),
    ),
  },
]
