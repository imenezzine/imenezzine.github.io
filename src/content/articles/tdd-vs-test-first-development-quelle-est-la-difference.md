---
title: "TDD vs. Test-First Development : Quelle est la différence ?"
description: "Lors de ma participation au dernier Symfony Live Paris 2023, j’ai assisté à un talk très intéressant sur les tests dans une application Symfony animé par Alexandre Salomé (vous…"
date: 2023-10-11
tags: ["tests", "symfony", "tdd"]
lang: fr
canonical: "https://medium.com/@imenezzine/tdd-vs-test-first-development-quelle-est-la-diff%C3%A9rence-ccbea4771484"
---

Lors de ma participation au dernier [**_Symfony Live Paris 2023_**](https://live.symfony.com/2023-paris/), j’ai assisté à un talk très intéressant sur les tests dans une application Symfony animé par [**_Alexandre Salomé_**](https://twitter.com/alexandresalome) (vous pouvez voir ses slides sur Twitter). À la suite de sa présentation, j’ai eu une petite confusion 😐 entre deux notions qui sont souvent confondues par la plupart des développeurs, à savoir le “Test-first development” et le “TDD”. C’est pourquoi j’ai décidé d’écrire cet article afin de clarifier la différence entre ces deux concepts 🚀.

Le TDD (Test Driven Development) et le TFD(Test-First Development ) sont deux approches de développement logiciel qui se concentrent sur la qualité du code. Malgré que visiblement ces deux approches partagent certains concepts, il existe bien des différence clés entre elles.

Le TDD (Test Driven Development) est une approche de développement guidée par les tests permet de concevoir et de développer du code de manière incrémentale en se basant sur le cycle RGR (Red/Green/Refactor). À chaque itération, lorsque nous avons un test en échec représentant une fonctionnalité à développer, nous écrivons le minimum de code nécessaire pour passer le test avec succès (Green). Ensuite, si nécessaire, nous effectuons une étape de refactorisation du code de production et du code de test (à noter que lors des premières itérations, il peut ne pas être nécessaire de faire de refactorisation). De cette manière, nous résolvons le problème progressivement en découpant notre fonctionnalité/besoin en plusieurs itérations.

![](https://cdn-images-1.medium.com/max/613/1*0-kQGTDjOdstgvbQGTukzA.png)
*Test Driven Development*

En revanche, le Test-First Development (TFD) est une approche qui consiste à écrire le test pour une fonctionnalité donnée, puis à concevoir et développer cette dernière en une seule étape. Il permet au développeur de réfléchir en amont à la manière de tester la fonctionnalité qu’il souhaite implémenter. En écrivant d’abord le test, il peut se concentrer sur les résultats attendus plutôt que sur les détails d’implémentation, ce qui facilite la conception d’une solution claire et efficace. Une fois le développement terminé, nous exécutons le test pour voir s’il passe ou non (il est autorisé dans cette approche d’affiner le test en fonction de l’implémentation du code, par exemple en ajoutant une assertion pour un comportement décrit par une nouvelle classe, etc).

![](https://cdn-images-1.medium.com/max/1024/1*tHfjTTyu4zjMQTEMSRU2Mg.png)
*Test-First Development*

En résumé, le TDD (Test-Driven Development) et le TFD (Test-First Development) sont deux approches de développement basées sur des tests automatisés. Le TDD met l’accent sur la conception orientée test, l’aspect incrémental et la granularité des tests, tandis que le TFD met l’accent sur la conception orientée solution.

Les différences principales entre ces deux approches résident dans la séquence de travail et l’approche de conception. Il est important de choisir l’approche la mieux adaptée à vos besoins et objectifs, en fonction du contexte de votre travail🚀.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=ccbea4771484)
