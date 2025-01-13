import test from 'ava';

import {
  processCategoriesData,
  SHOW_ON_HOME_LIMIT,
  transformCategories,
} from './categories';

const mockedCategory = {
  id: 1,
  name: 'test name',
  hasChildren: true,
  url: 'test url',
  children: [],
  Title: 'test title',
  MetaTagDescription: 'test.jpg',
};

// transformCategories tests
test('should return correct categoryListItems array', (t) => {
  const expectedCategoryListItems = [
    {
      children: [],
      image: 'test.jpg',
      showOnHome: false,
      id: 1,
      name: 'test name',
      order: 1,
    },
  ];

  t.deepEqual(transformCategories([mockedCategory]), expectedCategoryListItems);
});

test('should return correct order and showOnHome property if title contains #', (t) => {
  const categoryTree = transformCategories([
    { ...mockedCategory, Title: '2#' },
  ]);
  t.is(categoryTree[0].order, 2);
  t.is(categoryTree[0].showOnHome, true);
});

test('should return empty children array if there are no children', (t) => {
  t.deepEqual(
    transformCategories([{ ...mockedCategory, children: [] }])[0].children,
    []
  );
});

test('should return children array if children array is not empty', (t) => {
  const expectedCategoryListChildren = [
    {
      children: [],
      image: 'test.jpg',
      showOnHome: false,
      id: 1,
      name: 'test name',
      order: 1,
    },
  ];

  t.deepEqual(
    transformCategories([{ ...mockedCategory, children: [mockedCategory] }])[0]
      .children,
    expectedCategoryListChildren
  );
});

test('should return order as number from Title property', (t) => {
  t.is(transformCategories([{ ...mockedCategory, Title: '7' }])[0].order, 7);
});

test('should return order as number from id property if Title is NaN', (t) => {
  t.is(
    transformCategories([{ ...mockedCategory, Title: 'test', id: 2 }])[0].order,
    2
  );
});

test('should return categories in correct order', (t) => {
  const expectedCategoryListItems = [
    {
      children: [],
      image: 'test.jpg',
      showOnHome: false,
      id: 8,
      name: 'test name',
      order: 1,
    },
    {
      children: [],
      image: 'test.jpg',
      showOnHome: false,
      id: 2,
      name: 'test name',
      order: 2,
    },
    {
      children: [],
      image: 'test.jpg',
      showOnHome: true,
      id: 9,
      name: 'test name',
      order: 5,
    },
  ];
  t.deepEqual(
    transformCategories([
      { ...mockedCategory, Title: 'test', id: 2 },
      { ...mockedCategory, Title: '5#', id: 9 },
      { ...mockedCategory, Title: '1', id: 8 },
    ]),
    expectedCategoryListItems
  );
});

// processCategoriesData tests
test('showOnHome should be true for first five category list items', (t) => {
  const processedCategories = processCategoriesData([
    { ...mockedCategory, Title: 'test', id: 1 },
    { ...mockedCategory, Title: 'test', id: 2 },
    { ...mockedCategory, Title: 'test', id: 3 },
    { ...mockedCategory, Title: 'test', id: 4 },
    { ...mockedCategory, Title: 'test', id: 5 },
    { ...mockedCategory, Title: 'test', id: 6 },
  ]);

  for (let i = 0; i < SHOW_ON_HOME_LIMIT; i++) {
    t.is(processedCategories[i].showOnHome, true);
  }

  t.is(processedCategories[5].showOnHome, false);
});
