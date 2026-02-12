<script setup lang="ts"></script>
<template>
  <script setup lang="ts">
    import { Button } from '@/components/ui/button';
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from '@/components/ui/card';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  </script>

  <template>
    <div class="flex w-full max-w-sm flex-col gap-6">
      <Tabs default-value="profile">
        <TabsList>
          <TabsTrigger value="profilr"> Account </TabsTrigger>
          <TabsTrigger value="password"> Password </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <slot />
        </TabsContent>
      </Tabs>
    </div>
  </template>
</template>
