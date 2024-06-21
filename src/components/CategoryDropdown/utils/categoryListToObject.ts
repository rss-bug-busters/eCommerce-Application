import { Category } from '@commercetools/platform-sdk';

export interface CategoryNode {
  category: Category;
  children: CategoryNode[];
  id: string;
  parent?: CategoryNode;
}

export default function categoryListToObject(
  categoryList: Category[]
): Record<string, CategoryNode> {
  const idToNodeMap = {} as Record<string, CategoryNode>;

  for (const category of categoryList) {
    idToNodeMap[category.id] = { id: category.id, children: [], category };
  }

  return idToNodeMap;
}
