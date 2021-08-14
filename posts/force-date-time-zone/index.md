---
title: Force date to a given time zone
date: 2021-08-14
tags: javascript, date, time, zone, PST, GMT, format
---

## Why do I need this?

I set the dates for my blog posts in `YYYY-MM-DD` format, like this `2021-07-09` for July 9th, 2021. I use a package called `gray-matter` to parse this date out of the frontmatter of my blog posts. Because I omit any timezone information in my dates, they get parsed as `UTC-0:00`. This makes sense as a software default, but I'm authoring from `PST` not `GMT`! If you have a similar scenario, you might find this function useful too.

## Code

```js
/**
 * This function will discard the time component of the provided
 * date and then convert it to the provided time zone. This can be used to
 * persist the year/month/day components of a Date in a new time zone.
 *
 *
 * ex.
 * Without this function:
 * new Date('2021-07-09T00:00:00.000Z') would convert to
 * Thu Jul 08 2021 17:00:00 GMT-0700 (Pacific Daylight Time).
 *
 * Note that we've ended with a July 8th date, instead of the 9th.
 *
 *
 * With this function:
 * forceDateToTimeZone(new Date('2021-07-09T00:00:00.000Z'), 'PST') you get
 * Fri Jul 09 2021 01:00:00 GMT-0700 (Pacific Daylight Time).
 *
 * Note that both dates read July 9th now.
 */
const forceDateToTimeZone = (date, timeZone) => {
  const [isoDate, isoTime] = date.toISOString().split("T");

  return new Date(`${isoDate} ${timeZone}`);
};
```
