export function checkPermission(permissionNames: string[]): boolean {
  const { user } = useAuth()
  if (!user.value) return false
  if (user.value.is_superuser) return true
  const authRoutes = user.value.auth_route ?? []
  return permissionNames.every((p) => authRoutes.includes(p))
}
