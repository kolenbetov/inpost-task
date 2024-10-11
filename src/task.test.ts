import test from 'ava';

import { CORRECT } from './correctResult';
import { INPUT } from './input';
import { Category } from './mockedApi';
import { categoryTree } from './task';
import { getOrder, isVisibleOnHome } from './task.utils';

test('should return sorted category tree', (t) => {
  const result = categoryTree<Category>(INPUT);
  t.deepEqual(result, CORRECT);
});

test('should return correct order', (t) => {
  t.is(getOrder('1', 1), 1);
  t.is(getOrder('1#', 2), 1);
  t.is(getOrder('Test title', 5), 5);
  t.is(getOrder('Test title#', 10), 10);
  t.is(getOrder('', 15), 15);
});

test('should be visible on home', (t) => {
  t.true(isVisibleOnHome(true, 'Test title#'));
  t.false(isVisibleOnHome(true, 'Test title'));
  t.false(isVisibleOnHome(false, 'Test title#'));
  t.false(isVisibleOnHome(false, 'Test title'));
});
