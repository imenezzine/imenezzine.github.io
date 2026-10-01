---
title: "De la théorie à la pratique : Comment le Craftsmanship peut vous aider à atteindre vos objectifs."
description: "À travers cet article, j’aimerais partager mon expérience de ma dernière mission 😍 qui m’a offert l’opportunité d’explorer et de pratiquer les méthodes du Craftsmanship."
date: 2023-10-11
tags: ["craftsmanship", "tdd", "code"]
lang: fr
canonical: "https://medium.com/@imenezzine/de-la-th%C3%A9orie-%C3%A0-la-pratique-comment-le-craftsmanship-peut-vous-aider-%C3%A0-atteindre-vos-objectifs-195c52d299a0"
translation: "https://medium.com/the-sensiolabs-tech-blog/from-theory-to-practice-how-craftsmanship-can-help-you-achieve-your-goals-5c98bc746c22"
---

À travers cet article, j’aimerais partager mon expérience de ma dernière mission 😍 qui m’a offert l’opportunité d’explorer et de pratiquer les méthodes du Craftsmanship.

Avant cette mission, j’étais une amatrice (et je le suis toujours 😜) très fascinée par cette approche de développement qui se base essentiellement sur la qualité du code. Elle nous rappelle l’importance d’utiliser les bonnes pratiques pour construire un logiciel simple et de qualité qui peut évoluer dans le temps sans se dégrader trop rapidement.

Avant de commencer, un peu d’histoire sur le software craftsmanship. En 2008, ce mouvement est né lorsque Uncle Bob a proposé “craftsmanship over execution” (“l’artisanat plutôt que l’exécution”) comme cinquième valeur du manifeste agile. Ce manifeste est composé d’un ensemble de principes et de valeurs visant à améliorer le développement logiciel en encourageant la collaboration, la simplicité et la flexibilité. On comprend bien que le craftsmanship est avant tout un état d’esprit.

