let resultTimeout = null;
window.addEventListener("load", () => {
    gettingIframeContentTest();
});

function gettingIframeContentTest(){
    /** @type {HTMLButtonElement} */
    const button = document.querySelector("main > button");
    
    button.addEventListener("click", () => {
        const iframe = document.querySelector("iframe");
        const doc = iframe.contentWindow.document || iframe.contentDocument;

        errorManager(doc);
    });
}

/**
 * * **En**: This function is required and must be defined by the client (on this page). It will be used by the "iframe" page provider to send data to this app via inter-window communication.
 * * **Fr**: Cette fonction est requise et doit être définie par le client (sur cette page). Elle sera utilisée par le fournisseur de la page "iframe" pour envoyer des données à cette application via une communication entre fenêtres.
 * @param {{Firstname: String, Lastname: String, Age: number, Email: String}} userdata - these are the data that the api will provide to this app after their user's login using their platform's login component (the iframe)
 */
function onSubmit(userdata){
    
    if (resultTimeout != null) clearTimeout(resultTimeout);
    
    /** @type {HTMLDivElement} */
    const resultsContainer = document.getElementById("results-container");
    /** @type {HTMLHRElement} */
    const resultHr = document.querySelector(".results-hr");

    resultsContainer.innerHTML = "";

    const ul_titles = document.createElement("ul");
    const ul_items = document.createElement("ul");

    for(let key in userdata){
        const li_title = document.createElement("li");
        const li_item = document.createElement("li");

        li_title.innerText = String(key);
        li_item.innerText = userdata[key];

        ul_titles.appendChild(li_title);
        ul_items.appendChild(li_item);
    }

    [ul_titles, ul_items].forEach(el => {resultsContainer.appendChild(el)});

    [resultHr, resultsContainer].forEach(el => {if(!el.classList.contains("show")) el.classList.add("show")});

};

/**
 * * **En**: This function is required and must be defined by the client (on this page). It will be used by the "iframe" page provider to handle error messages from our API that hosts the iframe's page.
 * * **Fr**: Cette fonction est requise et doit être définie par le client (sur cette page). Elle sera utilisée par le fournisseur de la page "iframe" pour gérer les messages d’erreur provenant de notre API qui héberge la page de l’iframe.
 * @param {String} errorMsg 
 */
function onError(errorMsg){
    errorManager(errorMsg);
};

/**
 * 
 * @param {String} msg 
 */
function errorManager(msg){
    /** @type {HTMLDivElement} */
    const resultsContainer = document.getElementById("results-container");
    /** @type {HTMLHRElement} */
    const resultHr = document.querySelector(".results-hr");
    const p = document.createElement("p");

    if (resultTimeout != null) clearTimeout(resultTimeout);
    
    try {
        p.innerText = msg;
        p.classList.add("success");
        resultsContainer.innerHTML = "";
        resultsContainer.appendChild(p);
    } catch (error) {
        p.innerHTML = `<b>Error -</b> ${String(error)}`;
        resultsContainer.innerHTML = "";
        resultsContainer.appendChild(p);
    }

    [resultsContainer, resultHr].forEach(el => {
        el.classList.add("show")
    });

    resultTimeout = setTimeout(() => {
        [resultsContainer, resultHr].forEach(el => {
            el.classList.remove("show")
        });
    }, 5000);
};