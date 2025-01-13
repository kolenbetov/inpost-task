import { Category, CategoryListElement } from '../types/categories.types';

export const SHOW_ON_HOME_LIMIT = 5;
const SHOW_ON_HOME_FLAG = '#';

export const processCategoriesData = (
  categories: Category[]
): CategoryListElement[] => {
  const categoryList = transformCategories(categories);

  categoryList.forEach(
    (categoryListItem, index) =>
      (categoryListItem.showOnHome = index < SHOW_ON_HOME_LIMIT)
  );

  return categoryList;
};

export const transformCategories = (
  categories: Category[]
): CategoryListElement[] =>
  categories
    .map((category) => {
      return {
        children:
          category.children.length > 0
            ? transformCategories(category.children)
            : [],
        image: category.MetaTagDescription,
        showOnHome: category.Title.includes(SHOW_ON_HOME_FLAG),
        id: category.id,
        name: category.name,
        order: isNaN(parseInt(category.Title))
          ? category.id
          : parseInt(category.Title),
      };
    })
    .sort((a, b) => a.order - b.order);
