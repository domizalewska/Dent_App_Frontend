declare module '#app' {
  interface PageMeta {
    requiredPermissions?: string[]
    somePermissions?: string[]
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    requiredPermissions?: string[]
    somePermissions?: string[]
  }
}

export {}
