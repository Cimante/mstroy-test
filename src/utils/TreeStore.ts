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
}
