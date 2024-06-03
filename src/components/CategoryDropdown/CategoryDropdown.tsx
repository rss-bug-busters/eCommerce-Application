import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryNode } from '@components/CategoryDropdown/utils/categoryListToObject';
import useSearchData from '@hooks/useSearchData';
import {
  findNodeByIdInList,
  getParentsIdsList,
} from '@components/CategoryDropdown/utils/categoryTree';

function CategoryDropdown({
  nodes,
  getPreviousId,
}: {
  getPreviousId?: () => string | undefined;
  nodes: CategoryNode[];
}) {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const { category } = useSearchData();
  const [openNodeId, setOpenNodeId] = useState<string | undefined>();
  const [parentsIdsList, setParentsIdsList] = useState<string[]>([]);

  useEffect(() => {
    setParentsIdsList(getParentsIdsList(findNodeByIdInList(nodes, category ?? '')));
  }, [category, nodes]);

  useEffect(() => {
    setOpenNodeId(undefined);
  }, [category]);

  const handleToggle = (id: string) => {
    setOpenNodeId(openNodeId === id ? undefined : id);
    setSearchParameters({
      ...Object.fromEntries(searchParameters.entries()),
      category: openNodeId === id ? getPreviousId?.() ?? '' : id ?? '',
    });
  };

  return (
    <ul>
      {nodes.map((node) => (
        <li className="pl-[1rem]" key={node.id}>
          <button onClick={() => handleToggle(node.id)} type="button">
            {(openNodeId === node.id || parentsIdsList.includes(node.id)) && '>'}
            {node.category.name['en-US']}
            {node.children.length > 0 &&
              (openNodeId === node.id || parentsIdsList.includes(node.id) ? '▲' : '▼')}
          </button>
          {(openNodeId === node.id || parentsIdsList.includes(node.id)) &&
            node.children.length > 0 && (
              <CategoryDropdown getPreviousId={() => node.id} nodes={node.children} />
            )}
        </li>
      ))}
    </ul>
  );
}

export default CategoryDropdown;
