let item = document.querySelectorAll(".box .number");
let section = document.getElementById("stats");

let check  = false;

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
