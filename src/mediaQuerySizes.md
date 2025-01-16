Media query layout sizes

- 2xs: 375px
- xs: 500px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

I don't have a system to enforce these right now. I think enforcing them with JS would caused styled-jsx to not pre-bake the styles and ship them as JS instead of CSS. Instead, I'm just hardcoding them.
