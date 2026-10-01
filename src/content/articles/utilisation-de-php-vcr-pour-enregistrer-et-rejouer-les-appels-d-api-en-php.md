---
title: "Utilisation de PHP-VCR pour Enregistrer et Rejouer les Appels d’API en PHP"
description: "Aujourd’hui, je vais partager avec vous mon expérience avec une bibliothèque que je trouve extraordinaire, car elle vous fera économiser du temps et de l’argent."
date: 2024-01-10
tags: ["symfony", "tests", "api", "php"]
lang: fr
canonical: "https://medium.com/@imenezzine/utilisation-de-php-vcr-pour-enregistrer-et-rejouer-les-appels-dapi-en-php-98ec94bd7153"
translation: "https://medium.com/the-sensiolabs-tech-blog/how-to-use-php-vcr-to-record-and-replay-api-calls-in-php-cca397f9ede8"
---

Aujourd’hui, je vais partager avec vous mon expérience avec une bibliothèque que je trouve extraordinaire, car elle vous fera économiser du temps et de l’argent.

Lorsque vous développez des applications PHP qui interagissent avec des API externes, les tests d’intégration peuvent devenir compliqués. Les appels réels aux API peuvent être coûteux, dépendants de la disponibilité des serveurs et ne garantissent pas toujours la cohérence des résultats.

