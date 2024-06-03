// let taskinput = document.querySelector("#task");
// let addTask = document.querySelector("#save");

let tasks = []; // array of tasks 
let data = {"tasks":[]}; //object to save in local storage
let colors = ["#f8edc8","#c8f8cd","#c8eaf8"];

const mood = document.querySelector(".page .head .toggle-checkbox");
const page = document.querySelector(".page");
const formbtn = document.querySelector(".add-form .addtask");
const form = document.querySelector(".add-form .drop-down-form")

const add = document.querySelector(".add-form .drop-down-form .add");
const tasktitle = document.getElementById("title");
const taskdate = document.getElementById("taskdate");

const today = document.querySelector(".head .date .today");
let now = new Date();

//add today date
today.innerHTML = now.toDateString();

let moodclicked =  false;
let formclicked = false;



//change dark and white mood
mood.addEventListener("click",function () {
    if(!moodclicked){
        page.classList.remove("white");
        page.classList.add("dark");
        moodclicked = true;
    }else{
        page.classList.remove("dark");
        page.classList.add("white");
        moodclicked = false;
    }
});


//toggle form
formbtn.addEventListener("click",function () {
    if(!formclicked){
        form.style.display = "block";
        formclicked = true
    }
    else{
        form.style.display = "none";
        formclicked = false;
    }

});


add.addEventListener("click",function () {
    newTask(tasktitle.value,taskdate.value);
    // loadTasks();
})










// console.log(now.toDateString());

function newTask (taskvalue,taskdate){

    if(JSON.parse(localStorage.getItem("data")))
        data = JSON.parse(localStorage.getItem("data"));
    let randcolor = colors[Math.floor(Math.random() * colors.length)];
    console.log(randcolor);
    let task = {
        "id": data.tasks.length + 1,
        "name": taskvalue !== ""? taskvalue:"",
        "date":taskdate == ""? "today":taskdate,
        "iscompleted":false,
        "background": randcolor
    };
    data.tasks.push(task);
    localStorage.setItem("data",JSON.stringify(data));
};


function readTasks() {
    let data = JSON.parse(localStorage.getItem("data"));
    tasks = data.tasks;
}


function loadTasks(){
    readTasks();
    // console.log(tasks);
    let tasklist = document.querySelector(".tasks");
    if(tasks.length == 0)
    {
        tasklist.innerHTML = "<h3>No tasks yet</h3>";
        return;
    }
    tasks.forEach(function (task) {
        let tassk = document.createElement("div");
        let tasskhead = document.createElement("div");
        let tassktitle = document.createElement("div");
        tassk.classList.add("task");
        tassk.style.backgroundColor = `${task.background}`;
        tasskhead.classList.add("taskhead");
        if(task.iscompleted == true){
            tassk.classList.add("completed");
            tasskhead.innerHTML = `
            <div class="taskdate-complete">
            <i class="fa-solid fa-check"></i>
            <div class="taskdate">${task.date}</div>
        </div>
        <i class="fa-solid fa-arrow-trend-up"></i>
            `;
        }
        tasskhead.innerHTML = `
        <div class="taskdate-complete">
            <i class="fa-solid fa-check"></i>
            <div class="taskdate">${task.date}</div>
        </div>
        <i class="fa-solid fa-arrow-trend-up"></i>
        `;
        tassktitle.classList.add("title");
        tassktitle.innerHTML = `${task.name}`;
        tassk.appendChild(tasskhead);
        tassk.appendChild(tassktitle);
        tasklist.appendChild(tassk);
    })
}

loadTasks();

let alltasks = document.querySelectorAll(".task");
console.log(alltasks);
alltasks.forEach(function (task) {
    task.addEventListener("click",function () {
        task.classList.toggle("complete");
    });
});