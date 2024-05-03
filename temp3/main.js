let item = document.querySelectorAll(".box .number");
let section = document.getElementById("stats");

let check  = false;

let skill = document.querySelectorAll(".skills .skill");
let skillsection = document.getElementById("our-skills");

window.onscroll = function() {
    if(window.scrollY >= section.offsetTop) {
        if(!check){
        item.forEach((num) => {
            startcount(num);
        });
        check = true
        }
    }
}
function startcount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(() => {
        el.innerHTML++;
    if (el.innerHTML == goal) {
        clearInterval(count);
    }
},1000/goal)
};


function startwidth(e){
    let goal = e.dataset.width;
    let count = setInterval(() => {
        e.style.width++;
        if(e.style.width == goal)
        {
            clearInterval(count);
        }
    }, 1000/goal);
}

