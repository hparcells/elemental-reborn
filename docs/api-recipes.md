---
id: api-recipes
title: Recipes API
sidebar_label: Recipes
---

## GET /api/get-recipe/:parent1/:parent2
Returns the element in simple form that is the result of the two parents.

A request to `https://elemental.hparcells.tk/api/get-recipe/2/2` would return the following:

```
{"id": 11, "name": "Dirt", "color": "brown"}
```
