window.addEventListener("load", () => {
    init();
});

function iframeSizeManager(){
    /** @type {HTMLIFrameElement} */
    const iframe = document.getElementById("api-iframe");

    window.addEventListener("message", (event) => {
        if(event.data.height) iframe.style.height = event.data.height + 50 + "px";
        if(event.data.fetchSuccess){
            /** @type {{firstname:String, lastname:String, age: number, email: String}} */
            const userData = event.data.userdata;
            onSubmit?.(userData);
        }
        if(event.data.error) onError?.(event.data.error);
    });
};

function init(){
    /** @type {HTMLIFrameElement} */
    const iframe = document.getElementById("api-iframe");
    iframe.contentWindow.postMessage({origin: window.location.origin}, "http://localhost:3000");
    iframeSizeManager();
};