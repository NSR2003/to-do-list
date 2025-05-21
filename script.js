let getuserinput = () => {
    let userinput = document.getElementById("userinput").value;
    console.log(userinput);
    return userinput;
}
let addtolist = (task) => {   
    let ul = document.getElementsByClassName("list-elements")[0];
    let createlist = document.createElement("li");
    let div = document.createElement("div");
    let checkboxdiv = document.createElement("div");
    let deletebutton = document.createElement("img");
    
    let textnode = document.createTextNode(task);
    let span = document.createElement("span");
    ul.appendChild(createlist);
    createlist.appendChild(div);
    div.appendChild(checkboxdiv);
    div.appendChild(span);
    span.appendChild(textnode);
    createlist.appendChild(deletebutton);
    deletebutton.src = "./assets/delete.png";
    deletebutton.classList.add(...("w-[1dvw] h-auto mx-[1dvw] flex align-self-end".trim().split(" ")));
    checkboxdiv.classList.add(...("w-[2dvw] h-[50%] bg-[black]/10 mx-[1dvw] checkboxdiv select-none flex items-center justify-center".trim().split(" ")));
    createlist.classList.add(...("h-[7dvh] flex items-center bg-[gray]/50 rounded-lg w-full task".trim().split(" ")));
    div.classList.add(...("w-[60dvw] h-full flex items-center".trim().split(" ")));
    deletebutton.classList.add("hidden".trim().split(" "));
    createlist.dataset.status = "incomplete";
    createlist.addEventListener('mouseover', (e) => {
        deletebutton.classList.remove("hidden".trim().split(" "));
    })
    createlist.addEventListener('mouseout', (e) => {
        deletebutton.classList.add("hidden".trim().split(" "));
    })
    deletebutton.addEventListener('click', (e)=>{
        createlist.remove();
    })
}
let inputbox = document.getElementById("userinput");
inputbox.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        getuserinput();
        let dummy = getuserinput();
        inputbox.value = "";
        if(dummy != "" && dummy != " ")
        {
            addtolist(dummy);
        }
    }}); 

document.addEventListener('click', (e) => {
    let checkbox = e.target.closest(".checkboxdiv");
    if(checkbox)
        {
            hasimg = checkbox.querySelector("img");
        if(hasimg){
            hasimg.remove();
            let text = document.querySelector(".line-through");
            text.classList.toggle("line-through");
            task = text.parentElement.parentElement
            task.dataset.status = "incomplete";
        }else{
            let img = document.createElement("img");
            img.src = "./assets/vecteezy_black-check-mark-icon-tick-symbol-in-black-color-vector_6059254-0-01.svg";
            checkbox.appendChild(img);
            let text = e.target.nextSibling;
            text.classList.toggle("line-through");
            task = text.parentElement.parentElement;
            task.dataset.status = "complete";
        }   
    }
})

let options = document.getElementById("options");
options.addEventListener('click', (e) => {
    let list = document.querySelector(".options-list");
    list.classList.toggle("hidden");
    if (list.classList.contains("hidden")){
        list.classList.remove("translate-y-[-20dvh]");
    }else{
        list.classList.add("translate-y-[-20dvh]");
    }
})

let completefilter = document.querySelector(".complete-filter");
completefilter.addEventListener('click', (e) => {
    if(document.querySelector(".incomplete-filter").children[0].src.includes("incomplete-active.svg"))
    {
        active_incomplete_filter_image();
       active_incomplete_filter();
    }
active_complete_filter_image();
active_complete_filter();
})
let incompletefilter = document.querySelector(".incomplete-filter");
incompletefilter.addEventListener('click', (e) => {
    if(document.querySelector(".complete-filter").children[0].src.includes("complete-active.svg"))
    {
        active_complete_filter_image();
       active_complete_filter();
    }
active_incomplete_filter_image();
active_incomplete_filter();
})

function active_complete_filter_image() {
    let img = document.querySelector(".complete-filter").children[0];
let src = img.src;
img.src = src.includes("complete-svgrepo-com.svg")? src.replace("complete-svgrepo-com.svg", "complete-active.svg"): src.replace("complete-active.svg", "complete-svgrepo-com.svg")
}
function active_incomplete_filter_image() {
    let img = document.querySelector(".incomplete-filter").children[0];
let src = img.src;
img.src = src.includes("wrong-svgrepo-com.svg")? src.replace("wrong-svgrepo-com.svg", "incomplete-active.svg"): src.replace("incomplete-active.svg", "wrong-svgrepo-com.svg")
}
function active_complete_filter() {
    let list = document.querySelectorAll(".task");
    
    if(document.querySelector(".complete-filter").children[0].src.includes("complete-active.svg"))
        {
            for (let i = 0; i < list.length; i++) {
                if(list[i].dataset.status === "complete"){
                    list[i].classList.remove("hidden");
                }else{
                    list[i].classList.add("hidden");
                }
            }
        }
    else{
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("hidden");
        }
    }
}
function active_incomplete_filter() {
    let list = document.querySelectorAll(".task");

    if(document.querySelector(".incomplete-filter").children[0].src.includes("incomplete-active.svg"))
        {   
            for (let i = 0; i < list.length; i++) {
                if(list[i].dataset.status === "incomplete"){
                    list[i].classList.remove("hidden");
                }else{
                    list[i].classList.add("hidden");
                }
            }
        }
    else{
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("hidden");
        }
    }
}
