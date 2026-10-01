---
title: "Le principe DRY : trouver l’équilibre délicat entre réutilisation et clarté du code"
description: "Dans cet article, nous explorons le principe DRY (Don’t Repeat Yourself) et son impact sur la qualité du code. Bien qu’essentiel pour éviter les redondances et faciliter la…"
date: 2025-02-21
tags: ["code", "bonnes-pratiques", "refactoring"]
lang: fr
canonical: "https://medium.com/@imenezzine/le-principe-dry-trouver-l%C3%A9quilibre-d%C3%A9licat-entre-r%C3%A9utilisation-et-clart%C3%A9-du-code-5ad18853b903"
translation: "https://medium.com/the-sensiolabs-tech-blog/the-dry-principle-striking-the-delicate-balance-between-code-reuse-and-clarity-3a2faac943df"
---

![](https://cdn-images-1.medium.com/max/780/1*4BAUr4ezf7ByxVkV8itbag.jpeg)

**Dans cet article, nous explorons le principe DRY (Don’t Repeat Yourself) et son impact sur la qualité du code. Bien qu’essentiel pour éviter les redondances et faciliter la maintenance, son application excessive peut parfois compliquer la compréhension et l’évolution du projet. Découvrons ensemble comment trouver le juste équilibre entre réutilisation et clarté.**

### Le principe DRY : une arme à double tranchant

Récemment, nous avons apporté les dernières touches à la version initiale de notre projet actuel, qui sera bientôt lancé en production. Avec l’évolution de la complexité de notre code due à la nature du projet, nous nous attachons à le rendre plus simple et plus épuré. En mettant en œuvre des bonnes pratiques telles que [le principe DRY (Don’t Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)) pour éviter les redondances, nous visons à maintenir une haute qualité.  
Cela me conduit à discuter d’un principe que je considère comme étant à double tranchant, et qu’il convient d’utiliser judicieusement tout en restant pragmatique

### Pourquoi appliquer le principe DRY ?

Le principe DRY «Don’t Repeat Yourself», est une philosophie de développement logiciel visant à minimiser la redondance dans le code source. Bien que cette approche soit largement saluée pour son efficacité dans la gestion de la complexité du code, il est essentiel de comprendre comment son application rigide peut parfois créer des confusions.

L’objectif principal du DRY est d’encourager la réutilisation du code, ce qui permet de réduire les erreurs potentielles et d’améliorer la maintenance. En évitant de dupliquer des morceaux de code, les développeurs peuvent centraliser la logique métier, facilitant ainsi les mises à jour et les corrections.

### **Exemple :**

Prenons un cas où nous avons deux entités dans une application Symfony : User et Admin. Ces deux entités partagent des propriétés communes, comme firstname, lastname, et email. Toutefois, sans normalisation, nous dupliquerions ces propriétés dans chaque entité, ce qui enfreint le principe DRY. Voici un exemple de ce que cela donnerait sans normalisation :

```php
// src/Entity/User.php

namespace App\Entity;


class User
{
    private string $firstname;

    private string $lastname;

    private string $email;

    private string $job;
}

// src/Entity/Admin.php

namespace App\Entity;

class Admin
{
    private string $firstname;

    private string $lastname;

    private string $email;

    private array $roles;
}
```

Dans ce cas, l’inspecteur de PhpStorm ou PHP Mess Detector signalerait une duplication des propriétés firstname, lastname, et email dans les deux entités. Une suggestion classique serait d'utiliser l'héritage pour centraliser ces propriétés dans une classe parent, Account, afin d'éliminer la duplication :

```php
// src/Entity/Account.php

namespace App\Entity;

abstract class Account
{
    protected string $firstname;

    protected string $lastname;

    protected string $email;
}
```

Ensuite, nous faisons hériter User et Admin de cette classe Account, tout en ajoutant les propriétés spécifiques à chacune de ces entités :

```php

// src/Entity/User.php

namespace App\Entity;


class User extends Account
{
    private string $job;
}


namespace App\Entity;

class Admin extends Account
{
    private array $roles;
}
```

Cette approche centralise les propriétés partagées dans une classe de base. Elle améliore la lisibilité et réduit les risques d’erreurs liés à la duplication. Cependant, il est important de garder à l’esprit que cette solution ne doit pas systématiquement être couplée à une intégration ORM comme Doctrine. Parfois, travailler directement avec un modèle objet pur est plus adapté pour garder le code indépendant de tout framework. Si l’utilisation de Doctrine devient nécessaire par la suite, vous pourrez toujours mapper ces modèles avec des outils comme MappedSuperclass ou SingleTableInheritance.

### Quand l’abstraction devient excessive

Cependant, cette quête de réduction de la redondance peut parfois conduire à des abstractions excessives. Lorsque les développeurs cherchent à généraliser trop rapidement, le code devient plus difficile à comprendre pour ceux qui ne sont pas familiers avec les détails spécifiques du projet. Les abstractions complexes peuvent créer des couches d’indirection qui, au lieu de clarifier le code, introduisent des niveaux supplémentaires de confusion.

Un autre aspect à considérer est que la persistance à suivre strictement le principe DRY peut conduire à des structures de code génériques qui ne sont pas optimales pour chaque cas particulier. Par exemple, lorsqu’on factorise une propriété comme un identifiant unique (ID) pour différentes entités, on peut constater que les règles associées varient en fonction du contexte métier. Prenons le cas d’un système où les **utilisateurs** ont des IDs numériques simples, tandis que les **clients** nécessitent des IDs avec un préfixe régional (par exemple, EU-12345). Dans ce cas, vouloir centraliser la gestion des IDs peut complexifier le code avec des conditions supplémentaires. Parfois, la duplication intentionnelle de certaines parties du code, adaptée à chaque entité, peut améliorer la lisibilité et la maintenance, surtout lorsque des variations spécifiques sont susceptibles d’apparaître à l'avenir.

### DRY dans le contexte des architectures modernes

Dans les architectures modernes, notamment avec les [**microservices**](https://en.wikipedia.org/wiki/Microservices) et les **stratégies** [**Polyrepo**](https://buildkite.com/blog/monorepo-polyrepo-choosing), il est parfois encouragé de faire du copier-coller entre des services isolés. Chaque service étant autonome et indépendant, une duplication modérée du code entre les différents services peut permettre une meilleure gestion des modifications locales et faciliter le déploiement sans impacter d’autres parties du système.

Trouver le bon équilibre entre la réutilisation du code et la clarté est un défi constant pour les développeurs. Il est important de reconnaître que le DRY est une directive, pas une règle absolue. Des compromis peuvent être nécessaires pour maintenir un code lisible et compréhensible tout en bénéficiant des avantages de la réutilisation.

### Conclusion

**En conclusion**, bien que le principe DRY soit un guide précieux pour améliorer la qualité du code, son application rigide peut parfois créer des confusions. Dans le contexte des architectures complexes comme les microservices, les développeurs peuvent même être encouragés à dupliquer du code pour garantir l’indépendance des services. L’important est de rester conscient du contexte du projet et de trouver un équilibre optimal entre la réutilisation, la lisibilité et la maintenance du code.

Et vous ? Avez-vous déjà été confrontés à ce sujet ? Je serais ravie de lire votre expérience en commentaires et d’en discuter avec vous.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=5ad18853b903)
