import { FilterAttribute } from '@utils/consts/filterAtributes';

const makeFilterFacets = (filterAttributes: FilterAttribute[], language: string) =>
  filterAttributes.map(({ name, type }) => {
    switch (type) {
      case 'enum': {
        return `variants.attributes.${name}.label as ${name}`;
      }
      case 'enumLoc': {
        return `variants.attributes.${name}.label.${language} as ${name}`;
      }
      case 'simple': {
        return `variants.attributes.${name} as ${name}`;
      }
      case 'simpleLoc': {
        return `variants.attributes.${name}.${language} as ${name}`;
      }
      default: {
        return `variants.attributes.${name} as ${name}`;
      }
    }
  });

export default makeFilterFacets;
