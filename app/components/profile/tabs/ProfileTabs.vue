<script setup lang="ts">
import { Bell, Lock, User } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full">
    <Tabs default-value="profile">
      <TabsList class="flex w-full gap-4">
        <Button value="profile" class="w-1/3 justify-center gap-2"> <User /> Profil </Button>
        <Button value="password" class="w-1/3 justify-center gap-2"> <Lock /> Hasło </Button>
        <Button value="notification" class="w-1/3 justify-center gap-2">
          <Bell /> Powiadomienia
        </Button>
      </TabsList>
      <TabsContent value="profile">
        tetetetete
        <slot />
      </TabsContent>
      <TabsContent value="password">
        referferfererg
        <slot />
      </TabsContent>
      <TabsContent value="notification">
        wfrerer
        <slot />
      </TabsContent>
    </Tabs>
  </div>
</template>
