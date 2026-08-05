import { Briefcase, Sun, Thermometer } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { ScheduleEntryKind } from '~/types'

interface EntryMeta {
  icon: Component
  label: string
  className: string
}

export function useScheduleEntryMeta(kind: ScheduleEntryKind): EntryMeta {
  switch (kind) {
    case 'work':
      return { icon: Briefcase, label: 'Praca', className: 'bg-indigo-500 border-indigo-600' }
    case 'vacation':
      return { icon: Sun, label: 'Urlop', className: 'bg-amber-500 border-amber-600' }
    case 'sick_leave':
      return { icon: Thermometer, label: 'L4', className: 'bg-red-500 border-red-600' }
  }
}
