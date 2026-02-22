<script setup lang="ts">
import { Bell, Lock, User } from 'lucide-vue-next'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 justify-center">
    <Tabs default-value="profile">
      <TabsList variant="line" class="text-muted-foreground rounded-lg w-full gap-6 p-0">
        <div class="flex flex-row w-full justify-center items-center">
          <div class="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline" value="profil"> <User /> Profil </Button>
          </div>
          <div class="flex flex-wrap items-center gap-2 md:flex-row pl-4 pr-4">
            <Button variant="outline" value="password" class="w-full pr-4 pl-4">
              <Lock /> Hasło
            </Button>
          </div>
          <Button variant="outline" value="notification" class="w-full">
            <Bell /> Powiadomienia</Button
          >
        </div>
      </TabsList>
      <TabsContent value="profil">
        <slot />
      </TabsContent>
    </Tabs>
  </div>
</template>
