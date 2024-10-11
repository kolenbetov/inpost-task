/**
 * Indicator used to denote that a category title should be displayed on the home page.
 */
const ShowOnHomeIndicator = '#';

/**
 * Retrieves the order value from the given category title.
 *
 * If the title includes the `ShowOnHomeIndicator` (a '#' character), the order value is extracted from the beginning of the title, before the '#' character.
 * If the title does not include the `ShowOnHomeIndicator`, or the extracted value is not a valid number, the function returns the provided `id` value instead.
 *
 * @param title The title of the category.
 * @param id The ID of the category.
 * @returns The order value extracted from the title, or the provided `id` value if the order cannot be determined.
 */
export const getOrder = (title: string, id: number): number => {
  const order = parseInt(
    title.includes(ShowOnHomeIndicator)
      ? title.split(ShowOnHomeIndicator)[0]
      : title
  );

  if (isNaN(order)) {
    return id;
  }

  return order;
};

/**
 * Determines whether a category should be displayed on the home page based on its root item status and title.
 *
 * @param isRootItem Indicates whether the category is a root item.
 * @param title The title of the category.
 * @returns `true` if the category should be displayed on the home page, `false` otherwise.
 */
export const isVisibleOnHome = (
  isRootItem: boolean,
  title: string
): boolean => {
  return isRootItem && title.includes(ShowOnHomeIndicator);
};
