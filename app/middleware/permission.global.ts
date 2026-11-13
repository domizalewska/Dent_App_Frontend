export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { user } = useAuth()
  if (!user.value) return

  if (user.value.is_superuser) return

  const permissions = user.value.auth_route ?? []
  const requiredPermissions = (to.meta.requiredPermissions as string[]) ?? []
  const somePermissions = (to.meta.somePermissions as string[]) ?? []

  const hasRequired = requiredPermissions.every((p) => permissions.includes(p))

  const passesSome =
    somePermissions.length === 0 ? true : somePermissions.some((p) => permissions.includes(p))

  if (!hasRequired || !passesSome) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Permission rejected',
    })
  }
})
