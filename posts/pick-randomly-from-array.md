---
title: Pick Randomly From Array
date: 2018-08-04T16:47:52.000Z
tags: javascript, software
category: til
---

In game development, especially demos where I'm not using a full library or framework, a very useful utility function is to randomly pick from a set of options. I usually accomplish this by defining an array of the options and using this utility function to randomly choose one.

See it in action in this demo: https://codepen.io/rmkubik/pen/rrKZYr

## examples

```javascript
function pickRandomlyFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// You can also bind it to the Array prototype for easy reference
Array.prototype.pickRandom = function () {
  return pickRandomlyFromArray(this);
}[
  // Then use it on an anonymous array
  (1, 2, 3)
].pickRandom();

const arr = [4, 5, 6];
// Call it from the Array prototype
arr.pickRandom();
// Pass the array into pick function
pickRandomlyFromArray(arr);
```
