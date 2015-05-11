import {module, test} from 'qunit';
import insert from 'ember-table-tree-example/utils/insert';

module('insert into array function');

test('items can be added to an array', function(assert){
  let arr = ['foo', 'bar', 'baz'];
  assert.deepEqual(insert(arr, 1, ['boo']), ['foo', 'boo', 'bar', 'baz'], "boo is added after foo");

  arr = ['foo', 'bar', 'baz'];
  assert.deepEqual(insert(arr, 1, ['boo', 'goo', 'zoo']), ['foo', 'boo', 'goo', 'zoo', 'bar', 'baz'], "multiple items are added after foo");
});
