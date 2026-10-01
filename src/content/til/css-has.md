---
title: "Le sélecteur CSS :has() fonctionne partout"
date: 2026-09-25
tags: [css]
---

`:has()` permet de styler un parent en fonction de ses enfants :

```css
.card:has(img) {
  padding: 0;
}
```
