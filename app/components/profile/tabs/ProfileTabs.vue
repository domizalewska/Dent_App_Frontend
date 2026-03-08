<script setup lang="ts">
import { Bell, Lock, User } from 'lucide-vue-next'
</script>

<template>
  <div class="w-full">
    <Tabs default-value="profile">
      <TabsList class="flex w-full gap-4">
        <TabsTrigger value="profile" as-child>
          <Button
            class="w-1/3 justify-center gap-2 data-[state=active]:bg-muted"
            variant="secondary"
            size="sm"
          >
            <User /> Profil
          </Button>
        </TabsTrigger>

        <TabsTrigger value="password" as-child>
          <Button class="w-1/3 justify-center gap-2" variant="secondary" size="sm">
            <Lock /> Hasło
          </Button>
        </TabsTrigger>

        <TabsTrigger value="notification" as-child>
          <Button class="w-1/3 justify-center gap-2" variant="secondary" size="sm">
            <Bell /> Powiadomienia
          </Button>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <span>dsfsdffdsfsdsf</span>
      </TabsContent>

      <TabsContent value="password">
        <span>22324cr243</span>
      </TabsContent>

      <TabsContent value="notification">
        <span>24332e23e23e3e23</span>
      </TabsContent>
    </Tabs>
  </div>
</template>
