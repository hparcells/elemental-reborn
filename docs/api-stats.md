---
id: api-stats
title: Stats API
sidebar_label: Stats
---

## GET /api/element-count
Returns the total element count along with the total element count for each [color](colors) of element.

An example output could be:

```
{
  "total": 1246,
  "sky": 44,
  "brown": 88,
  "orange": 93,
  "blue": 74,
  "navy": 23,
  "silver": 59,
  "purple": 81,
  "maroon": 165,
  "gray": 24,
  "green": 40,
  "lime": 54,
  "yellow": 88,
  "olive": 78,
  "white": 117,
  "tan": 29,
  "black": 90,
  "red": 23,
  "lavender": 25,
  "pink": 22,
  "magenta": 29
}
```

## GET /api/path/:elementId
Returns the path of an element.

A request to `https://elemental.hparcells.tk/api/path/13` would return the following:

```
[
  ["Air", "Earth", "Dust"],
  ["Dust", "Dust", "Silt"]
]
```

The arrays contain three strings. The first two strings will be the parent elements of the third element in the array. In this example, Air + Earth = Dust, and Dust + Dust + Silt.

## GET /api/most-recent/:count
Returns the most recent elements added to the database in complete form.

A request to `https://elemental.hparcells.tk/api/most-recent/15` would return the 15 most recent elements.
