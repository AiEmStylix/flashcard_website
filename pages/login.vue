<script setup lang="ts">
import { toast } from '#build/ui';
import type { FormSubmitEvent } from '@nuxt/ui'

const formState = reactive({
    email: '',
    password: '',
})

const showPassword = ref(false);

const toast = useToast();

async function onSubmit() {
    toast.add({
        title: 'Success',
        description: "The form has been submitted",
        color: 'success'
    });
}
</script>
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <UForm class="flex justify-center items-center flex-col" :state="formState" @submit="onSubmit">
                <UFormField label="Email" name="email" required>
                    <UInput class="w-3xs" v-model="formState.email" />
                </UFormField>
                <UFormField label="Password" name="email" required>
                    <UInput class="w-3xs" v-model="formState.password" type="password">
                        <template #trailing>
                            <UButton color="neutral" variant="link" size="sm"
                                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                :aria-pressed="showPassword" aria-controls="password"
                                @click="showPassword = !showPassword" />
                        </template>
                    </UInput>
                </UFormField>
            </UForm>
        </div>
    </div>
</template>