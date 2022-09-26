import { PageOptionsDto } from '../dto/pageOptions.dto';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export const toNumber = (value: string, options: ToNumberOptions = {}) => {
  const { max, min } = options;
  let res = Number.parseInt(value || `${options.default}`);

  if (min && res < min) {
    res = min;
  }

  if (max && res > max) {
    res = max;
  }

  return res;
};

export const pageOptions = ({ pageNum, pageSize }: PageOptionsDto) => {
  return {
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  };
};
