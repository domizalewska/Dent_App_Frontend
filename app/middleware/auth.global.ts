import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { isAuthenticated } = useAuth()
  const publicPages = ['/login', '/forgot-password']

  if (!isAuthenticated.value && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }
})
