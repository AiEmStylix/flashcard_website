import type { User } from '@/types/User';
import type { ColumnDef } from '@tanstack/vue-table';
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
    id: 'role',
    accessorKey: 'role',
    header: () => h('div', 'Role'),
    cell: ({row}) => {
      const value = `${row.getValue('role')}`;
      return h('div', value);
    }
  }
];
