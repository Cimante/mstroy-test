export type NodeId = string | number;

export interface TreeNode {
  id: NodeId;
  parent: NodeId | null;
  [key: string]: unknown;
}

export class TreeStore<T extends TreeNode> {
  private items: T[] = [];
  private itemsById: Map<NodeId, T> = new Map();
  private childrenById: Map<NodeId | null, Set<NodeId>> = new Map();

  constructor(items: T[]) {
    for (const item of items) this.addItem(item);
  }

  addItem(item: T) {
    if (this.itemsById.has(item.id)) {
      throw new Error('Айтем уже есть');
    }

    this.itemsById.set(item.id, item);
    this.items.push(item);

    let set = this.childrenById.get(item.parent);

    if (!set) {
      set = new Set();
      this.childrenById.set(item.parent, set);
    }

    set.add(item.id);
  }

  getAll() {
    return this.items;
  }

  getItem(id: TreeNode['id']): T | undefined {
    return this.itemsById.get(id);
  }

  getChildren(id: TreeNode['id']) {
    const ids = this.childrenById.get(id);
    if (!ids) return [];

    const result: T[] = [];

    for (const childId of ids) {
      const item = this.itemsById.get(childId);
      if (item) result.push(item);
    }

    return result;
  }

  getAllChildren(id: TreeNode['id']): T[] {
    const result: T[] = [];
    const stack: NodeId[] = [];
    const first = this.childrenById.get(id);

    if (first) stack.push(...first);

    while (stack.length) {
      const currentId = stack.pop()!;
      const item = this.itemsById.get(currentId);
      if (!item) continue;

      result.push(item);
      const children = this.childrenById.get(currentId);
      if (children) stack.push(...children);
    }

    return result;
  }

  getAllParents(id: TreeNode['id']): T[] {
    const result: T[] = [];
    let current = this.itemsById.get(id);

    while (current) {
      result.push(current);
      if (current.parent === null) break;

      current = this.itemsById.get(current.parent);
    }

    return result;
  }
}
