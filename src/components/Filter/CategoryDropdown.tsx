import { CategoryNode } from '@components/Filter/utils/createCategoryTree';
import { SetStateAction, Dispatch, useState } from 'react';

function CategoryDropdown({
  nodes,
  selectCategory,
  getPreviousId,
}: {
  getPreviousId?: () => string | undefined;
  nodes: CategoryNode[];
  selectCategory: Dispatch<SetStateAction<string | undefined>>;
}) {
  const [openNodeId, setOpenNodeId] = useState<string | undefined>();

  const handleToggle = (id: string) => {
    setOpenNodeId(openNodeId === id ? undefined : id);
    selectCategory(openNodeId === id ? getPreviousId?.() ?? undefined : id);
  };

  return (
    <ul>
      {nodes.map((node) => (
        <li className="pl-[2rem]" key={node.id}>
          <button onClick={() => handleToggle(node.id)} type="button">
            {openNodeId === node.id && '>'}
            {node.category.name['en-US']}
            {`(${node.id})`}{' '}
            {node.children.length > 0 && (openNodeId === node.id ? '▲' : '▼')}
          </button>

          {openNodeId === node.id && node.children.length > 0 && (
            <CategoryDropdown
              getPreviousId={() => node.id}
              selectCategory={selectCategory}
              nodes={node.children}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CategoryDropdown;
