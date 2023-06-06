---
title: "Reduce Entries: Array Utility Function"
date: 2023-06-05
tags: javascript, arrays, utils
---

If you've ever needed to break an object into its entries via JavaScript's `Object.entries` function, you'll sometimes need to put it back together again. I've needed this often enough that I encapsulated this functionality into a little utility function called `reduceEntries`.

## Source

```js
function reduceEntries(entries) {
  return entries.reduce(
    (object, [key, value]) => ({
      ...object,
      [key]: value,
    }),
    {}
  );
}
```

## Example Usage

Here's a contrived example usage. There are more efficient ways to accomplish the example I've used below. <Note icon="🤷‍♀️">There are also only 3 keys on my example object... so who needs efficiency!</Note>

```js
// We have an object and we want to increment
// the value of every property on the object.
const object = {
  key1: 3,
  key2: 4,
  key3: 5,
};

// Convert all properties on the object to entries
// so we can iterate over them.
const objectEntries = Object.entries(object);

// Increment each entry's value by 1.
const incrementedEntries = objectEntries.map(([key, value]) => [
  key,
  value + 1,
]);

// Rebuild the object
const incrementedObject = reduceEntries(incrementedEntries);

// What incrementedObject looks like now
// {
// 	key1: 4,
// 	key2: 5,
//	key3: 6
// }
```
