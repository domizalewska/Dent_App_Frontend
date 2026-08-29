<script setup lang="ts">
import { LogOut, User as UserIcon } from 'lucide-vue-next'
import type { User } from '~/types/user'
import { useRouter } from '#vue-router'
import { ProfileRoutes } from '~/types/routes'

const router = useRouter()
const { logoutUser } = useAuth()

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <BaseUserAvatar :user="user" class="cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 rounded-xl mr-4">
      <DropdownMenuLabel class="flex items-center gap-2">
        <BaseUserAvatar :user="user" />
        <div class="flex flex-1 flex-col">
          <span class="text-popover-foreground">{{ user.first_name }} {{ user.last_name }}</span>
          <span class="text-muted-foreground text-xs">{{ user.email }}</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          class="cursor-pointer"
          @click="router.push(ProfileRoutes.PROFILE(user.uuid))"
        >
          <UserIcon class="mr-2 h-4 w-4" />Profil
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem class="cursor-pointer" variant="destructive" @click="logoutUser()">
          <LogOut class="mr-2 h-4 w-4" />Wyloguj się
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
