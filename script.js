let list_elements = document.querySelector(".list-elements");
let getuserinput = () => {
    let userinput = document.getElementById("userinput").value;
    return userinput;
}
let addtolist = (task) => {   
    let createlist = document.createElement("li");
    let div = document.createElement("div");
    let checkboxdiv = document.createElement("div");
    let deletebutton = document.createElement("img");
    
    let textnode = document.createTextNode(task);
    let span = document.createElement("span");
    list_elements.appendChild(createlist);
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
        save_localstorage();
    })
    save_localstorage();
}
let inputbox = document.getElementById("userinput");
inputbox.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        let dummy = getuserinput();
        inputbox.value = "";
        if(dummy.trim() != "")
        {
            addtolist(dummy);
        }
    }}); 

document.addEventListener('click', (e) => {
    let checkbox = e.target.closest(".checkboxdiv");
    if(checkbox)
        {
            let hasimg = checkbox.querySelector("img");
        if(hasimg){
            hasimg.remove();
            let task = checkbox.closest("li")
            let text = task.querySelector("span");
            text.classList.toggle("line-through");
            task.dataset.status = "incomplete";
            save_localstorage();
        }else{
            let img = document.createElement("img");
            img.src = "./assets/vecteezy_black-check-mark-icon-tick-symbol-in-black-color-vector_6059254-0-01.svg";
            checkbox.appendChild(img);
            let text = e.target.nextSibling;
            text.classList.toggle("line-through");
            let task = text.parentElement.parentElement;
            task.dataset.status = "complete";
            save_localstorage();
        }   
    }
})

let options = document.getElementById("options");
let list = document.querySelector(".options-list");
let animate_conpletefilter = document.querySelector(".complete-filter");
let animate_incompletefilter = document.querySelector(".incomplete-filter");
options.addEventListener('click', (e) => {
    if (list.classList.contains("hidden")){
        list.classList.remove("hidden");

        animate_conpletefilter.animate([{transform: "translateX(-150%)",opacity:0},
                      {transform: "translateX(0)",opacity:1}],
                      {duration: 700,
                       easing:"ease-in-out",
                       fill:"forwards"});

        animate_incompletefilter.animate([{transform: "translateX(-220%)",opacity:0},
                      {transform: "translateX(0)",opacity:1}], {duration: 700,
                       easing:"ease-in-out",
                       fill:"forwards"});
        
    }else{
        const animation = animate_conpletefilter.animate([{transform: "translateX(0)",opacity:1},
                                        {transform: "translateX(-150%)",opacity:0}],
                                        {duration: 700,
                                         easing:"ease-in-out",
                                         fill:"forwards"});
        const animation2 = animate_incompletefilter.animate([{transform: "translateX(0)",opacity:1},
                                        {transform: "translateX(-220%)",opacity:0}], {duration: 700,
                                         easing:"ease-in-out",
                                         fill:"forwards"});                                    
        animation.onfinish = () => {
            list.classList.add("hidden");
        }
        animation2.onfinish = () => {
            list.classList.add("hidden");
        }
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
    
    let list = document.querySelectorAll(".task")
    
    if(document.querySelector(".complete-filter").children[0].src.includes("complete-active.svg"))
        {
            for (let i = 0; i < list.length; i++) {
                if(list[i].dataset.status === "incomplete"){
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
    
    let list = document.querySelectorAll(".task")

    if(document.querySelector(".incomplete-filter").children[0].src.includes("incomplete-active.svg"))
        {   
            for (let i = 0; i < list.length; i++) {
                if(list[i].dataset.status === "complete"){
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

function save_localstorage(){
    let task = list_elements.children;
    task = Array.from(task);
    let tasklist = [];
    task.forEach(li => {
        tasklist.push({
            task : li.querySelector("span").innerHTML,
            status : li.dataset.status
        });
    })
    console.log(tasklist);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
}

function load_localstorage(){
    let saved = JSON.parse(localStorage.getItem("tasklist"));
    if(!saved){
        return;
    }
    else{
        for (let i=0; i<saved.length; i++){
            addtolist(saved[i].task);
            if(saved[i].status == 'incomplete'){
            }
            else{
            let checkbox = list_elements.lastElementChild.querySelector(".checkboxdiv");
            let img = document.createElement("img");
            img.src = "./assets/vecteezy_black-check-mark-icon-tick-symbol-in-black-color-vector_6059254-0-01.svg";
            checkbox.appendChild(img);
            let text = checkbox.parentElement.querySelector("span");
            text.classList.toggle("line-through");
            let task = text.parentElement.parentElement;
            task.dataset.status = "complete";
                
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    load_localstorage();
});
