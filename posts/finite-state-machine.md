---
title: Basic JavaScript Finite State Machine
date: 2018-04-13T06:52:57.000Z
tags: javascript, games, software
category: til
---

State machines make handling complex combinations of variables more convenient. Instead of handling every possible combination of states and actions you can only handle the particular combinations that make sense in your use case.

[This document](http://people.cs.vt.edu/~kafura/ComputationalThinking/Class-Notes/FSM.pdf) explains the concept of a state machine in much more detail (and much more clearly) than this brief article will.

I'm working on a game development project called [Unstable](http://unstablegame.com). This is a legacy project so I'm constantly looking for little improvements I can make without drastically reworking my build system and tooling. Implementing a state machine for some more complex objects is one of those such improvements.

This finite state machine (FSM) was created for a Timer object in my game. It needed an initial paused state that could only be triggered to play once when the player first started moving. From there the pause and play states functioned as one would normally expect in a timer.

## FSM Source Code

This is the implemented basic FSM internal logic. The machine keeps track of its internal current state and must be initiailized to a starting state. Additionally, the FSM provides 2 methods to manipulate its internal state.

- `action(actionName)` will execute the current state's callback function (which is defined in the `states` object of the controller) of the provided `actionName`.

- `transition(stateName)` will change the current state of the FSM. This function should be used instead of manually adjusting the `currentState` property of the FSM. This provides a place for special state transition logic to be added in the future.

```javascript
function fsm(states, initialState) {
  this.currentState = initialState;

  return {
    action: function (action) {
      if (states[this.currentState][action]) {
        states[this.currentState][action]();
      }
    },

    transition: function (state) {
      this.currentState = state;
    },

    currentState: this.currentState,
  };
}
```

## State Constructor Object Format

This is the example format of the `states` object passed into the FSM contructor function. Each state the machine can be in is defined as a property on the object. Each state then further has properity functions named the same as the actions it supports. If a state doesn't need to support a given action it can ignore the corresponding action property.

```javascript
{
    state1: {
        action1: callbackFn1
        action2: callbackFn2
    },
    state2: {
        action1: callbackFn1
    }
}
```

## FSM Implementation Example

This FSM has three states, `playerMoved`, `paused`, and `playing`. The machine is initialized in the `playerMoved` state. In my player's move function `this.state.action('playerMoved')` is called. This allowed me to keep my timer object paused until the player moves for the first time. In the subsequent states the `playerMoved` event is ignored so no further logic is necessary.

The `paused` and `playing` states alternate back and forth when `play` and `pause` events are triggered.

```javascript
this.state = fsm(
  {
    playerUnmoved: {
      playerMoved: function () {
        this.state.transition("playing");
      }.bind(this),
    },
    paused: {
      play: function () {
        this.state.transition("playing");
      }.bind(this),
    },
    playing: {
      pause: function () {
        this.state.transition("paused");
      }.bind(this),
    },
  },
  "playerUnmoved"
);

this.state.action("playerMoved"); // fsm current state from `playerUnmoved` to `paused`

this.state.action("pause"); // fsm current state from `playing` to `paused`

this.state.action("play"); // fsm current state from `paused` to `playing`

this.state.action("play"); // fsm current state stays `playing`

if (this.state.currrentState === "playing") {
  // increment the timer's counter
}
```

## sources

http://people.cs.vt.edu/~kafura/ComputationalThinking/Class-Notes/FSM.pdf
