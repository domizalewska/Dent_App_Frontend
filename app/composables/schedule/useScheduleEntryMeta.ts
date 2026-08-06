import { Briefcase, Sun, Thermometer } from 'lucide-vue-next'
import type { Component } from 'vue'
import { CalendarType } from '~/types'

interface EventMeta {
  icon: Component
  label: string
  className: string
}

export function useScheduleEventMeta(type: CalendarType): EventMeta {
  switch (type) {
    case CalendarType.WORK:
      return { icon: Briefcase, label: 'Praca', className: 'bg-indigo-500 border-indigo-600' }
    case CalendarType.VACATION:
      return { icon: Sun, label: 'Urlop', className: 'bg-amber-500 border-amber-600' }
    case CalendarType.SICK_LEAVE:
      return { icon: Thermometer, label: 'L4', className: 'bg-red-500 border-red-600' }
    case CalendarType.EXAMINATION:
      return { icon: Briefcase, label: 'Badanie', className: 'bg-blue-500 border-blue-600' }
    case CalendarType.OTHER:
      return { icon: Briefcase, label: 'Inne', className: 'bg-gray-500 border-gray-600' }
  }
}
