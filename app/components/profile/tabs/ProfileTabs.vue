<script setup lang="ts">
import type { User } from '~/types'
import CompetenciesCard from '~/components/profile/card/CompetenciesCard.vue'
import ProfileBackgroundPicture from '~/components/profile/header/ProfileBackgroundPicture.vue'

interface Props {
  user: User
}

defineProps<Props>()

const tabs = [
  { name: 'Dane podstawowe', value: 'info' },
  { name: 'Kompetencje', value: 'competencies' },
  { name: 'Archiwum wizyt', value: 'visits' },
  { name: 'Hasło', value: 'password' },
]
</script>

<template>
  <Tabs default-value="info" class="w-full gap-0">
    <Card class="overflow-hidden pt-0 rounded-b-none border-b-0">
      <ProfileBackgroundPicture :user="user" />
      <CardContent class="relative px-6 pb-0">
        <ProfileHeaderComponent :user="user" />
      </CardContent>
      <div class="px-6 pt-2">
        <TabsList variant="line" class="w-full">
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab.value"
            :value="tab.value"
            class="flex-1"
          >
            {{ tab.name }}
          </TabsTrigger>
        </TabsList>
      </div>
    </Card>

    <TabsContent value="info">
      <ProfileCard :user="user" />
    </TabsContent>
    <TabsContent value="competencies">
      <CompetenciesCard :user="user" />
    </TabsContent>
    <TabsContent value="password">
      <PasswordCard />
    </TabsContent>
  </Tabs>
</template>
