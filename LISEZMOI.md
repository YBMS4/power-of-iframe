# puissance des iframes

Au début, je pensais que ```<iframe>``` servait simplement à afficher la page web de quelqu’un d’autre sur la tienne, donc je trouvais ça un peu inutile et je n’y prêtais aucune attention.  
Puis un jour, je développais une application pour un client qui avait besoin de paiements en ligne. J’ai utilisé une API (je ne dirai pas laquelle pour des raisons de sécurité), et lorsque j’ai importé leurs formulaires dans mon app via leur API, j’ai été choqué de voir qu’ils étaient intégrés dans une balise ```<iframe>```.  
Je me suis dit : *« C’est bizarre, pourquoi feraient-ils ça ? »*

Par curiosité, j’ai demandé à **ChatGPT** (la pote 🤧) si je pouvais accéder aux éléments de l’iframe en JavaScript avec 
```js 
    const iframeContent = document.querySelector("iframe").contentWindow.document;
```  
Quand elle m’a répondu *« Pas toujours »* et m’a expliqué que si l’iframe et le site hôte sont du **même domaine** (par exemple ```http://localhost:3000```), alors **oui**, on peut y accéder — mais si ce sont **des domaines différents** (ex : hôte ```http://localhost:3000```, iframe ```http://localhost:3001```), alors **non**, leurs scripts JavaScript ne peuvent pas accéder l’un à l’autre à cause des **politiques de sécurité inter-domaines**, tout a fait sens pour moi.

J’ai enfin compris pourquoi la plupart des fournisseurs d’API proposent leur propre frontend, souvent à l’intérieur d’un ```<iframe>```, pour des raisons de sécurité.

Ce que cela signifie vraiment, c’est que si l’app à l’intérieur de l’```<iframe>``` contient un formulaire avec des champs comme **email** et **mot de passe**, l’app hôte ne peut pas faire ```input.value``` sur ces champs 😂.  
Donc, si un fournisseur d’API veut garder les **emails** et **mots de passe** de ses utilisateurs dans sa propre base de données en toute sécurité, tout ce qu’il a à faire, c’est de fournir un **formulaire** au client, appelé dans une balise ```<iframe>```.  
Il peut ensuite vérifier l’**origin** ou le **referer**, et c’est tout ! Et le meilleur dans tout ça, c’est que toute requête ```fetch()``` faite dans l’iframe sera considérée comme venant du même domaine que celui du fournisseur de l’API.

Oh, et j’ai failli oublier : le parent (l’hôte) et l’enfant (l’app dans l’iframe) peuvent toujours communiquer via 

```js 
    window.postMessage();
```

Imagine maintenant que l’iframe envoie une requête d’authentification à son serveur pour récupérer les infos de l’utilisateur (nom, âge, photo de profil, etc.), puis envoie ces données à l’app hôte via ``postMessage``, sans jamais révéler le mot de passe de l’utilisateur.  
C’est là que tu réalises vraiment la **puissance des iframes** dans les intégrations d’API.

## Structure du projet

- ``Client/`` : Contient la page hôte. C’est la page qui hébergera notre iframe, laquelle est censée communiquer avec notre serveur.  
  * Utilisez la commande pour la lancer:
  ```sh 
    cd Client/; npm i; node index.js
  ```

- ``Server/`` : Contient notre serveur back-end, la base de données des utilisateurs et le formulaire destiné à être affiché dans l’iframe.  
  * Utilisez la commande pour le lancer: 
  ```sh 
    cd Server/; npm i; node index.js
  ```

Explorez ces dossiers et jetez un œil à mon code (j’espère qu’il est lisible 😅)

## Algorithme

En résumé :
1. L’utilisateur ouvre l’application (dans **Client/** – ``http://localhost:3001``)
2. L’utilisateur saisit ses identifiants (**email** et **mot de passe**) dans le formulaire à l’intérieur de l’```<iframe>```  
   *(Les identifiants valides se trouvent dans ``Server/loginForm/databaseManagement/db.js``)*  
3. Après validation, l’iframe envoie la réponse du serveur à la page hôte, qui l’interprète.