<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/first-attribute-linebreak -->
<script setup lang="ts">
import { toast } from '#build/ui';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import { getPaginationRowModel } from '@tanstack/vue-table'

enum UserRole {
    User = 1,
    Admin = 2,
    Moderator = 3,
}


type User = {
    id?: number;
    username: string;
    email: string;
    fullName: string;
    role: number;
    status: number;
}

const toast = useToast();

const baseUrl = 'http://localhost:8080';

const { data: user } = await useFetch<User[]>(`${baseUrl}/api/v1/user`);

const UCheckBox = resolveComponent('UCheckbox');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UInput = resolveComponent('UInput');

const displayPassword = ref(false);
const editingRowId = ref<number | null>(null);
const openModal = ref(false);
const table = useTemplateRef('table');
const rowSelection = ref<Record<string, boolean>>({});
const newUserFormState = reactive({
    username: '',
    email: '',
    fullname: '',
    password: '',
});

const pagination = ref({
    pageIndex: 0,
    pageSize: 6
})


//Computed ref
const hasSelection = computed(() => Object.keys(rowSelection.value).length > 0);

const selectedUsers = computed<User[]>(() => {
    if (!table.value?.tableApi) return [];
    return table.value.tableApi.getSelectedRowModel().rows.map(row => row.original);
});

const columns: TableColumn<User>[] = [
    {
        id: 'select',
        header: ({ table }) => h(UCheckBox, {
            modelValue: table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : table.getIsAllPageRowsSelected(),
            'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllPageRowsSelected(!!value),
            'aria-label': 'Select all'
        }),
        cell: ({ row }) =>
            h(UCheckBox, {
                modelValue: row.getIsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
                'aria-label': 'Select row'
            })
    },
    {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => `#${row.getValue('id')}`
    },
    {
        accessorKey: 'username',
        header: 'Username',
        cell: ({ row }) => h(UInput, {
            modelValue: row.getValue('username'),
            'onUpdate:modelValue': (value: string) => {
                row.original.username = value;
            }
        })
    },
    {
        accessorKey: 'email',
        header: "Email",
        cell: ({ row }) => row.getValue('email')
    },
    {
        accessorKey: 'fullName',
        header: "Fullname",
        cell: ({ row }) => row.getValue('fullName')
    },
    {
        accessorKey: 'role',
        header: "Role",
        cell: ({ row }) => {
            const roleNumber = row.getValue('role') as number;
            const roleName = UserRole[roleNumber] as keyof typeof UserRole;

            const color = {
                Admin: 'success' as const,
                Moderator: 'error' as const,
                User: 'neutral' as const
            }[roleName];
            return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
                roleName
            )
        }
    },
    {
        id: 'action'
    }
]

async function refreshUsers() {
    user.value = await $fetch(`${baseUrl}/api/v1/user`);
}

onMounted(async () => {
    await refreshUsers();
});

//Row item for dropdown
function getDropDownsActions(user: User): DropdownMenuItem[][] {
    return [
        [
            {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                    deleteUser(user.id);
                }
            }
        ]
    ]
};

async function deleteUser(userId: number) {
    try {
        await $fetch(`${baseUrl}/api/v1/user/${userId}`, {
            method: 'DELETE'
        });

        toast.add({
            title: 'User deleted successfully',
            color: 'success',
            icon: 'i-lucide-check-circle'
        });

        user.value = user.value ? user.value.filter(u => u.id !== userId) : null;
    } catch (error) {
        toast.add({
            title: 'Failed to delete user',
            color: 'error',
            icon: 'i-lucide-x-circle'
        });
        console.error(error);
    }
}

async function addUser() {
    try {
        const res = await $fetch(`${baseUrl}/api/v1/auth/register`, {
            method: "POST",
            body: {
                username: newUserFormState.username,
                password: newUserFormState.password,
                fullname: newUserFormState.fullname,
                email: newUserFormState.email,
                role: 1
            }
        });
        if (res) {
            toast.add({
                title: "Adding user successfully",
                color: 'success',
                icon: 'i-lucide-check-circle'
            });
            openModal.value = false;
        }

    } catch (error: any) {
        if (error?.statusCode === 400) {
            toast.add({
                title: 'User already exists',
                description: error?.data?.message || 'The username or email is already taken.',
                color: 'warning',
                icon: 'i-lucide-alert-circle'
            });
        } else {
            toast.add({
                title: 'Error adding user',
                description: 'Something went wrong. Please try again.',
                color: 'error',
                icon: 'i-lucide-x-circle'
            });
        }

        console.error('Add user error:', error);
    }
}


function discardModalChanges() {
    newUserFormState.username = '';
    newUserFormState.email = '';
    newUserFormState.fullname = '';
    newUserFormState.password = '';
    openModal.value = !openModal.value;
}

watch(selectedUsers, (newVal) => {
    console.log('Selected users changed:', newVal);
});

watch(newUserFormState, (newVal) => {
    console.log("Changed", newVal)
})
</script>

<template>
    <div>
        <!-- Display dialog to add new user -->
        <UModal v-model:open="openModal" title="Adding new user" :ui="{ footer: 'justify-end gap-1' }">
            <template #body>
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Username">
                        <UInput v-model="newUserFormState.username" />
                    </UFormField>

                    <UFormField label="Email">
                        <UInput v-model="newUserFormState.email" />
                    </UFormField>

                    <UFormField label="Fullname">
                        <UInput v-model="newUserFormState.fullname" />
                    </UFormField>

                    <UFormField label="Password">
                        <UInput v-model="newUserFormState.password" :type="displayPassword ? 'text' : 'password'">
                            <template #trailing>
                                <UButton color="neutral" variant="link" size="sm"
                                    :icon="displayPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    :aria-label="displayPassword ? 'Hide password' : 'Show password'"
                                    :aria-pressed="displayPassword" aria-controls="password"
                                    @click="displayPassword = !displayPassword" />
                            </template>
                        </UInput>
                    </UFormField>
                </div>
            </template>
            <template #footer>
                <UButton label="Discard changes" color="error" @click="discardModalChanges()" />
                <UButton label="Add new user" @click="addUser" />
            </template>
        </UModal>


        <div v-if="hasSelection" class="m-3 flex gap-1">
            <UButton color="primary">Save Changes</UButton>
            <UButton color="error">Delete User</UButton>
        </div>

        <!-- Input component to filter the table based on username -->
        <UInput placeholder="Search here..." class="m-2"
            :model-value="(table?.tableApi.getColumn('username')?.getFilterValue() as string)"
            @update:model-value="table?.tableApi?.getColumn('username')?.setFilterValue($event)" />
        <UButton label="Add new user" variant="soft" @click="openModal = !openModal" />
        <USeparator />
        <!-- Table section -->
        <UTable ref="table" v-model:row-selection="rowSelection" v-model:pagination="pagination" sticky
            :data="user ?? undefined" class="flex-1 max-h-[400px]" :columns="columns" :pagination-options="{
                getPaginationRowModel: getPaginationRowModel()
            }">
            <template #action-cell="{ row }">
                <UDropdownMenu :items="getDropDownsActions(row.original)">
                    <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
                </UDropdownMenu>
            </template>
        </UTable>
        <!-- Pagination -->
        <div class="flex justify-center border-t border-(--ui-border) pt-4">
            <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                :total="table?.tableApi?.getFilteredRowModel().rows.length"
                @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)" />
        </div>
    </div>
</template>