Dans une de mes missions, nous avons travaillé sur une application qui synchronise des produits entre un PIM (Product Information Management) et un site E-commerce. Dans ce contexte, les tests d’intégration étaient particulièrement fastidieux. Il est évidemment possible de mocker tous les appels et réponses HTTP, mais ceci risque d’être assez chronophage et difficile à maintenir, on risquerait une désynchronisation entre nos mocks et les apis réelles. Dans cet article je vais vous parler d’une toute autre méthode. C’est là qu’intervient [**_PHP-VCR_**](https://github.com/php-vcr/php-vcr), une bibliothèque PHP qui permet d’enregistrer et de rejouer les requêtes HTTP, simplifiant ainsi les tests d’intégration. Dans cet article, nous explorerons deux façons d’utiliser PHP-VCR.

### **Méthode 1 : Utilisation de PHP-VCR avec des Méthodes Statiques**

**_Étape 1 : Installation de PHP-VCR_**

La première étape pour utiliser PHP-VCR consiste à l’installer dans votre projet à l’aide de Composer. Exécutez la commande suivante dans votre terminal :

```
composer require php-vcr/php-vcr --dev
```

**_Étape 2 : Configuration de PHP-VCR_**

Après l’installation, vous devez configurer PHP-VCR pour qu’il enregistre les requêtes HTTP. Vous pouvez utiliser les méthodes statiques de PHP-VCR pour activer et désactiver l’enregistrement, définir le répertoire de stockage des cassettes (captures) et plus encore.

Dans l’un de mes ancien articles j’ai cité qu’on a utilisé la [**_TDD_**](https://www.youtube.com/watch?v=jxBmKvS7lAo) (Test Driven Development) pour construire notre domaine (vous pouvez consulter l’article via ce [lien](https://medium.com/@imenezzine29/de-la-th%C3%A9orie-%C3%A0-la-pratique-comment-le-craftsmanship-peut-vous-aider-%C3%A0-atteindre-vos-objectifs-195c52d299a0)). Cette approche consiste à écrire nos tests avant de se plonger dans le code et de le faire passer step by step en écrivant le minimum du code.

On va donc écrire notre test avec [**_behat_**](https://docs.behat.org/en/latest/) dans mon cas et une fois le test passe au vert on ajoute tout simplement le tag @vcr

![](https://cdn-images-1.medium.com/max/1024/1*zSDk8cT6P3AXofgdLSqF1g.png)

En exécutant le test une autre fois on va avoir un nouveau fichier crée (notre cassette) avec l’enregistrement de la request envoyée et la response

![](https://cdn-images-1.medium.com/max/1024/1*8LHXETYyQOUhHZ4e4D-30g.png)

C’est magique ! Non ?

**_Étape 3 : Enregistrement et Reproduction des requêtes_**

Derrière cette magie il y a une simple configuration à faire. 😉

En utilisant Behat, vous pouvez configurer le setup VCR en utilisant les annotations @BeforeScenario et @AfterScenario pour activer et désactiver l'enregistrement. Vous pouvez utiliser la méthode VCR::turnOn() pour activer l'enregistrement, puis effectuez vos requêtes HTTP normalement.

Du coup dans @BeforeScenario vous devez configurer PHP-VCR pour qu’il enregistre les requêtes HTTP, en utilisant tout simplement la méthode VCR::turnOn() pour activer l'enregistrement, puis effectuez vos requêtes HTTP normalement.

la méthode VCR::insertCassette(‘example’) va enregistrer les requêtes et les réponses dans une cassette nommée ‘example’ dans le répertoire de votre choix. La cassette agit comme un enregistrement des interactions HTTP.

```php
  private bool $vcrOn = false;

    /**
     * @BeforeScenario
     */
    public function setupVCR(BeforeScenarioScope $scenarioEvent): void
    {
        if ($scenarioEvent->getScenario()->hasTag('vcr')) {
            \VCR\VCR::turnOn();
            $this->vcrOn = true;
            $scenarioCassette = strtolower(str_replace(' ', '_', $scenarioEvent->getScenario()->getTitle()));
            $suiteName = $scenarioEvent->getSuite()->getName();
            \VCR\VCR::insertCassette($suiteName.'/'.$scenarioCassette.'.yaml');
        }
    }
```

Après avoir effectué la requête et enregistré les données associées dans la cassette, dans la step @AfterScenarionous utilisons la méthode statique VCR::eject() pour arrêter l’enregistrement des requêtes. Cela signifie que les interactions HTTP seront dorénavant lues à partir de la cassette au lieu de réaliser de véritables requêtes HTTP.

Enfin, nous utilisons la méthode statique VCR::turnOff() pour désactiver complètement l’interception des requêtes HTTP. À partir de ce moment, PHP-VCR ne surveillera plus les requêtes sortantes.

```php
   /**
     * @AfterScenario
     */
    public function ejectCassette(): void
    {
        if ($this->vcrOn) {
            \VCR\VCR::eject();
        }
        \VCR\VCR::turnOff();
    }
```

Pour aller plus loin PHP-VCR vous donne la main de personnaliser votre configuration:

-   Vous pouvez personnaliser la manière dont PHP-VCR correspond aux demandes à l’aide de l’option de configuration. Répertoriez tous les noms d’un matcher qui doit être activé, en utilisant enableRequestMatchers();
-   PHP-VCR vous permet de définir vos propres request matchers en tant que fonctions de rappel(callback functions) et de les combiner avec celles existantes, en utilisant addRequestMatcher();
-   Comme je l’ai mentionné précédemment, les cassettes seront enregistrées dans le répertoire de votre choix en utilisant setCassettePath();
-   PHP-VCR stocke les interactions HTTP sur disque au format YAML ou JSON. Par défaut, PHP-VCR utilise le stockage YAML. Vous pouvez le préciser en utilisant la méthode setStorage();
-   Le mode d’enregistrement détermine la manière dont les demandes sont traitées. Il nous faut juste d’ajouter la méthode setMode();avec le mode enregistrement souhaité. Les modes disponibles sont :

​ ​ ​​​ ​​ ​​​ ​ ​​ ​ ​​​ ​ ​​ ​ ​​​ ​ ​ **_-new\_episodes_** autorise toujours les nouvelles requêtes HTTP, mode ​ ​ ​​​ ​​ ​​​ ​ ​​ ​ ​​​ ​ ​​ ​ ​​​ ​ par defaut

​ ​ ​​​ ​​ ​​​ ​ ​​ ​ ​​​ ​ ​​ ​ ​​​ ​ ​- **_once_** autorisera de nouvelles requêtes HTTP la première fois que la ​ ​ ​​​ ​​ ​​​ ​ ​​ ​ ​​​ ​ ​​ ​ ​​​ ​ ​cassette est créée, puis lancera une exception par la suite.

​ ​ ​​​ ​​ ​​​ ​ ​​ ​ ​​​ ​ ​​ ​ ​​​ ​- **_none_** n’autorisera jamais de nouvelles requêtes HTTP.

```php
 \VCR\VCR::configure()    
    ->addRequestMatcher(
        'custom_body_matcher',
        new CustomBodyMatcher()
    )
    ->enableRequestMatchers(['method', 'url', 'query_string', 'custom_body_matcher', 'post_fields'])
    ->enableLibraryHooks(['curl'])
    ->setCassettePath(dirname(__DIR__, 2).'/tests/Environment/IO/cassettes')
    ->setStorage('yaml')
    ->setMode('once');
```

**Méthode 2 : Utilisation de PHP-VCR avec PHPUnit**

**_Étape 1 : Installation de PHP-VCR avec PHPUnit_**

Pour utiliser PHP-VCR avec PHPUnit, commencez par installer les dépendances nécessaires :

```
composer require phpunit/phpunit php-vcr/phpunit-testlistener-vcr --dev
```

**_Étape 2 : Configuration de PHPUnit_**

Dans votre fichier de configuration PHPUnit (généralement phpunit.xml), ajoutez le listener PHP-VCR pour utiliser PHP-VCR avec PHPUnit.

```php
<phpunit>
    <!-- ... autres configurations ... -->
    <listeners>
        <listener class="VCR\PHPUnit\TestListener\VCRTestListener" file="vendor/php-vcr/phpunit-testlistener-vcr/src/VCRTestListener.php" />
    </listeners>
</phpunit>
```

**_Étape 3 : Écriture de Tests avec PHP-VCR_**

Maintenant, vous pouvez écrire des tests PHPUnit qui utilisent PHP-VCR pour enregistrer et rejouer des requêtes HTTP. Voici un exemple de test :

```php
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use VCR\VCR;

class MyApiTest extends TestCase
{
    public function setUp(): void
    {
        // On initialise PHP-VCR avant chaque test
        VCR::turnOn();
    }

    public function tearDown(): void
    {
        // On désactive PHP-VCR après chaque test
        VCR::turnOff();
    }

    public function testApiCall()
    {
        // On configure PHP-VCR pour enregistrer les requêtes HTTP
        VCR::insertCassette('testApiCall');

        // Votre code de test qui effectue une requête HTTP à une API
        $httpClient = new Client();
        $response = $httpClient->get('https://api.example.com/data');

        // Assertions sur la réponse de l'API
        $this->assertEquals(200, $response->getStatusCode());

        // On arrête l'enregistrement de PHP-VCR
        VCR::eject();
    }
}
```

Lorsque vous exécutez ce test, PHP-VCR enregistrera la première requête HTTP à l’API. Lorsque vous exécutez le test à nouveau, PHP-VCR utilisera la cassette enregistrée pour simuler la réponse de l’API, évitant ainsi les requêtes réelles.

### **Conclusion**

PHP-VCR est un outil puissant pour simplifier les tests d’intégration en enregistrant et en rejouant des requêtes HTTP. Que vous choisissiez d’utiliser les méthodes statiques ou de l’intégrer avec PHPUnit, PHP-VCR peut grandement améliorer la stabilité et la cohérence de vos tests en réduisant la dépendance aux services externes. Il est particulièrement utile pour tester des intégrations avec des API tierces ou des services web. En l’utilisant judicieusement, vous pouvez rendre vos tests plus fiables et plus rapides.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=98ec94bd7153)
