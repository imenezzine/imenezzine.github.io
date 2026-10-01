---
title: "RecorderHttpClient : enregistrer et rejouer les requêtes HTTP dans Symfony"
description: "Ma contribution au composant HttpClient de Symfony : un « recorder » natif, dans l'esprit de PHP-VCR, pour tester du code qui appelle des API externes."
url: https://github.com/symfony/symfony/pull/63781
stack: [Symfony, HttpClient, PHPUnit Bridge, HAR]
status: actif
featured: true
order: 0
---

Pull request en cours de revue sur [symfony/symfony](https://github.com/symfony/symfony/pull/63781), visée pour Symfony 8.2.

Elle ajoute un `RecorderHttpClient` qui enregistre les vraies réponses une fois (au format standard HAR), puis les rejoue dans les tests suivants, sans réseau ni mocks écrits à la main. Il suffit d'un attribut `#[UseRecord]` sur un test, et les secrets (tokens, mots de passe, cookies…) sont masqués avant d'être écrits.
