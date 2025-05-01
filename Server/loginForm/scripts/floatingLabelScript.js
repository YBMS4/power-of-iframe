export default function floatingLabelHandler(){
    
    const labels = document.querySelectorAll(".floating-label");

    labels.forEach((label) => {
        const input = label.querySelector("input");
        input.addEventListener("change", (e) => {
            /** @type {HTMLInputElement} */
            const target = e.currentTarget;
            if(target.value?.length > 0){
                label.classList.add("forced-floating");
            }else{
                label.classList.remove("forced-floating");
            }
        });
    });
};