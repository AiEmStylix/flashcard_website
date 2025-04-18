<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

//Toast service
const toast = useToast();

const formState = reactive({
    email: '',
    password: '',
})

const showPassword = ref(false);

const rememberUser = ref(false);

async function onSubmit() {
    toast.add({
        title: 'Success',
        description: "The form has been submitted",
        color: 'success'
    });
}

watch(showPassword, (newVal) => {
    console.log(newVal);
}) 
</script>
<template>

    <div class="flex min-h-screen">
        <div class="hidden lg:block w-1/2 bg-cover bg-center bg-[url(https://placehold.co/600x400)]">

        </div>
        <div class="lg:w-1/2 w-full flex items-center justify-center">
            <UContainer class="w-full max-w-md  ">
                <h2 class="text-center font-semibold text-2xl">Sign In</h2>
                <UForm :state="formState" @submit="onSubmit" class="px-2 space-y-4">
                    <UFormField label="Email" required>
                        <UInput class="w-full" v-model="formState.email" placeholder="Email" />
                    </UFormField>
                    <UFormField label="Password" required>
                        <UInput class="w-full" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                            v-model="formState.password" :ui="{ trailing: 'pe-1' }">
                            <!-- Toggle password -->
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-pressed="showPassword"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    aria-controls="password" @click="showPassword = !showPassword" />
                            </template>
                        </UInput>
                    </UFormField>

                    <div class="flex items-center justify-between gap-2 text-sm">
                        <UCheckbox v-model="rememberUser" label="Remember me" />
                        <ULink>Forget password</ULink>
                    </div>
                    <UButton class="block mx-auto mb-3 bg-orange-400" block type="submit" label="Sign in" />
                </UForm>
                <USeparator class="my-2" label="Or login with" />
                <div class="flex flex-col justify-center items-center gap-3">
                    <div class="flex gap-3">
                        <UButton icon="grommet-icons:github" color="neutral" variant="soft" />
                        <UButton icon="grommet-icons:google" color="neutral" variant="soft" />
                    </div>
                    <div>
                        <span class="hidden lg:inline">Don't have an account? </span>
                        <ULink to="#">Sign Up now?</ULink>
                    </div>
                </div>
            </UContainer>
        </div>
    </div>


</template>