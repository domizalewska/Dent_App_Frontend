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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
        <AvatarFallback>CN</AvatarFallback>
      </DropdownMenu>
    </Avatar>
  </div>
</template>
