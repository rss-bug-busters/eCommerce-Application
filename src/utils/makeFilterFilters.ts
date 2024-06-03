import { FilterAttribute } from '@utils/consts/filterAtributes';

const makeFilterFilters = ({
  attributes,
  language,
  attributesValue,
}: {
  attributes: FilterAttribute[];
  attributesValue: Record<string, string[]>;
  language: string;
}) => {
  const result: string[] = [];

  for (const { name, type } of attributes) {
    const value = attributesValue[name]?.filter((item) => item !== '');

    if (value && value?.length > 0) {
      const valueString = value.map((item) => `"${item}"`).join(',');

      switch (type) {
        case 'enum': {
          result.push(`variants.attributes.${name}.label:${valueString}`);
          break;
        }
        case 'enumLoc': {
          result.push(`variants.attributes.${name}.label.${language}:${valueString}`);
          break;
        }
        case 'simple': {
          result.push(`variants.attributes.${name}:${valueString}`);
          break;
        }
        case 'simpleLoc': {
          result.push(`variants.attributes.${name}.${language}:${valueString}`);
          break;
        }
        default: {
          result.push(`variants.attributes.${name}:${valueString}`);
          break;
        }
      }
    }
  }

  return result;
};

export default makeFilterFilters;
