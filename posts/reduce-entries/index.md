---
title: "Reduce Entries: Array Utility Function"
date: 2021-11-02
tags: javascript, reduce, entries, utility, function
---

If you've ever needed to reduce an object to it's entries via JavaScript's `Object.entries` function, you'll sometimes find yourself needing to put an object back together again. I've needed this often enough that I encapsulated this into a little utility function called `reduceEntries`.

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

Here's a contrived example usage. There are more efficient ways to accomplish the example I've used below. There are also only 3 keys on my example object too, so who needs efficiency!

```js
// We have an object where we want to increment
// the value of every property on the object.
const object = {
  key1: 3,
  key2: 4,
  key3: 5,
};

// Convert all properties in the object to entries
// so we can iterate over them.
const objectEntries = Object.entries(object);

// Increment each key's value by 1.
const incrementedEntries = objectEntries.map(
  ([key, value]) => [
    key,
    value + 1,
  ]
);

// Rebuild the object
const incrementedObject = reduceEntries(incrementedEntries);

// What incremented object looks like now
// {
// 	key1: 4,
// 	key2: 5,
//	key3: 6
// }
```
