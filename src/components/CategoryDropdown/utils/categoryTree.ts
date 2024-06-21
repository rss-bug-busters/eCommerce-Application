import { Category } from '@commercetools/platform-sdk';
import categoryListToObject, {
  CategoryNode,
} from '@components/CategoryDropdown/utils/categoryListToObject';

export function categoryTree(categories: Category[]): CategoryNode[] {
  const roots: CategoryNode[] = [];

  const idToNodeMap = categoryListToObject(categories);

  for (const { id, parent } of categories) {
    const node = idToNodeMap[id];

    if (node) {
      if (parent) {
        const parentNode = idToNodeMap[parent.id];

        if (parentNode) {
          node.parent = parentNode;
          parentNode.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }
  }

  return roots;
}

const findNodeById = (root: CategoryNode, id: string): CategoryNode | undefined => {
  if (root.id === id) {
    return root;
  }

  for (const child of root.children) {
    if (findNodeById(child, id)) {
      return findNodeById(child, id);
    }
  }

  return undefined;
};

export const findNodeByIdInList = (
  list: CategoryNode[],
  id: string
): CategoryNode | undefined => {
  for (const item of list) {
    const node = findNodeById(item, id);

    if (node) {
      return node;
    }
  }

  return undefined;
};

// from self to root
export const getParentsIdsList = (
  node: CategoryNode | undefined,
  parents: string[] = []
): string[] => {
  if (!node) {
    return parents;
  }

  parents.push(node.id);

  if (node.parent) {
    getParentsIdsList(node.parent, parents);
  }

  return parents;
};
