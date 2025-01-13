import { INPUT } from './input';
import { Category } from './types/categories.types';

export const getCategories = async (): Promise<{ data: Category[] }> => ({
  data: INPUT,
});
