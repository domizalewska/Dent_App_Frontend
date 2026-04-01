import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
  const isAuthenticated = useAuth()

  const publicPages = ['/', '/login', '/register', '/forgot-password']
  if (!isAuthenticated.isAuthenticated.value && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }
})
