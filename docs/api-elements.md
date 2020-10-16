---
id: api-elements
title: Elements API
sidebar_label: Elements
---

## GET /api/default-elements
Returns the four starting elements in simple form.

```
[
  {"id": 1, "name": "Air", "color": "sky"},
  {"id": 2, "name": "Earth", "color": "brown"},
  {"id": 3, "name": "Fire", "color": "orange"},
  {"id": 4, "name": "Water", "color": "blue"}
]
```

## GET /api/get-element/:elementId
Gets element data in simple form.

A request to `https://elemental.hparcells.tk/api/get-element/86` would output the following:

```
{"id": 86, "name": "Dirt Planet", "color": "brown"}
```

## GET /api/get-full-element/:elementId
Gets the element data in complete form.

A request to `https://elemental.hparcells.tk/api/get-full-element/86` would output the following:

```
{
  "id": 86,
  "name": "Dirt Planet",
  "color": "brown",
  "suggestedBy": "Hasanchik Gaming",
  "pioneer": "Richard",
  "pioneerNote": "",
  "createdOn": 1600535265989
}
```
