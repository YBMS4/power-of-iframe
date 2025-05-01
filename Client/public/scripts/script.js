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
 * **This function is required and should be defined by the client (on this page), it will be used by the "iframe" page provider to send data to this app via "inter-windows communication".**
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
 * **This function is required and should be defined by the client (on this page), it will be used by the "iframe" page provider to manage Error messages from the our API hosting the Iframe's Page.**
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