<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
</script>

<template>
  <div class="flex flex-row flex-wrap items-center gap-12">
    <Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger
          ><AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"
        /></DropdownMenuTrigger>
        <DropdownMenuContent class="w-36" align="start" variant="outline">
          <DropdownMenuLabel class="cursor-pointer">Profil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer">Powiadomienia</DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer">Ustawienia</DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer">Wyloguj się</DropdownMenuItem>
        </DropdownMenuContent>
        <AvatarFallback>CN</AvatarFallback>
      </DropdownMenu>
    </Avatar>
  </div>
</template>
