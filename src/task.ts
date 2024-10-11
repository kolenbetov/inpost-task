import { CategoryListElement, Input } from './task.types';
import { getOrder, isVisibleOnHome } from './task.utils';

const ShowOnHomeCategoriesThreshold = 5;
const MaxShowOnHomeCount = 3;

/**
 * Recursively maps an array of input data to an array of `CategoryListElement` objects, representing a category tree.
 *
 * @param data - An array of input data of type `T` that extends `Input<T>`.
 * @param isRootItem - A boolean indicating whether the current item is the root of the category tree.
 * @returns An array of `CategoryListElement` objects representing the category tree.
 */
const mapCategories = <T extends Input<T>>(
  data: T[],
  isRootItem = true
): CategoryListElement[] => {
  const result: CategoryListElement[] = [];

  data.forEach((item) => {
    const category: CategoryListElement = {
      children: [],
      id: item.id,
      name: item.name,
      image: item.MetaTagDescription,
      showOnHome: isVisibleOnHome(isRootItem, item.Title),
      order: 0,
    };

    category.order = getOrder(item.Title, item.id);

    if (item.children.length > 0) {
      category.children = mapCategories(item.children, false);
    }

    result.push(category);
  });

  return result.sort((a, b) => a.order - b.order);
};

/**
 * Generates a category tree from the provided input data.
 *
 * @param data - An array of input data of type `T` that extends `Input<T>`.
 * @returns An array of `CategoryListElement` objects representing the category tree.
 */
export const categoryTree = <T extends Input<T>>(
  data: T[]
): CategoryListElement[] => {
  const result = mapCategories(data);

  if (result.length <= ShowOnHomeCategoriesThreshold) {
    result.forEach((a) => (a.showOnHome = true));
  } else if (result.filter((x) => x.showOnHome).length === 0) {
    result.forEach((x, index) => (x.showOnHome = index < MaxShowOnHomeCount));
  }

  return result;
};
