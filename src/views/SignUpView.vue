<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

//Icon as component
import { GitHubIcon } from 'vue3-simple-icons';
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center px-4">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label for="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" class="w-full">
            Create an account
          </Button>
          <Button variant="outline" class="w-full">
            <GitHubIcon/>
            Sign up with GitHub
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <RouterLink to="/login" class="font-bold">Login</RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
