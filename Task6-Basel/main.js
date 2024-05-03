let checkbox = document.querySelector(".calculator .mode .toggle-checkbox");
let calculator = document.querySelector(".calculator");
let btns = document.querySelectorAll(".calculator .btn.number");
let allbtns = document.querySelectorAll(".calculator .btn");
let oper = document.querySelector(".calculator .operation");
let clicked = false;
let clear = document.querySelector(".calculator .btn.clear");
let ans  = document.querySelector(".calculator .answer");
let equal = document.querySelector(".calculator .btn.equal");

allbtns.forEach((btn) => btn.addEventListener("mousedown", function(){
        btn.style = "transform: scale(0.8);"
}));
allbtns.forEach((btn) => btn.addEventListener("mouseup", function(){
    btn.style = "transform: scale(1);"
}));


clear.addEventListener("click", function(){
    oper.innerHTML = "";
    ans.innerHTML = "";
    result = "";
});

checkbox.addEventListener("click", function(){
    if(!clicked){
        calculator.classList.remove("white");
        calculator.classList.add("dark");
        document.body.classList.add("dark");
        clicked = true;
    }else{
        calculator.classList.remove("dark");
        document.body.classList.remove("dark");
        calculator.classList.add("white");
        document.body.classList.add("white");
        clicked = false;
    }
});



let result = "";
btns.forEach((btn) => btn.addEventListener("click", function(){
        ans.style = "font-size:25px;";
        if(btn.innerHTML == "00" && oper.innerHTML.length == 0)
            oper.innerHTML += "0";
        else
            oper.innerHTML += btn.innerHTML;
        let s = result + oper.innerHTML;
        
        ans.innerHTML = eval(s);
}));

let del = document.querySelector(".calculator .btn.del");

del.addEventListener("click", function(){
    
        oper.innerHTML = oper.innerHTML.slice(0, -1);
        
        if(oper.innerHTML.length > 0){
            ans.innerHTML = eval(oper.innerHTML);
        }
        if(oper.innerHTML.length == 0){
            ans.innerHTML = "";
        }
    });

equal.addEventListener("click", function(){
    ans.style = "font-size:40px; width:100%; overflow-x:auto; text-align:right;";
    oper.innerHTML = "";
    result = ans.innerHTML;


});