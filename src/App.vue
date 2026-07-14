<script setup lang="ts">
import { reactive, computed } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { TreeDataModule } from 'ag-grid-enterprise';
import { TreeStore } from '@/utils/TreeStore';
import type { TreeNode } from '@/utils/TreeStore';
import { toGridRows } from '@/utils/toGridRows';
import type { GridRow } from '@/utils/toGridRows';

ModuleRegistry.registerModules([ClientSideRowModelModule, TreeDataModule]);

const gridOptions: GridOptions<GridRow> = {
  treeData: true,
  treeDataParentIdField: 'parent',
  treeDataDisplayType: 'custom',
  getRowId: (params) => String(params.data.id)
};

const columnDefs: ColDef<GridRow>[] = [
  {
    field: 'order',
    headerName: '№ п/п',
    width: 90
  },
  {
    field: 'category',
    headerName: 'Категория',
    showRowGroup: true,
    cellRenderer: 'agGroupCellRenderer'
  },
  {
    headerName: 'Наименование',
    field: 'label'
  }
];

const items: TreeNode[] = [
  { id: 1, parent: null, label: 'Айтем 1' },
  { id: '91064cee', parent: 1, label: 'Айтем 2' },
  { id: 3, parent: 1, label: 'Айтем 3' },
  { id: 4, parent: '91064cee', label: 'Айтем 5' },
  { id: 5, parent: '91064cee', label: 'Айтем 6' },
  { id: 6, parent: '91064cee', label: 'Айтем 4' },
  { id: 7, parent: 4, label: 'Айтем 7' },
  { id: 8, parent: 4, label: 'Айтем 8' }
];

const store = reactive(new TreeStore(items));
const rowData = computed(() => toGridRows(store));
</script>

<template>
  <section style="height: 90vh">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      :grid-options="gridOptions"
      :column-defs="columnDefs"
      :rowData="rowData"
    ></ag-grid-vue>
  </section>
</template>
