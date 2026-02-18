<script setup lang="ts"></script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 justify-center items-center">
    <Tabs default-value="profile">
      <TabsList variant="line">
        <TabsTrigger value="profil"> Account </TabsTrigger>
        <TabsTrigger value="password"> Password </TabsTrigger>
        <TabsTrigger value="notification"> Password </TabsTrigger>
      </TabsList>
      <TabsContent value="profil">
        <slot />
      </TabsContent>
    </Tabs>
  </div>
</template>
