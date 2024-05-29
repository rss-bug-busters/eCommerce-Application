import { Category } from '@commercetools/platform-sdk';

export interface CategoryNode {
  category: Category;
  children: CategoryNode[];
  id: string;
}

export default function createCategoryTree(categories: Category[]): CategoryNode[] {
  const roots: CategoryNode[] = [];

  const idToNodeMap = {} as Record<string, CategoryNode>;

  for (const category of categories) {
    idToNodeMap[category.id] = { id: category.id, children: [], category };
  }

  for (const { id, parent } of categories) {
    const node = idToNodeMap[id];

    if (node) {
      if (parent) {
        const parentNode = idToNodeMap[parent.id];

        if (parentNode) {
          parentNode.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }
  }

  return roots;
}
