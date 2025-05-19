<script setup lang="ts">
import { register } from '@/api/authService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/authStore';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

//Icon as component
import { GitHubIcon } from 'vue3-simple-icons';

const router = useRouter();

//Reactive
const formState = reactive({
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
});

const errorMessage = ref('');

const fullName = computed<string>(() => {
  return formState.firstName + ' ' + formState.lastName;
});

//State management
const auth = useAuthStore();

//Function
const handleRegister = async () => {
  errorMessage.value = '';
  try {
    const response = await register(formState.username, formState.email, formState.password, fullName.value);
    console.log(response);
    auth.setAccessToken(response.accessToken);
    router.push('/');
  } catch (err) {
    errorMessage.value = 'Register failed, please check your credentials';
    console.log(err);
  }
}

watch(fullName, (newVal: string) => {
  console.log(newVal)
})

onMounted(() => {
  auth.loadAccessToken();
})
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center px-4 bg-[url(https://picsum.photos/1920/1080)]">
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
              <Input id="first-name" placeholder="Max" required v-model="formState.firstName"/>
            </div>
            <div class="grid gap-2">
              <Label for="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required v-model="formState.lastName"/>
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="example"
              required
              v-model="formState.username"
            />
          </div>
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="test1@example.com"
              required
              v-model="formState.email"
            />
          </div>
          <div class="grid gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" v-model="formState.password"/>
          </div>
          <Button type="submit" class="w-full" @click="handleRegister">
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
        <div class="mt-4 text-center text-sm" v-if="errorMessage">{{ errorMessage }}</div>
      </CardContent>
    </Card>
  </div>
</template>
