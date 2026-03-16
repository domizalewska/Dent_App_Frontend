<script setup lang="ts">
import { Bell, Lock, User } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full">
    <Tabs default-value="profile" class="w-full">
      <TabsList class="flex w-full gap-4">
        <TabsTrigger value="profile" as-child>
          <Button
            class="flex-1 justify-center gap-2 data-[state=active]:bg-muted"
            variant="secondary"
            size="sm"
          >
            <User /> Profil
          </Button>
        </TabsTrigger>

        <TabsTrigger value="password" as-child>
          <Button class="flex-1 justify-center gap-2" variant="secondary" size="sm">
            <Lock /> Hasło
          </Button>
        </TabsTrigger>

        <TabsTrigger value="notification" as-child>
          <Button class="flex-1 justify-center gap-2" variant="secondary" size="sm">
            <Bell /> Powiadomienia
          </Button>
        </TabsTrigger>
      </TabsList>

      <div class="flex justify-center w-full mt-4">
        <div class="w-[700px] max-w-full">
          <TabsContent value="profile">
            <ProfileCard />
          </TabsContent>

          <TabsContent value="password">
            <PasswordCard />
          </TabsContent>

          <TabsContent value="notification">
            <span>24332e23e23e3e23</span>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  </div>
</template>
