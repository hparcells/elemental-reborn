---
id: element-forms
title: Element Forms
sidebar_label: Element Forms
---

Many of the endpoints will either return elements in a simple form or a complete form.

## Simple Form
Simple form is for simple needs, hence the name. It contains:

- `id`: The unique ID of the element.
- `name`: The display name of the element.
- `color`: The [color](colors) of the element.

```
{
  "id": 13,
  "name": "Silt",
  "color": "tan"
}
```

## Complete Form
A complete form of an element contains everything that the Simple Form contained, with added properties.

- `suggestedBy`: The user who suggested this element to be added.
- `pioneer`: The user who got the final vote on the element, and added it in the game.
- `pioneerNote`: The note the user who pioneered the element left.
- `createdOn`: The timestamp the element got added.

```
{
  "id": 13,
  "name": "Silt",
  "color": "tan",
  "suggestedBy": "Kojo Regenbogen",
  "pioneer": "Kojo Regenbogen",
  "pioneerNote": "",
  "createdOn": 1600476194752
}
```

> Pioneer notes don't actually serve any functionality in the game as of now. They were a planned feature, but never made it in.
