---
title: "useKeyPress: Respond to user key presses in React"
desc: "How to respond to user key presses in React with useEffect and document.addEventListener."
date: 2021-09-04
tags: javascript, software
---

Dealing with keyboard events in React can be tricky to figure out at first. I had a project recently where I wanted to trigger some code in response to a user's key presses. I ended up responding to their events with a combination of `useEffect` and `document.addEventListener` in a `useKeyPress` custom hook.

[Skip to the finished `useKeyPress` custom hook code](#the-finished-object-object-custom-hook) or continue reading to learn how it was built.

## There's no `keypress` event in browsers

There are [`keydown`](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event) events that are triggered continuously while a given key is pressed down. This means just attaching an event handler to `keydown` is not enough for a piece of code you only want triggered a single time.

```jsx
const onKeyDown = (event) => {
  thisFunctionGetsInvoked_LOTS_perKeyDownEvent();
};

document.addEventListener("keydown", onKeyDown);
```

Fortunately, in newer browsers [keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) come with a [`repeat`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) property. For the first `keydown` event triggered by a single key this property will be false. For every subsequent event before the user releases the key, `repeat` will be true.

```jsx
const onKeyDown = (event) => {
  if (!event.repeat) {
    thisFunctionGetsInvoked_ONCE_perKeyDownEvent();
  }
};

document.addEventListener("keydown", onKeyDown);
```

Now we've got a `keydown` event listener that can trigger logic once in response to a user pressing a key. Next, we'll need to get this working inside of React.

## Create a custom `useEffect` hook

The best way I've found to attach a global event listener in React is via the [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect) hook. In this code sample below I abstract this into [a custom hook](https://reactjs.org/docs/hooks-custom.html) called `useKeyPress`.

```jsx
const useKeyPress = () => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.repeat) {
        thisFunctionGetsInvoked_ONCE_perKeyDownEvent();
      }
    };

    document.addEventListener("keydown", onKeyDown);
  }, []);
};
```

This application of `useEffect` has a few issues we'll cover next.

## Unsubscribe the listener in useEffect

The first issue is our lack of [clean up function](https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect) being returned from our effect function. We should use `document.removeEventListener` for this purpose. This will prevent duplicate event handlers being attached when this hook is disposed.

```jsx
const useKeyPress = () => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.repeat) {
        thisFunctionGetsInvoked_ONCE_perKeyDownEvent();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
};
```

## Listen for specific keys being pressed

Currently, our event handler will trigger when any key is pressed. We want to only respond to specific key presses. The [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) object has a [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) property to help us figure out which key was pressed. These codes are strings like `"KeyA"` and `"Space"`.

I decided to have this hook allow for multiple different key handlers. It does this by receiving an object of key codes mapped to functions. When a given key code event is sent, if the `handlers` object contains the code we invoke it.

We also want to pass this `handlers` object as a dependency to our `useEffect` hook. This ensures our event handlers are kept up to date if our user changes them.

```jsx
const useKeyPress = (handlers = {}) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.repeat) {
        handlers[event.code]?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
};
```

Finally, this hook will accept array of dependencies from the user of the hook and spread them into the `useEffect` hook. This way passed in event handlers can use the latest state of their parent component.

## The finished `useKeyPress` custom hook

```jsx
const useKeyPress = (handlers = {}, dependencies = []) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (!event.repeat) {
        handlers[event.code]?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handlers, ...dependencies]);
};
```

## Some example usages

```jsx
// Log some console messages when the A and Space keys are placed
const Component = () => {
  useKeyPress({
    KeyA: () => console.log("I pressed the A key!"),
    Space: () => console.log("I pressed the Space key!"),
  });

  return null;
};

// Increment and display a count when Space is pressed
const ComponentWithState = () => {
  const [count, setCount] = useState(0);

  useKeyPress(
    {
      Space: () => setCount(count + 1),
    },
    [count]
  );

  return <p>{count}</p>;
};
```
