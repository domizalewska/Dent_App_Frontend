import { formatDateToString } from '~/utils/formatDate'

export function useCalendarNav() {
  const currentDate = ref(new Date())
  const calendarRef = ref()
  const calendarWrapper = ref<HTMLElement | null>(null)

  onMounted(() => {
    const observer = new ResizeObserver(() => calendarRef.value?.getApi()?.updateSize())
    if (calendarWrapper.value) observer.observe(calendarWrapper.value)
    onUnmounted(() => observer.disconnect())
  })

  function goPrev() {
    calendarRef.value?.getApi().prev()
    currentDate.value = calendarRef.value?.getApi().getDate()
  }

  function goNext() {
    calendarRef.value?.getApi().next()
    currentDate.value = calendarRef.value?.getApi().getDate()
  }

  function goToday() {
    calendarRef.value?.getApi().today()
    currentDate.value = new Date()
  }

  const dateLabel = computed(() => formatDateToString(currentDate.value, 'EEEE, d MMMM yyyy'))

  const dateQuery = computed(() => ({
    date_from: currentDate.value.toISOString().slice(0, 10),
    date_to: currentDate.value.toISOString().slice(0, 10),
  }))

  return { currentDate, calendarRef, calendarWrapper, goPrev, goNext, goToday, dateLabel, dateQuery }
}
