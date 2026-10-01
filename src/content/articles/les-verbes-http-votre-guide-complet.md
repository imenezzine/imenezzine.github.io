---
title: "Les verbes HTTP : votre Guide Complet"
description: "Il y a quelques jours, mon cousin, qui commence tout juste à explorer le monde fascinant de l’informatique, m’a posé une question essentielle : «Qu’est-ce que c’est que ces…"
date: 2025-03-13
tags: ["http"]
lang: fr
canonical: "https://medium.com/@imenezzine/les-verbes-http-votre-guide-complet-e12c6b561c43"
translation: "https://sensiolabs.com/blog/2025/http-verbs-your-ultimate-guide"
---

![](https://cdn-images-1.medium.com/max/1024/1*o5SzYYYMgdbwD9PFCfP2Mw@2x.jpeg)
*Photo by [NASA](http://www.nasa.gov/) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*

Il y a quelques jours, mon cousin, qui commence tout juste à explorer le monde fascinant de l’informatique, m’a posé une question essentielle : «Qu’est-ce que c’est que ces verbes HTTP dont on parle tout le temps, comme GET, POST, PUT, DELETE et les autres ?» Son interrogation m’a donné l’idée d’écrire cet article pour expliquer ces concepts de manière simple, en incluant tous les principaux verbes HTTP avec des exemples concrets pour chacun.

**_Qu’est-ce qu’un Verbe HTTP ?_**

Lorsque tu navigues sur Internet, ton navigateur communique avec des serveurs via des requêtes HTTP. **HTTP,** ou [**HyperText Transfer Protocol**](https://en.wikipedia.org/wiki/HTTP), est un protocole qui permet l’échange d’informations entre ton navigateur et les serveurs où sont hébergés les sites web. Dans la première version d’HTTP, seul le verbe ‘**GET**’ existait pour récupérer des ressources, et les autres verbes ont été ajoutés par la suite. Les verbes HTTP sont des instructions envoyées par ton navigateur pour indiquer au serveur l’action à effectuer sur une ressource (comme une page web, une image, des données, etc.).

Voici un aperçu des principaux verbes HTTP : GET, POST, PUT, DELETE, PATCH, ainsi que des verbes moins courants comme HEAD, OPTIONS, TRACE et CONNECT.

**_Qu’est-ce qu’une opération idempotente ?_**

Avant d’entrer dans les détails des verbes, il est important de comprendre deux notions clés en HTTP : le caractère ‘Safe’ et l’idempotence. Une requête est dite ‘Safe’ si elle n’entraîne aucune modification de l’état du serveur. Par exemple, les requêtes GET sont considérées comme ‘Safe’ car elles ne font que récupérer des données sans en altérer. Ensuite, une opération est idempotente si elle produit toujours le même résultat, peu importe le nombre de fois où elle est exécutée. Autrement dit, effectuer plusieurs fois la même requête ne modifie pas davantage l’état du serveur après la première requête. Cela est essentiel pour comprendre certains verbes, comme GET et PUT, qui sont idempotents, contrairement à POST, qui ne l’est pas.

Maintenant que tu as ces définitions en tête, voyons comment cela s’applique à chaque verbe HTTP, en expliquant aussi pourquoi et quand les utiliser.

**1\. Le verbe GET : Récupérer des informations** (Idempotent)

**Quand l’utiliser ?**  
GET est utilisé lorsque tu veux récupérer des informations sans apporter de modifications au serveur. C’est la méthode la plus utilisée pour consulter des données (par exemple, afficher une page web ou rechercher des informations dans une base de données).

**Pourquoi l’utiliser ?**  
Parce que GET est SAFE et idempotent, d’ailleurs toutes les méthodes SAFE sont forcément _Idempotent_. En envoyant plusieurs requêtes GET, tu ne modifies pas les données, ce qui est idéal pour la consultation de ressources.

Exemple :

Imaginons que tu veux voir la liste des produits d’un site e-commerce. Tu envoies une requête GET à l’URL \`https://exemple.com/produits\`, et le serveur te renvoie la liste de tous les produits disponibles.

```http
GET /produits HTTP/2
Host: exemple.com
```

#### **2\. Le verbe POST : Envoyer des données au serveur** (Non-idempotent)

**Dans quel cas utiliser?  
**POST est utilisé pour envoyer des données au serveur lorsque tu veux qu’il crée une nouvelle ressource(un nouvel utilisateur, article ou produit, etc.) ou traite des informations. Il est souvent utilisé dans les formulaires web (comme l’inscription d’un utilisateur) ou pour soumettre des données qui ne sont pas récurrentes.

Raisons de l’utiliser  
POST n’est pas idempotent, ce qui signifie qu’il crée une nouvelle ressource ou modifie l’état du serveur à chaque fois qu’il est utilisé. Contrairement à des verbes comme PUT ou DELETE, une même requête POST exécutée plusieurs fois peut entraîner des changements multiples, par exemple la création de plusieurs instances d’une ressource ou des modifications cumulatives.

**Exemple** :

Tu veux ajouter un nouveau produit à la liste. Tu envoies une requête POST à l’URL \`https://exemple.com/produits\` avec les informations du nouveau produit (comme le nom, le prix, etc.) dans le corps de la requête.

```http
POST /produits HTTP/2
Host: exemple.com
Content-Type: application/json

{
  "nom": "Nouvel Article",
  "prix": "29.9"
}
```

#### **3\. Le verbe PUT : Mettre à jour ou remplacer une ressource** (Idempotent)

**Quand l’utiliser ?**  
PUT est utilisé pour mettre à jour ou remplacer une ressource existante sur le serveur, ou pour en créer une nouvelle si elle n’existe pas encore. Il convient lorsque tu sais précisément quelle ressource tu veux remplacer ou mettre à jour.

**Pourquoi l’utiliser ?**  
Parce que PUT est idempotent : si tu envoies la même requête PUT plusieurs fois, l’état de la ressource ne changera pas après la première requête. C’est idéal pour les mises à jour complètes ou les remplacements.

Exemple :

Supposons que tu veux modifier le prix d’un produit déjà existant avec l’ID 123. Tu envoies une requête PUT à l’URL \`https://exemple.com/produits/123\` avec les nouvelles informations.

```http
PUT /produits/123 HTTP/2
Host: exemple.com
Content-Type: application/json

{
  "nom": "Nouvel Article",
  "prix": 24.99
}
```

#### **4\. Le verbe DELETE : Supprimer une ressource**(Idempotent)

Dans quelle situation sert-il ?  
DELETE est utilisé pour supprimer une ressource spécifique sur le serveur. Si tu veux effacer une ressource précise, c’est le verbe à utiliser.

En quoi est-ce utile ?  
DELETE est idempotent : une fois qu’une ressource est supprimée, la ré-exécution de la requête n’aura pas d’effet supplémentaire.

DELETE est considéré comme **idempotent**, ce qui signifie que répéter la même requête plusieurs fois aura toujours le même effet. Par exemple, si une ressource est déjà supprimée, une requête DELETE ultérieure sur la même ressource n’aura aucun impact supplémentaire.

En général, une requête DELETE réussie renvoie un **code de statut HTTP 204 (No Content)** pour indiquer que la suppression a été effectuée sans contenu à renvoyer.

**Exemple** :

Tu veux supprimer un produit avec l’ID 123 de la liste. Tu envoies une requête DELETE à l’URL \`https://exemple.com/produits/123\`.

```http
DELETE /produits/123 HTTP/2
Host: exemple.com
```

#### **5\. Le verbe PATCH : Modifier partiellement une ressource**(Non-idempotent)

Contextes d’utilisation  
PATCH est utilisé lorsque tu veux modifier partiellement une ressource sans la remplacer complètement. Il est particulièrement utile pour des mises à jour mineures sur des données spécifiques.

Quand est-ce pertinent ?  
PATCH n’est pas toujours idempotent : l’effet d’une requête PATCH peut varier selon le nombre de fois où elle est exécutée. C’est donc idéal pour les ajustements mineurs.

**Exemple** :

Supposons que tu veux juste changer le nom d’un produit sans toucher à son prix. Tu envoies une requête PATCH à l’URL \`https://exemple.com/produits/123\` avec uniquement le champ à modifier.

```http
PATCH /produits/123 HTTP/2
Host: exemple.com
Content-Type: application/json

{
  "nom": "Nom Modifié"
}
```

#### **6\. Le verbe HEAD : Récupérer les en-têtes de la réponse**(Idempotent)

**Quand l’utiliser ?**  
HEAD est utilisé lorsque tu veux obtenir uniquement les en-têtes de réponse HTTP, sans le corps du contenu. C’est idéal pour vérifier l’existence d’une ressource sans la télécharger.

**Pourquoi l’utiliser ?**  
HEAD est idempotent : chaque requête HEAD donne le même résultat, tant que la ressource existe. Cela te permet de récupérer des informations rapides sur une ressource, comme sa taille ou son type.

**Exemple** :

Tu veux savoir si un fichier existe sur le serveur sans le télécharger. Tu envoies une requête HEAD à l’URL \`https://exemple.com/documentation.pdf\`.

```http
HEAD /documentation.pdf HTTP/2
Host: exemple.com
```

#### **7\. Le verbe OPTIONS : Connaître les méthodes HTTP supportées** (Idempotent)

Quels sont ses avantages ?  
OPTIONS est utilisé pour demander quelles méthodes HTTP (GET, POST, etc.) sont supportées sur une ressource spécifique. Il est souvent utilisé pour les tests d’API et pour configurer les permissions de communication entre le client et le serveur.

En quoi est-ce utile ?  
OPTIONS est idempotent, et utile lorsque tu veux savoir quelles actions sont permises sans modifier la ressource.

**Exemple** :

Tu veux savoir quelles actions tu peux effectuer sur une ressource. Tu envoies une requête OPTIONS à l’URL \`https://exemple.com/produits/123\`.

```http
OPTIONS /produits/123 HTTP/2
Host: exemple.com
```

#### **8\. Le verbe TRACE : Déboguer les chemins parcourus par la requête (Idempotent)**

**Quand l’utiliser ?**  
TRACE est principalement utilisé pour déboguer et retracer le chemin d’une requête HTTP à travers plusieurs proxys ou serveurs intermédiaires. Il affiche la requête telle qu’elle est vue par le serveur.

**Pourquoi l’utiliser ?**  
TRACE est idempotent et utile pour diagnostiquer des problèmes de connexion ou de communication réseau.

**Exemple** :

Pour voir le chemin parcouru par une requête, tu envoies une requête TRACE à l’URL \`https://exemple.com\`.

```
TRACE / HTTP/2
Host: exemple.com
```

#### **9\. Le verbe CONNECT : Établir une connexion pour un tunnel sécurisé** (Idempotent)

Dans quels cas l’utiliser ?  
CONNECT est utilisé pour établir un tunnel sécurisé via un proxy, souvent pour des connexions HTTPS. Il est principalement utilisé lorsque tu passes par un proxy pour accéder à une ressource distante.

Quand est-ce pertinent ?  
CONNECT est idempotent et permet de sécuriser les communications en établissant un tunnel crypté.

**Exemple** :

Lorsqu’une connexion sécurisée est nécessaire via un proxy, une requête CONNECT est envoyée.

```
CONNECT exemple.com:443 HTTP/2
Host: exemple.com
```

### Sécurité des Verbes HTTP

La sécurité des verbes HTTP dépend de leur utilisation correcte et des configurations côté serveur. Voici quelques points clés :

1.  **Sécuriser les données sensibles** : Utilise HTTPS pour chiffrer les données transmises entre le client et le serveur, surtout pour les méthodes qui modifient les données (comme POST et PUT).
2.  **Contrôler l’accès** : Assure-toi que seules les personnes autorisées peuvent utiliser certaines méthodes HTTP, surtout pour les opérations sensibles comme DELETE et PUT.
3.  **Prévenir les attaques :** Implémente des mécanismes pour prévenir les attaques par injection et CSRF (Cross-Site Request Forgery) en validant les entrées et en utilisant des tokens de sécurité. Bien que les requêtes POST soient plus appropriées que GET pour des actions sensibles, elles ne sont pas intrinsèquement plus sécurisées. La véritable protection contre les attaques CSRF repose sur l’utilisation de mécanismes comme des tokens CSRF uniques, et non sur le choix de la méthode HTTP. Cependant, les requêtes GET ne doivent jamais être utilisées pour modifier l’état du serveur, car elles sont conçues pour récupérer des données et sont directement rejouables via une URL. En respectant cette distinction, POST reste préférable pour les actions critiques afin de refléter les bonnes pratiques du protocole HTTP.

### **_Conclusion_**

Ces verbes HTTP GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE et CONNECT, sont au cœur des interactions entre ton navigateur et les serveurs. Chacun d’eux joue un rôle spécifique dans la manipulation des données et des ressources sur le web. Il existe également de nombreux autres verbes HTTP, plus ou moins standardisés, comme LOCK, COPY, et bien d’autres, qui répondent à des besoins plus spécifiques. En maîtrisant ces concepts, tu pourras mieux comprendre le fonctionnement des applications web, que ce soit en tant qu’utilisateur ou développeur. Mon cousin, avec ces explications complètes, est maintenant mieux équipé pour naviguer dans le monde de l’informatique, et j’espère que cet article pourra aussi aider d’autres débutants à y voir plus clair !

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=e12c6b561c43)
