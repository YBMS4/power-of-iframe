# power-of-iframe

At first, I thought ```<iframe>``` was just used to display someone else's web page on your own, so I found it kind of useless and didn’t pay any attention to it.  
Then one day, I was developing an app for a client who required online checkouts. I used an API (I won’t specify which one for security reasons), and when I imported their forms into my app through their API, I was shocked to find that the forms were inside an ```<iframe>``` tag.  
I said to myself, *"That's weird. Why would they do that?"*

Out of curiosity, I asked **ChatGPT** (buddy 🤧) if I could access the iframe’s elements using JavaScript with: 
```js 
    document.querySelector("iframe").contentWindow.document;
``` 
When she replied *"Not always"*, and explained that if the iframe and the host are from the **same origin** (e.g., ```http://localhost:3000```), then **yes**, you can access it — but if they are from **different origins** (e.g., host: ```http://localhost:3000```, iframe: ```http://localhost:3001```), then **no**, their JavaScript can't access each other’s elements due to **cross-origin security policies** — it suddenly made sense to me.

I finally understood why many API providers deliver their own frontend, often inside an ```<iframe>```, for security reasons.

What this really means is: let’s say the app inside the ```<iframe>``` contains a form with fields like **email** and **password**. The host app can’t do ```input.value``` on those fields 😂.  
So, if an API provider wants to keep its users’ **emails** and **passwords** secure in its own database, all it needs to do is serve a **form** to the client using an ```<iframe>```.  
It can verify the **origin** or **referer**, and that’s it! The best part is that any ```fetch()``` call made from within the iframe will be from the same origin as the API provider’s server.

Oh, and I almost forgot — the parent (host) and the child (iframe’s app) can still communicate using:
```js 
    window.postMessage();
```  
Now imagine this: the iframe sends an authentication request to the API server to get the user's information (name, age, profile picture, etc.), and then sends that data to the parent app via `postMessage`, without ever exposing the user's password.  
That’s when you truly see the **power of iframes** in API integrations.

## Project Structure

- ``Client/``: Contains the host page. It is the page that will host our iframe, which is supposed to communicate with our server.  
  * Use the command to start it: 
  ```sh 
    cd Client/; npm i; node index.js
  ```

- ``Server/``: Contains our back-end server, the user database, and the form that is supposed to be displayed inside the iframe.  
  * Use the command to start the server : 
  ```sh 
    cd Server/; npm i; node index.js
  ```

Explore these directories and check out my code (hope it’s readable 😅)

## Algorithm

Simply put:
1. The user opens the app (inside **Client/** – ``http://localhost:3001``)
2. The user enters their credentials (**email** and **password**) into the form inside the ```<iframe>```  
   *(Valid user credentials can be found in ``Server/loginForm/databaseManagement/db.js``)*  
3. After validation, the iframe sends the server’s response to the host, which interprets it.