Le software craftsmanship met l’accent sur la qualité du développement logiciel (à travers des pratiques telles que le [**_TDD_**](https://www.youtube.com/watch?v=jxBmKvS7lAo), le [**_BDD_**](https://www.youtube.com/watch?v=jxBmKvS7lAo) et [**_l’art du refactoring_**)](https://www.youtube.com/watch?v=jxBmKvS7lAo), la collaboration (en mettant en place des ateliers entre les développeurs et les parties prenantes, en clarifiant les besoins métiers, en élaborant un langage commun, etc.), ainsi que la satisfaction personnelle du développeur dans son travail. Cette approche s’appuie sur une boîte à outils de méthodes et de bonnes pratiques que chaque développeur doit connaître et appliquer pour créer des logiciels de haute qualité, notamment le TDD, le BDD, le Clean Code, le DDD, la remédiation de code existant (Legacy Remediation), les principes SOLID, etc.

Pour commencer, je voulais vous dire que j’ai eu la chance d’essayer toutes les techniques de la boîte à outils du software craftsmanship grâce à la société pour laquelle j’ai effectué ma dernière mission. Nous avions la liberté de choisir la méthode, la technologie et l’architecture que nous voulions utiliser pour construire notre projet. Nous avons eu beaucoup de chance 😊, car il s’agissait d’un projet from scratch avec une équipe très agréable qui nous a donné la carte blanche pour essayer tout ce que nous voulions. Mon binôme _Etienne_ et _moi_ avons donc pu explorer toutes les possibilités qui s’offraient à nous.

### **_La technique:_**

Une fois que tout fut clair, nous nous sommes lancés dans la technique. Nous avons installé notre framework favori [**_Symfony_**](https://symfony.com/) **❤** et nous avons opté pour [**_une architecture hexagonale_**](https://fr.wikipedia.org/wiki/Architecture_hexagonale)

![](https://cdn-images-1.medium.com/max/208/1*FG98AGs5PJAUcHT6rXm5gg.png)
*Un aperçu de l’architecture hexagonale sur un projet symfony*

Pourquoi une architecture hexagonale?

Cette architecture a été inventée par Alistair Cockburn dans le but de rendre notre application testable en se basant sur le principe SOLID (inversion de dépendance (D)), en protégeant le domaine métier (indépendant du framework) et en améliorant la maintenabilité et la flexibilité de l’application.

![](https://cdn-images-1.medium.com/max/1024/1*EuEHR6d2eUIytX4eBtdNRQ.png)
*Architecture Hexagonale*

Là, nous sommes bien organisés 😃, mais nous ne devrions pas nous lancer directement dans la programmation 😅. Avant cela, il est important d’explorer notre domaine, de bien comprendre le projet, d’identifier tous nos cas d’utilisation et de mettre en place un lexique commun avec toute l’équipe (métier et développeurs). Nous avons utilisé une large sélection de cérémonies, telles que [l**_’event storming_**](https://www.youtube.com/watch?v=mLXQIYEwK24) et l’[**_example mapping_**](https://www.youtube.com/watch?v=VwvrGfWmG_U), pour nous aider à bien comprendre le contexte et identifier le domaine.

Tout est prêt pour démarrer la première User Story, mais des interrogations subsistent : comment procéder, par où commencer, éviter les oublis, rester focalisé sur la résolution du problème sans se perdre dans les détails ? Nos inquiétudes, comme Kent Beck le mentionne dans « Test Driven Development: By Example », ont été productives. Elles nous ont poussés à explorer nos ressources, menant à la découverte que la méthode TDD répondait à nos préoccupations.

Du coup en employant cette méthode, nous avons commencé par rédiger nos tests avant de nous attaquer au code. L’objectif était de clarifier notre besoin et de définir à l’avance les comportements attendus et c’est ici qu’on a abordé le sujet des exemple mapping. C’est quoi et ça sert à quoi? 💁

### Example mapping ?

L’exemple mapping est un atelier dans lequel l’equipe de développement se réunit avec le product owner pour discuter, échanger et bien comprendre le besoin en se basant sur des exemples concrets. C’est un moment qui encourage la communication et l’échange entre le technique et le métier.

Une fois que nous avons abordé tous les exemples relatifs à la partie à développer, il est temps de commencer le développement. Nous avons choisi d’utiliser le langage Behat/Gherkin qui est facile à écrire, lisible et facile à modifier (on peut utiliser aussi PHPUnit à vous de choisir 😉) pour écrire nos tests.

```
Feature: Hotel Room Booking
    As a customer
    I want to be able to book a room in a hotel
    So that I can plan my stay in advance

Scenario: Successful room booking
    Given I am on the hotel booking page
    When I select the check-in and check-out dates
    And I select the number of guests and rooms
    And I click on the search button
    Then I should see a list of available rooms
    And I should be able to select a room and book it
    And I should receive a confirmation of my booking
```

Avec mon binôme Etienne, j’ai passé des heures de pair programming (on a opté pour cette technique de collaboration car collaborer est vraiment un art que chaque développeur doit apprendre 😍) avec changement de clavier chaque laps de temps(ça me manque déjà 😅).

En utilisant le TDD, le developpement se fait en plusieurs itérations en gardant en tête que le but est d’écrire le moins de code possible tout en satisfaisant la fonctionalité attendue, et chaque itération se décline en trois étapes : red/green/refactor.

![](https://cdn-images-1.medium.com/max/613/1*0-kQGTDjOdstgvbQGTukzA.png)
*Test Driven Developpement illustration*

**_Red:_** dans cette phase on va réfléchir à ce que nous voulons développer.

**_Green:_** dans cette phase on va réfléchir à la façon de réussir notre test.

**_Refactor:_** dans cette phase on va améliorer le code,modifier des détails d’implémentation sans changer évidemment le comportement.

Avec mon binôme, on a commencé par les premiers tests en appliquant à la lettre cette technique en écrivant le minimum de code pour faire passer pas à pas notre test et j’avoue que c’était amusant et magique à la fois (à chaque fois que c’est vert je sens la victoire (j’abuse je sais 😆))

En utilisant la programmation en mémoire, nous avons simulé l’environnement sans base de données réelle, collaborant en binôme pour développer différentes parties de l’implémentation. Après deux semaines, nous avons fusionné nos travaux et en une heure nous avons obtenu une application fonctionnelle avec un code minimal bien testé, répondant parfaitement aux besoins. 🚀

### Conclusion:

Cette méthode était notre méthodologie de travail tout au long ma mission et que nous l’avons bien transmis à tous les collaborateurs qui ont bossé avec nous sur ce projet.

En utilisant cette méthodologie, j’avoue qu’on avait jamais peur de refactoriser notre code, de l’améliorer ou même d’ajouter de nouvelles conditions ou fonctionnalités. On était très confiants de ce qu’on était en train de faire. On modifiait juste notre test pour qu’il réponde à notre nouveau besoin et essayait de le faire passer pas à pas et c’était tout 😍🚀.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=195c52d299a0)
