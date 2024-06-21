interface Sort {
  field: string;
  needLocal: boolean;
  order: 'asc' | 'desc';
}

export default Sort;
