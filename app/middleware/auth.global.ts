import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  if (import.meta.server && !isAuthenticated.value) {
    return navigateTo('/login')
  }

  const publicPages = ['/login', '/register', '/forgot-password']
  if (!isAuthenticated.value && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }
})
