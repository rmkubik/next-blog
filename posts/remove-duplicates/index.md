---
title: "Remove Duplicates Array Utility Function"
date: 2021-11-02
tags: javascript, remove, duplicates, utility, function
---

I had need to remove duplicate items in an array and thought it would be nice to encapsulate that logic in a `removeDuplicates` function.

## Source

```js
/**
 * Remove all duplicate entries from an array as defined
 * by a strict equality check (===). The first occurrence
 * of each item will be used for preservation of order.
 *
 * @param {[]} array
 */
function removeDuplicates(array) {
  const noDuplicates = [];

  array.forEach((item) => {
    if (!noDuplicates.includes(item)) {
      noDuplicates.push(item);
    }
  });

  return noDuplicates;
}
```

I initially chose to use JavaScript's `Set` object for ensuring uniqueness. However, it doesn't guarantee any semblance of the original ordering of the array's elements. This wasn't an issue for my use case, but I thought the above approach might be more universally useful.

An additional tweak that makes this function more broadly applicable is to inject an equality checking function called `isEqual` below.

```js
function removeDuplicatesWithEquality(array, isEqual) {
  const noDuplicates = [];

  array.forEach((item) => {
    if (
      noDuplicates.some((unDuplicatedItem) => isEqual(
        item,
        unDuplicatedItem
      ))
    ) {
      // If some item in the noDuplicates array is equal
      // to the current item, skip this item.
      return;
    }

    noDuplicates.push(item);
  });

  return noDuplicates;
}
```

## Example Usages

```js
const duplicates1 = [2, 1, 1, 2, 3, 5];
const noDuplicates1 = removeDuplicates(duplicates1);

// [2, 1, 3, 5]

const duplicates2 = [
  { val: 1 },
  { val: 1 },
  { val: 3 },
  { val: 2 }
];
const noDuplicates2 = removeDuplicatesWithEquality(
  duplicates2,
  (a, b) => a.val === b.val
);

// [
//   { val: 1 },
//   { val: 3 },
//   { val: 2 }
// ];
```
