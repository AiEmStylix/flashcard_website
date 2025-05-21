<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import {toast} from 'vue-sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { RouterLink, useRouter } from 'vue-router';

import { LogOut, Moon, Settings, User } from 'lucide-vue-next';

import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const auth = useAuthStore()
const handleLogout = () => {
  auth.clearAccessToken();
  router.push('/logout');
  toast.success("Logout successfully");
}
const props = defineProps<{
  user: {
    email: string,
    username: string,
  }
}>()

</script>

<template>
  <div class="flex justify-end items-center">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Avatar>
          <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel class="p-3">
          {{ props.user.email }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User/>
            <RouterLink to="/account">Account</RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings/>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon/>
            Dark Mode
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem @click="handleLogout">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
