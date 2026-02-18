<script setup lang="ts"></script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Account</CardTitle>
      <CardDescription>
        Make changes to your account here. Click save when you're done.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="grid gap-3">
        <Label for="tabs-demo-name">Name</Label>
        <Input id="tabs-demo-name" default-value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Username</Label>
        <Input id="tabs-demo-username" default-value="@peduarte" />
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save changes</Button>
    </CardFooter>
  </Card>
</template>
