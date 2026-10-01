---
title: "Plongée dans les coulisses de trois cérémonies collaboratives"
description: "A la suite d’un post sur LinkedIn, j’ai pensé à écrire cet article pour décrire 3 cérémonies qui m’ont marquée et que j’ai adorées pendant l’une de mes dernières missions : Event Storming, Example…"
date: 2026-03-04
tags: ["event-storming", "ddd", "collaboration", "agilité"]
lang: fr
canonical: "https://sensiolabs.com/fr/blog/2026/plongee-dans-les-coulisses-de-trois-ceremonies-collaboratives"
translation: "https://sensiolabs.com/blog/2026/behind-the-scenes-3-collaborative-ceremonies-for-better-development"
---

A la suite d’un post sur LinkedIn, j’ai pensé à écrire cet article pour décrire 3 cérémonies qui m’ont marquée et que j’ai adorées pendant l’une de mes dernières missions : Event Storming, Example Mapping et Domain Storytelling.

Ces méthodologies, à la croisée du travail collaboratif et de la modélisation, m’ont permis d’explorer de nouvelles dimensions dans la compréhension et la conception de notre produit. Elles nous ont également aidé à renforcer la synergie au sein de l’équipe. Que ce soit pour analyser un domaine complexe, résoudre des problèmes, ou concevoir des fonctionnalités, chacune de ces pratiques offre des outils puissants pour structurer les idées, clarifier les besoins et aligner tout le monde.

Dans cet article, je vais vous donner un aperçu de chacune de ces cérémonies et vous expliquer pourquoi elles se sont révélées si efficaces pour notre équipe.

## Event Storming

