---
title: Add a Spoiler Tag with Alpine.js
date: 2023-05-04
tags: javascript
---

I was working on [patch notes](https://r-k.io/island-maker) for my game, [Island Maker](https://rmkubik.itch.io/island-maker), and I wanted to put some information behind a spoiler tag.

I didn't want to add in something heavy with a build step. So I thought it would be a good time to try out Alpine.js.

[Alpine.js](https://alpinejs.dev/) is a lightweight JavaScript framework that describes itself as “jQuery for the modern web.”

## Building a Spoiler

<script src="https://unpkg.com/alpinejs" defer></script>
<style>{`
  .spoiler {
    background-color: #000000;
    cursor: pointer;
  }
  .spoiler span {
    background-color: aliceblue;
  }
  .spoiler:not(.revealed) span {
    visibility: hidden;
  }
`}</style>

Here's what we're going to build. Click on this to reveal the spoiler!
<span
  className="spoiler"
  x-data="{open: false}"
  x-bind:class="{ revealed: open }"
  x-on:click="open = !open"
  role="button"
  tabIndex="0"
  aria-label="reveal spoiler">
<span>This is a spoiler!</span>
</span>

### Starting CSS & HTML

I used two nested spans to create the spoiler above. Here's the HTML before adding any Alpine code.

```html
<span class="spoiler">
  <span>This is a spoiler!</span>
</span>
```

And here's the CSS I used. While the outer span does not have the `.revealed` class applied, the inner span will have its visibility hidden. This keeps the text content from being selectable, but preserves the space for the inner span in the document layout.

```css
.spoiler {
  background-color: #000000;
  cursor: pointer;
}

.spoiler span {
  background-color: aliceblue;
}

.spoiler:not(.revealed) span {
  visibility: hidden;
}
```

And here it is rendered! Notice you cannot select the text underneath (I promise it's in there).

<p>
  <span
    className="spoiler"
  >
    <span>This is a spoiler!</span>
  </span>
</p>

## Toggling the `revealed` class with Alpine

### Including Alpine.js

To get started you can drop their script into the head of your HTML document. They provide a link from the CDN [unpkg](https://www.unpkg.com/).

```html
<script src="https://unpkg.com/alpinejs" defer></script>
```

### Adding Alpine attributes

Here's the HTML from earlier with a few Alpine additions. It makes use of [three Alpine.js attributes](https://alpinejs.dev/).

```html
<span
  class="spoiler"
  x-data="{ open: false }"
  x-bind:class="open ? 'revealed' : ''"
  x-on:click="open = !open"
>
  <span>This is a spoiler!</span>
</span>
```

<p>
  <span
    className="spoiler"
    x-data="{ open: false }"
    x-bind:class="open ? 'revealed' : ''"
    x-on:click="open = !open"
  >
    <span>This is a spoiler!</span>
  </span>
</p>

### x-data

This declares our span as an Alpine “component”. It also initializes the spoiler to an open state of `false`.

### x-bind

We can prefix standard html attributes like `class` with `x-bind:` to allow Alpine to control them. Here we’re binding to the `class` attribute of our span.

The `x-data` values defined above are provided to bound attributes. The bound attribute's value is set to the return value of the expression. <Note>Alpine treats classes differently than other bound values. Alpine will preserve existing classes on an element [as described here](https://alpinejs.dev/directives/bind#special-behavior). This is usually a useful feature that only requires you to reference classes you care about. So, `spoiler` remains and `revealed` toggles.</Note>

With this code, we apply the `revealed` CSS class when our spoiler is open.

### x-on

This attribute allows us to listen for events on an element. To listen we prefix the event name, in this case `click`, with `x-on:`.

Again, the Alpine component’s `x-data` values are provided to this code. The values we change here are reflected in the component's state.

When the span is clicked, we are toggling the value of open between `true` and `false`.

## Accessibility

There's no native spoiler tag to use in the DOM, so I'm not 100% how to handle accessibility here. Since a spoiler tag functions a bit like a button, I think these attribute are a reasonable start:

- `role="button"`
- `tabindex="0"`
- `aria-label="reveal spoiler" `

## The final spoiler tag

```html
<span
  class="spoiler"
  x-data="{ open: false }"
  x-bind:class="open ? 'revealed' : ''"
  x-on:click="open = !open"
  role="button"
  tabindex="0"
  aria-label="reveal spoiler"
>
  <span>Spoilered content!</span>
</span>
```

<p>
  <span
    class="spoiler"
    x-data="{ open: false }"
    x-bind:class="open ? 'revealed' : ''"
    x-on:click="open = !open"
    role="button"
    tabindex="0"
    aria-label="reveal spoiler"
  >
    <span>Spoilered content!</span>
  </span>
</p>

I enjoyed getting functionality like this into my patch notes without introducing a build process. Alpine.js seems pretty powerful and convenient to drop into an existing page.

The one drawback I ran into was the repetition of code. It got a bit exhausting to copy all these attributes to each spoiler I wanted to make. Then, if I needed to change something I'd have to make sure I made the same change in each location. I think this would prevent me from choosing Alpine on a larger project.
