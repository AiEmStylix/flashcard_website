<script setup lang="ts">
//Shadcn components
import { login } from '@/api/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

//Logo component
import { GitHubIcon } from 'vue3-simple-icons';

//State management from pinia
import { useAuthStore } from '@/stores/authStore';
import { onMounted, reactive, ref, watch } from 'vue';

//Router
import { useRouter } from 'vue-router';

//Toast
import { toast } from 'vue-sonner';



const auth = useAuthStore();

const error = ref('');
const router = useRouter();
const isLoading = ref(false);

const formState = reactive({
  email: '',
  password: '',
});


//Function
const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;
  try {
    const response = await login(formState.email, formState.password);
    console.log(response);

    //Set accessToken to Pinia store
    auth.setAccessToken(response.accessToken);
    router.push('/admin');
    toast.success('Login successfully');
  } catch (err) {
    error.value = 'Login failed, please check your credentials';
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

watch(formState, (newVal) => {
  console.log(newVal);
});

onMounted(() => {
  auth.loadAccessToken();
});
</script>
<template>
  <div class="w-full lg:grid min-h-screen lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              v-model="formState.email"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required v-model="formState.password" />
          </div>
          <Button type="submit" class="w-full" @click="handleLogin"> Login </Button>
          <Button variant="outline" class="w-full">
             <GitHubIcon/> Login with Github </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/register">Sign Up</RouterLink>
        </div>
        <p v-if="error" class="error text-center text-red-400">{{ error }}</p>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://picsum.photos/1920/1080"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
