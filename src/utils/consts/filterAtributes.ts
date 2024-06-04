export interface FilterAttribute {
  name: string;
  type: 'simple' | 'simpleLoc' | 'enum' | 'enumLoc';
}

const filterAttributes: FilterAttribute[] = [
  {
    name: 'finishes',
    type: 'enumLoc',
  },
  {
    name: 'tags',
    type: 'enumLoc',
  },
  {
    name: 'size',
    type: 'simple',
  },
];

export default filterAttributes;
