<script setup lang="ts">
import { Bell, Lock, User } from 'lucide-vue-next'
</script>

<template>
  <Tabs default-value="profile">
    <TabsList class="w-full flex gap-2">
      <div class="flex flex-row gap-6 w-full justify-center items-center">
        <Button value="profile" class="inline-1/3 justify-start gap-2"> <User /> Profil </Button>
        <Button value="password" class="flex justify-start gap-2"> <Lock /> Hasło </Button>
        <Button value="notification" class="flex justify-start gap-2">
          <Bell /> Powiadomienia
        </Button>
      </div>
    </TabsList>
    <TabsContent value="profil">
      <slot />
    </TabsContent>
  </Tabs>
</template>
