---
title: Hide Elements Over Games on Itch.io with Tampermonkey
date: 2023-05-18
tags: games, javascript, tampermonkey
---

[Itch.io](https://itch.io) presents a lot of information on its game pages in the upper right corner. Often, these elements can cover up a game and interfere with playing.

## Prior Work

[NextLevelBanana](https://nextlevelbanana.itch.io/) made a FireFox extension that hides these elements called [itchCleanScreen](https://github.com/nextlevelbanana/itchCleanScreen). It finds the `user_tools` element on the page and sets its visibility to hidden.

## Tampermonkey

I wanted this feature in Chrome, and am a fan of using [Tampermonkey](https://www.tampermonkey.net/) to make little scripts like this. I talk a bit more in depth about Tampermonkey in [a previous post](/blog/remove-twitter-distractions).

I took NextLevelBanana's original line of code to hide the `user_tools` element, and added a new button that lets you toggle the information on screen.

## Results

Here it is the script in action:

<Video>
  <source src="./toggle-itch-user-tools.mp4" type="video/mp4" />
</Video>

Here is the Tampermonkey userscript that creates this toggle button.

```js
// ==UserScript==
// @name         Toggle Itch.io User Tools
// @namespace    https://ryankubik.com/
// @version      1.0
// @description  Hide the user tools on itch.io game pages
// @author       Ryan Kubik
// @match        https://*.itch.io/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  window.onload = () => {
    let areToolsVisible = true;
    const userToolsElement = document.getElementById("user_tools");

    const hideButton = document.createElement("button");
    hideButton.style.visibility = "visible";
    hideButton.innerText = "👁️";
    hideButton.className = "action_btn";
    hideButton.onclick = function () {
      areToolsVisible = !areToolsVisible;

      if (areToolsVisible) {
        userToolsElement.style.visibility = "visible";
        hideButton.innerText = "👁️";
      } else {
        userToolsElement.style.visibility = "hidden";
        hideButton.innerText = "🙈";
      }
    };

    const hideButtonLi = document.createElement("li");
    hideButtonLi.appendChild(hideButton);

    userToolsElement.prepend(hideButtonLi);
  };
})();
```

Here's Tampermonkey's FAQ on [how to install userscripts](https://www.tampermonkey.net/faq.php?locale=en#Q102). I just go with the copy and paste route mentioned here.
