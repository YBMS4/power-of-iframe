let parentOrigin = null;
window.addEventListener("load", () => {
    init();
});

function sendSizeToParrent(){
    window.parent.postMessage({height: document.body.scrollHeight + 50}, parentOrigin);
};

function init(){
    const body = document.body;
    const bodyInitialDisplay = body.style.display;
    body.style.display = "none";
    window.addEventListener("message", (event) => {
        if(event.data.origin) {
            parentOrigin = event.data.origin;
            body.style.display = bodyInitialDisplay;
            sendSizeToParrent();
            formManagement();
        };
    });
};

function formManagement(){
    const form = document.querySelector("form");
    /** @type {HTMLInputElement} */
    const email = form.querySelector("input[type='email']");
    /** @type {HTMLInputElement} */
    const pass = form.querySelector("input[type='password']");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email: email.value, pass: pass.value})
        });

        if(response.status === 200){
            const userdata = await response.json();
            window.parent.postMessage({userdata: userdata, fetchSuccess: true}, parentOrigin);
        }else{
            window.parent.postMessage({error: (await response.json())["error"]}, parentOrigin);
        }
    });
};