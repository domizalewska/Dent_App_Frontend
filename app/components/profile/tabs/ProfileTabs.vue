<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { User } from '~/types'
import CalendarCard from '~/components/profile/card/CalendarCard.vue'
import DocumentsCard from '~/components/profile/card/DocumentsCard.vue'

interface Props {
  user: User
}

defineProps<Props>()

const tabs = [
  {
    name: 'Informacje',
    value: 'info',
    icon: 'solar:user-id-line-duotone',
  },
  {
    name: 'Hasło',
    value: 'password',
    icon: 'material-symbols:shield-outline',
  },
  {
    name: 'Dostępność',
    value: 'available',
    icon: 'solar:user-id-line-duotone',
  },
  {
    name: 'Umowy',
    value: 'documents',
    icon: 'material-symbols:shield-outline',
  },
]
</script>

<template>
  <Tabs default-value="info" class="w-full gap-0">
    <Card class="overflow-hidden pt-0 rounded-b-none border-b-0">
      <div
        class="h-32 bg-muted bg-cover bg-center sm:h-40"
        style="
          background-image: url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg');
        "
      />
      <CardContent class="relative px-6 pb-0">
        <ProfileHeaderComponent :user="user" />
      </CardContent>
      <div class="px-6 pt-2">
        <TabsList class="w-full">
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.value"
            class="flex items-center gap-1 px-2.5 sm:px-3"
          >
            <Icon :icon="tab.icon" />
            {{ tab.name }}
          </TabsTrigger>
        </TabsList>
      </div>
    </Card>

    <TabsContent value="info" class="mt-0">
      <ProfileCard :user="user" />
    </TabsContent>
    <TabsContent value="password" class="mt-0">
      <PasswordCard />
    </TabsContent>
    <TabsContent value="available" class="mt-0">
      <CalendarCard />
    </TabsContent>
    <TabsContent value="documents" class="mt-0">
      <DocumentsCard />
    </TabsContent>
  </Tabs>
</template>
