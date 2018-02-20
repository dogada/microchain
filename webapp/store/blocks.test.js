/* global test, expect */

import {addBlocks} from './blocks'

function reduce (action, state) {
  return action.reducer(state, ...action.payload)
}

test('store/blocks addBlocks', () => {
  expect(reduce(addBlocks([]), {blocks: []}).blocks).toEqual([])
  expect(reduce(addBlocks([{index: 1}]), {blocks: []}).blocks).toEqual([{index: 1}])
  expect(reduce(addBlocks([{index: 2}]), {blocks: [{index: 1}]}).blocks)
    .toEqual([{index: 2}, {index: 1}])
})