L’[_Event Storming_](https://www.eventstorming.com/), initié par [_Alberto Brandolini_](https://x.com/ziobrando), est une méthode de modélisation collaborative conçue pour explorer rapidement un domaine complexe. L’idée centrale repose sur l’identification des **_domain events_** (événements métiers) qui décrivent ce qui se passe dans un système ou une organisation.

**Degré de complexité :** Accessible à tous, mais elle peut devenir complexe si le domaine est très vaste ou si l’équipe n’a jamais travaillé de manière collaborative sur la modélisation. La richesse de la méthode se découvre avec la pratique et la diversité des participants.

**Durée :**

- Session typique : 2 à 4 heures pour un domaine limité.

- Pour des domaines très étendus, prévoir plusieurs ateliers récurrents ou un “Big Picture” en amont puis des ateliers plus ciblés.

**Outils :**

- Présentiel : post-its, marqueurs, tableau blanc.

- Distanciel : [Miro](https://miro.com/fr/), [Mural](https://www.mural.co/), [FigJam](https://www.digidop.com/fr/tools/figjam).

![Event Storming with many colored boxes](https://sensiolabs.com/f/e39ee9d9436c47ea/1720x876-event-storming.png)

Ce qui rend l’Event Storming si captivant, c’est son approche visuelle et inclusive. Les membres de l’équipe (product owners, développeurs, designers, etc.) collent des post-its sur un tableau pour cartographier les événements, les acteurs et leurs interactions. 

### Pourquoi j’ai adoré cette méthode :

- Elle favorise une compréhension partagée entre les différents rôles. 

- Elle permet d’identifier rapidement les zones d’incertitude ou de friction. 

- Elle donne une vue d’ensemble, essentielle pour aligner les parties prenantes. 

Si vous souhaitez approfondir l’Event Storming, voici quelques ressources qui m’ont aidé :

🎥 [Talk d’Alberto Brandolini — DDD Europe 2019](https://www.youtube.com/watch?v=mLXQIYEwK24)

📖 [Livre _Introducing EventStorming_ — Alberto Brandolini](https://www.eventstorming.com/book/)

📝 [Article sur l’Event Storming](https://dzone.com/articles/demystifying-event-storming-a-comprehensive-guide)

🎙 [Conférences et retours d’expérience](https://virtualddd.com/videos/joys-and-pitfalls-of-collaborative-modeling-alberto-brandolini-ddd-europe-2019/)

N’hésitez pas à partager d’autres ressources ou vos retours sur cette approche !

## Example Mapping

Proposée par [_Matt Wynne_](https://x.com/mattwynne?lang=en), l’[_Example Mapping_](https://www.youtube.com/watch?v=VwvrGfWmG_U) est une technique qui aide les équipes à définir et à clarifier les exigences sous forme d’exemples concrets. Elle est particulièrement utile lors des discussions autour des User Stories.

**Degré de complexité :** Relativement simple à mettre en place, surtout si l’équipe maîtrise déjà les User Stories. Le défi principal est de formuler des exemples concrets et d’identifier les zones d’ambiguïté.

**Durée :**

- Session typique : 45 minutes à 2 heures par User Story.

- Peut être organisée par tâche ou regroupée pour plusieurs User Stories dans un atelier récurrent.

**Outils :**

- Présentiel : post-its et tableau blanc.

- Distanciel : [Miro](https://miro.com/fr/), [Mural](https://www.mural.co/), [FigJam](https://www.digidop.com/fr/tools/figjam).

![Example mapping with papers in blue, green, yellow and red](https://sensiolabs.com/f/0df4ca96cc894908/800x600-example-mapping-b3qs-xrd.jpg)

**Déroulement :** On divise les discussions en quatre catégories représentées par des cartes de différentes couleurs :

🟦 **Règles** : ce que le système doit faire

🟩 **Exemples** : les cas concrets illustrant les règles

🟥 **Questions** : les zones d’incertitude

🟨 **Story** : le besoin exprimé

### Pourquoi j’ai adoré cette méthode :

- Elle clarifie les User Stories et favorise un dialogue concret entre métiers et technique.

- Elle structure les **cas de tests et les fixtures**, rendant la lecture des tests plus claire et alignée avec les besoins métiers.

- Chaque scénario devient un reflet fidèle des attentes réelles.

## Domain Storytelling

Le Domain Storytelling est une méthode narrative qui consiste à raconter des histoires autour des processus métiers en utilisant un langage visuel. L’objectif est de modéliser un domaine en s’appuyant sur des récits collaboratifs.

**Degré de complexité :** Accessible, mais nécessite un peu de pratique pour raconter des histoires précises et modéliser correctement les interactions. L’implication des utilisateurs finaux est essentielle.

**Durée :**

- Session type : 1 à 3 heures selon la complexité du processus.

- Peut être organisée par processus métier ou pour couvrir un domaine complet en plusieurs sessions.

**Outils :**

- Présentiel : tableau blanc et post-its.

- Distanciel : [Mermaid](https://mermaid.js.org/), [Miro](https://miro.com/fr/), ou outils de diagrammes de séquence.

![Domain Storytelling scheme as a triangle with domain expert, developer, and domain story and arrows between them](https://sensiolabs.com/f/6ebafb86efdbe42f/531x376-domain-storytelling.jpg)

### Pourquoi j’ai adoré :

- Elle met en lumière les **workflows réels**, souvent ignorés dans les spécifications classiques.

- Elle engage les utilisateurs finaux, renforçant leur implication.

- Elle est accessible et compréhensible pour tous, même les non-techniciens.

## Conclusion

Ces trois cérémonies, bien que distinctes, partagent une philosophie commune : la collaboration, la clarté et l’engagement des parties prenantes. En tant que facilitateur ou membre d’une équipe, les appliquer va nous permettre de briser les silos, de créer une vision commune et d’aller bien au-delà des simples exigences écrites. 

Si vous ne les avez jamais essayées, je vous encourage vivement à les expérimenter lors de vos prochaines missions. Elles pourraient bien transformer votre façon de travailler et d’interagir avec vos équipes.
