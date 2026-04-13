<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Settings, User as UserIcon } from 'lucide-vue-next'
import type { User } from '~/types/user'
import { useRouter } from '#vue-router'

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
      <Avatar class="cursor-pointer">
        <AvatarImage
          src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
          alt="User avatar"
        />
        <AvatarFallback class="text-xs"
          >{{ user.first_name?.[0] }}{{ user.last_name?.[0] }}</AvatarFallback
        >
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 rounded-xl mr-4">
      <DropdownMenuLabel class="flex items-center gap-2">
        <Avatar>
          <AvatarFallback class="text-xs"
            >{{ user.first_name?.[0] }}{{ user.last_name?.[0] }}</AvatarFallback
          >
        </Avatar>
        <div class="flex flex-1 flex-col">
          <span class="text-popover-foreground">{{ user.first_name }} {{ user.last_name }}</span>
          <span class="text-muted-foreground text-xs">{{ user.email }}</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="router.push('/profile')"
          ><UserIcon class="mr-2 h-4 w-4" />Profil</DropdownMenuItem
        >
        <DropdownMenuItem @click="router.push('/setting')"
          ><Settings class="mr-2 h-4 w-4" />Ustawienia</DropdownMenuItem
        >
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" @click="logoutUser()"
          ><LogOut class="mr-2 h-4 w-4" />Wyloguj się</DropdownMenuItem
        >
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
