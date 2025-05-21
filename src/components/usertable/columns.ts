import { UserRole, type User } from '@/types/Index';
import type { ColumnDef } from '@tanstack/vue-table';
import Badge from '@/components/ui/badge/Badge.vue';
import { h } from 'vue';


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', 'Id'),
    cell: ({row}) => {
      const id = `#${row.getValue('id')}`;
      return h('div', id);
    }
  },
  {
    id: 'username',
    accessorKey: 'username',
    header: () => h('div', 'Username'),
    cell: ({row}) => {
      const value = `${row.getValue('username')}`;
      return h('div', value)
    },
  },
  // {
  //   id: 'password',
  //   accessorKey: 'password',
  //   header: () => h('div', 'Password'),
  // },
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: () => h('div', 'Fullname'),
    cell: ({row}) => {
      const value = `${row.getValue('fullName')}`;
      return h('div', value);
    },
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => h('div', 'Email'),
    cell: ({row}) => {
      const value = row.getValue('email') as string;
      return h('div', value);
    }
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: () => h('div', 'Role'),
    cell: ({row}) => {
      const value = row.getValue('role') as UserRole;
      /*
        User = 1,
        Admin = 2,
        Moderator = 3
      */
      const colorPresets: Record<UserRole, string> = {
        [UserRole.User]: 'bg-red-400',
        [UserRole.Admin]: 'bg-green-400',
        [UserRole.Moderator]: 'bg-blue-400',
      }
      const userRole = UserRole[value];
      const colorValue = colorPresets[value];

      return h(Badge, {class: `${colorValue} text-gray-600` }, userRole);
    }
  },

];


