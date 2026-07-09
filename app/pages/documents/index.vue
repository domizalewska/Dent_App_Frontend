<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { DocumentsEndpoints, documentsKey } from '~/features/documents'
import { DocumentTargetType } from '~/types'
import type { DocumentTemplate } from '~/types'
import DocumentsTable from '~/components/documents/tab/DocumentsTable.vue'
import TemplateCard from '~/components/documents/card/TemplateCard.vue'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Dokumenty', link: '/documents' }])
resetHeader()
setHeader('Dokumenty')

const activeTab = ref<'patient' | 'employee' | 'templates'>('patient')
const search = ref('')

const { data: templates, pending: templatesPending } = await useAsyncData(
  `${documentsKey}-templates`,
  () => $fetch<DocumentTemplate[]>(DocumentsEndpoints.TEMPLATES),
  { immediate: false },
)

watch(activeTab, (val) => {
  if (val === 'templates' && !templates.value) {
    templates.refresh?.()
  }
  search.value = ''
})

function onUseTemplate(uuid: string) {
  navigateTo(`/documents/new?template=${uuid}`)
}
</script>

<template>
  <Card class="h-full px-6">
    <div class="mb-5 flex items-center justify-between">
      <span />
      <Button @click="navigateTo('/documents/new')">
        Nowy dokument
        <Icon icon="lucide:plus" class="ml-1.5 size-4" />
      </Button>
    </div>

    <Tabs v-model="activeTab">
      <TabsList class="mb-5">
        <TabsTrigger value="patient">Dokumenty pacjentów</TabsTrigger>
        <TabsTrigger value="employee">Dokumenty pracownicze</TabsTrigger>
        <TabsTrigger value="templates">
          <Icon icon="lucide:file-stack" class="mr-1.5 size-3.5" />
          Szablony
        </TabsTrigger>
      </TabsList>

      <div
        v-if="activeTab !== 'templates'"
        class="mb-5 flex h-9 max-w-xs items-center gap-2 rounded-md border border-border bg-secondary px-2.5"
      >
        <Icon icon="lucide:search" class="size-4 text-muted-foreground" />
        <input
          v-model="search"
          type="text"
          placeholder="Szukaj dokumentu lub pacjenta..."
          class="w-full bg-transparent text-sm text-foreground outline-none"
        />
      </div>

      <TabsContent value="patient" class="mt-0">
        <DocumentsTable :target-type="DocumentTargetType.PATIENT" :search="search" />
      </TabsContent>

      <TabsContent value="employee" class="mt-0">
        <DocumentsTable :target-type="DocumentTargetType.EMPLOYEE" :search="search" />
      </TabsContent>

      <TabsContent value="templates" class="mt-0">
        <div v-if="templatesPending" class="py-8 text-center text-sm text-muted-foreground">
          Wczytywanie szablonów...
        </div>
        <div v-else-if="!templates?.length" class="py-8 text-center text-sm text-muted-foreground">
          Brak dostępnych szablonów
        </div>
        <div v-else class="grid grid-cols-3 gap-3">
          <TemplateCard
            v-for="template in templates"
            :key="template.uuid"
            :template="template"
            @use="onUseTemplate"
          />
        </div>
      </TabsContent>
    </Tabs>
  </Card>
</template>
