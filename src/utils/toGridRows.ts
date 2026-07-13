import { TreeStore } from '@/utils/TreeStore';
import type { TreeNode } from '@/utils/TreeStore';

export type GridRow = TreeNode & {
  category: 'Группа' | 'Элемент';
};

export function toGridRows(store: TreeStore<TreeNode>): GridRow[] {
  const result: GridRow[] = [];
  let order = 1;

  function step(item: TreeNode) {
    result.push({
      ...item,
      order: order++,
      category: store.getChildren(item.id).length > 0 ? 'Группа' : 'Элемент'
    });

    for (const child of store.getChildren(item.id)) step(child);
  }

  const roots = store.getAll().filter((item) => item.parent === null);

  for (const root of roots) step(root);

  return result;
}
