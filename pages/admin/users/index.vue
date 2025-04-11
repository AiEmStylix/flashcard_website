<script setup lang="ts">
import { toast } from '#build/ui';
import type { DropdownMenuItem, TableColumn, TableRow } from '@nuxt/ui';

enum UserRole {
    User = 1,
    Admin = 2,
    Moderator = 3,
}

enum UserStatus {
    Active = 1,
    Inactive = 2,
    Suspended = 3
}

type User = {
    id: number;
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

const table = useTemplateRef('table');
const rowSelection = ref<Record<string, boolean>>({});

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
        accessorKey: 'status',
        header: "Status",
        cell: ({ row }) => {
            const statusNumber = row.getValue('status') as number;
            const statusName = UserStatus[statusNumber] as keyof typeof UserStatus;

            const color = {
                Active: 'success' as const,
                Inactive: 'neutral' as const,
                Suspended: "error" as const
            }[statusName];
            return h(UBadge, { class: 'capitalize', variant: 'soft', color }, () =>
                statusName
            )
        }

    },
    {
        id: 'action'
    }
]


//Row item for dropdown
function getDropDownsActions(user: User): DropdownMenuItem[][] {
    return [
        [
            {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => {
                    toast.add({
                        title: "Delete user successfully",
                        color: "success",
                        icon: 'i-lucide-circle-check'
                    })
                }
            }
        ]
    ]
};


watch(selectedUsers, (newVal) => {
    console.log('Selected users changed:', newVal);
});

</script>

<template>
    <div>
        <div v-if="hasSelection" class="m-3 flex gap-1">
            <UButton color="primary">Save Changes</UButton>
            <UButton color="error">Delete User</UButton>
        </div>

        <!-- Input component to filter the table based on username -->
        <UInput placeholder="Search here..." class="m-2"
            :model-value="(table?.tableApi.getColumn('username')?.getFilterValue() as string)"
            @update:model-value="table?.tableApi?.getColumn('username')?.setFilterValue($event)" />
        <USeparator />
        <UTable ref="table" v-model:row-selection="rowSelection" sticky :data="user ?? undefined"
            class="flex-1 max-h-[312px]" :columns="columns">
            <template #action-cell="{ row }">
                <UDropdownMenu :items="getDropDownsActions(row.original)">
                    <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
                </UDropdownMenu>
            </template>
        </UTable>

    </div>
</template>