// localStorage.setItem("name","basel");
// sessionStorage.setItem("age",25);


let numberOfHints = 3;
let numOfTries = 5;
let currenttry = 1;
const words = ["bottle", "guitar", "jungle", "lantern", "forest", "island", "nebula", "penguin", "quartz", "sunset", "planet", "rocket", "stream", "bridge", "ocean"]
;

let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
// console.log(word);


//hint button
document.querySelector("#hint span").innerHTML = `${numberOfHints}`;
const hintbtn = document.querySelector("#hint");
hintbtn.addEventListener("click",gethint);


const message = document.querySelector(".message");


function generateinputs() {
    for (let i = 1; i <= numOfTries; i++){
        const inputscontainer = document.querySelector(".inputs");
        let trydiv = document.createElement("div");
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== 1) trydiv.classList.add("disabled-inputs");
        for (let j = 0; j < word.length; j++) {
            const input = document.createElement("input");
            input.setAttribute("maxlength", 1);
            input.type = "text";
            input.id = `try-${i}-letter-${j + 1}`;
            trydiv.appendChild(input);
        }
        inputscontainer.appendChild(trydiv);
    }
}

// inputs.children[0].children[1].focus();

generateinputs();

// disable elements 

const inputsdisabled = document.querySelectorAll(".disabled-inputs input");
inputsdisabled.forEach((input) => {
    input.disabled = true;
})


// let inputs = document.querySelectorAll("input");
// // console.log(inputs);
// inputs.forEach((input,index) =>{
    
//     input.addEventListener("input",()=>{
//         this.value = this.value.toUpperCase();
//         const nextinput = inputs[index + 1];
//         if(nextinput)
//             nextinput.focus();
//     })
    
// })
const inputs = document.querySelectorAll("input");
inputs.forEach((input, index) => {
  // Convert Input To Uppercase
    input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
    // console.log(index);
    const nextInput = inputs[index + 1];
    if (nextInput) nextInput.focus();});

    input.addEventListener("keydown", function(event){
        const currentindex = Array.from(inputs).indexOf(event.target);
        const previndex = currentindex - 1;
        if(event.key === "ArrowRight"){
            if(currentindex !== inputs.length - 1){
                inputs[currentindex + 1].focus();
            }
        }
        if(event.key === "ArrowLeft"){
            if(currentindex !== 0){
                inputs[currentindex - 1].focus();
            }
        }
        if(event.key === "Backspace"){
            if(currentindex !== 0){
                inputs[currentindex - 1].value = "";
                inputs[currentindex - 1].focus();
            }
        }
    })
});


const check = document.querySelector("#check");

check.addEventListener("click", handleguess);


function handleguess() {
    let successguess = true;
    for (let i = 0; i < word.length; i++) {
        const inputfield  = document.querySelector(`#try-${currenttry}-letter-${i + 1}`)
        // console.log(inputfield.value);
        let letter = inputfield.value;
        const correctletter = word[i];

        if (letter === correctletter) {
            inputfield.classList.add("yes-in-place");
        }else if(word.includes(letter) &&  letter !== ""){
            inputfield.classList.add("not-in-place");
            successguess = false;
        }else{
            inputfield.classList.add("no");
            successguess = false;
        }
    }
    if(successguess){
        message.innerHTML = `You Win The Word Is <span>${word}</span>`;
        if (numberOfHints === 3) {
            message.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
        }
        let alltries = document.querySelectorAll(".inputs > div");
        alltries.forEach((trydiv)=>{ trydiv.classList.add("disabled-inputs")});
        let currenttryinputs = document.querySelectorAll(`.try-${currenttry} input`);
        currenttryinputs.forEach((input)=>{input.disabled = true});
        check.disabled = true;
        hintbtn.disabled = true;
    }
    else{
        document.querySelector(`.try-${currenttry}`).classList.add("disabled-inputs");
        let currenttryinputs = document.querySelectorAll(`.try-${currenttry} input`);
        currenttryinputs.forEach((input)=>{input.disabled = true});
        // console.log(currenttry);
        if(currenttry === numOfTries)
        {
            message.innerHTML = `You Lost The Word Is <span>${word}</span>`;
            check.disabled = true;
            hintbtn.disabled = true;
        }
        if(currenttry < numOfTries){
            currenttry++;
            document.querySelector(`.try-${currenttry}`).classList.remove("disabled-inputs");
        }
        currenttryinputs = document.querySelectorAll(`.try-${currenttry} input`);
        currenttryinputs.forEach((input)=>{input.disabled = false});
    }
}


function gethint() {
    if(numberOfHints !== 0 && hintbtn.disabled == false){
        numberOfHints--;
        hintbtn.children[0].innerHTML = `${numberOfHints}`;
        const enabledinputs = document.querySelectorAll("input:not([disabled])");
        // const enabledInputs = document.querySelectorAll("input:not([disabled])");
        // console.log(enabledinputs);
        const emptyenabled = Array.from(enabledinputs).filter((input)=>input.value === "");
        // const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
        // console.log(emptyenabled);
        if(emptyenabled.length > 0){
            // console.log(emptyenabled.length);
            let ranindex = Math.floor(Math.random()*emptyenabled.length);
            // console.log(ranindex);
            let randominput = emptyenabled[ranindex];
            // console.log(randominput);
            let indextofill = Array.from(enabledinputs).indexOf(randominput);
            // console.log(indextofill);
            if(indextofill !== -1){
                randominput.value = word[indextofill];
                randominput.classList.add("yes-in-place");
                // randominput.disabled = true;
            }
        }
    }
    if(numberOfHints === 0)
        hintbtn.setAttribute("disabled", false);
}