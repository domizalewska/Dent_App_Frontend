import { Briefcase, Sun, Thermometer } from 'lucide-vue-next'
import type { Component } from 'vue'
import { ScheduleEntryKind } from '~/types'

interface EntryMeta {
  icon: Component
  label: string
  className: string
}

export function useScheduleEntryMeta(kind: ScheduleEntryKind): EntryMeta {
  switch (kind) {
    case ScheduleEntryKind.Work:
      return { icon: Briefcase, label: 'Praca', className: 'bg-indigo-500 border-indigo-600' }
    case ScheduleEntryKind.Vacation:
      return { icon: Sun, label: 'Urlop', className: 'bg-amber-500 border-amber-600' }
    case ScheduleEntryKind.SickLeave:
      return { icon: Thermometer, label: 'L4', className: 'bg-red-500 border-red-600' }
  }
}
