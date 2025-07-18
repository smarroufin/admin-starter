<script setup lang="ts" generic="T extends { id: string | number }">
import type { TableColumn } from '@nuxt/ui'
import type { RowSelectionState } from '@tanstack/table-core'
import { h, resolveComponent } from 'vue'

const UCheckbox = resolveComponent('UCheckbox')

const props = withDefaults(defineProps<{
  items: T[]
  selection?: RowSelectionState
  columns?: string[]
}>(), {
  columns: () => [],
})

const emit = defineEmits<{
  'new': []
  'edit': [T]
  'delete': [T[]]
  'update:selection': [RowSelectionState]
}>()

const allColumns: TableColumn<T>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'aria-label': 'Select row',
      }),
  },
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => row.getValue('id'),
  },
  ...props.columns.map(column => ({
    accessorKey: column,
    header: column,
    cell: ({ row }) => {
      const value = row.getValue(column)
      return value?.toString ? value.toString() : value
    },
  }) satisfies TableColumn<T>),
]

const columns = computed(() => {
  return props.selection ? allColumns : allColumns.slice(1)
})

const rowSelection = computed({
  get: () => props.selection ?? {},
  set: value => emit('update:selection', value),
})
</script>

<template>
  <UTable
    v-model:row-selection="rowSelection"
    :data="items"
    :columns="columns"
    class="h-full"
  />
</template>
