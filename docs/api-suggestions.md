---
id: api-suggestions
title: Suggestions API
sidebar_label: Suggestions
---

## GET /api/suggestions/:parent1/:parent2
Returns the suggestions for the two parent elements.

A request made to `https://elemental.hparcells.tk/api/suggestions/2/12` would return the following:

```
[
  {"uuid": "7981a9ad-f7ed-4564-b7d2-8579ca61e16a", "childName":"Dusty Wind", "childColor": "silver"},
  {"uuid": "1d68c8e1-7773-465d-8a5f-6fd881f99f91", "childName":"Wind Planet", "childColor": "brown"},
  {"uuid": "c856d134-b075-417c-969e-9182a55b0e0d", "childName": "Earth, Wind and Fire", "childColor": "sky"}
]
```
