const startBtn = document.querySelector(".start_btn button"),
infoBox = document.querySelector(".info_box"),
exitBtn = infoBox.querySelector(".buttons .quit"),
continueBtn = infoBox.querySelector(".buttons .restart"),
quizBox = document.querySelector(".quiz_box"),
queBox = document.querySelector(".que_text")
optionList = document.querySelector(".option_list")
const nextBtn = quizBox.querySelector(".next_btn");
const prevBtn = quizBox.querySelector(".prev_btn");
const counterBtn = quizBox.querySelector(".total_que")
const timeCounter = quizBox.querySelector(".timer .timer_sec");
const result_box = document.querySelector(".result_box");
const restartQuiz = result_box.querySelector(".buttons .restart");
const quitQuiz = result_box.querySelector(".buttons .quit");


startBtn.addEventListener("click", ()=>{
    infoBox.classList.add("activeInfo");
});

exitBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("activeInfo");
})

continueBtn.addEventListener("click", ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz")
    showQuestions(0);
    queCounter(1);
    showTimer(15);
    showTimerLine(0);
})

restartQuiz.addEventListener("click", ()=>{
    result_box.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz")
    que_count = 0
    que_numb = 1
    userScore = 0
    counter;
    timeValue = 15
    widthValue = 0
    clearInterval(counterLine);
    showTimerLine(widthValue);
    showQuestions(0);
    queCounter(1);
    showTimer(15);  
})

let que_count = 0
let que_numb = 1
let userScore = 0
let counter;
let timeValue = 15
let widthValue = 0

nextBtn.onclick = () =>{
    if(que_count < questions.length -1){
        console.log(que_count++);
        que_numb++;
        showQuestions(que_count)
        queCounter(que_numb)
        clearInterval(counter);
        showTimer(timeValue);
        clearInterval(counterLine);
        showTimerLine(widthValue);
    }else{
        showResult();
    }
    
}

prevBtn.onclick = () =>{
        --que_count;
        --que_numb;
        showQuestions(que_count);
        queCounter(que_numb);
        optionSelected(this);
}
                                                            

quitQuiz.addEventListener("click", ()=>{
    infoBox.classList.remove("activeInfo");
    result_box.classList.remove("activeResult");
})

function showQuestions(index){
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>'
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' 
                    +'<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    +'<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    +'<div class="option">' + questions[index].options[3] + '<span></span></div>'

    queBox.innerHTML = que_tag;
    optionList.innerHTML = option_tag;
    nextBtn.classList.remove("show");
    prevBtn.classList.add("show");

    const option = optionList.querySelectorAll(".option")

    for(i=0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)")

    }
    // nextBtn.style.display = block;

}

function queCounter(index){
    let counterLen = '<span><p>'+ index +'</p>of<p>'+ questions.length+'</p>Questions</span>';
    counterBtn.innerHTML = counterLen;
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`; 
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userSelect = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = optionList.children.length;
    if(userSelect == correctAns){
        localStorage.setItem("corAns", correctAns.value);
        // console.log(corAns)
        nextBtn.classList.add("show");
        userScore += 1;
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
        console.log(userScore)
    }else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)
        nextBtn.classList.add("show");
        for(i=0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct")
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
                
        } 
    }


    for(i=0; i<allOptions; i++){
        optionList.children[i].classList.add("disabled")
        
    } 
}

function showTimer(time){
    counter = setInterval(countdown, 1000);
    function countdown(){
        if(time == -1){
            clearInterval(counter)
        }else{
            timeCounter.innerHTML = time
            time--
        }
        
    }
}

const timeLine = document.querySelector("header .time_line");

function showTimerLine(time){
    counterLine = setInterval(countdown, 29);
    function countdown(){
            time +=1;
            timeLine.style.width = time + "px";
            if(time > 549){
                clearInterval(counter)
            }
            
    }
}

function showResult(){
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else if(userScore > 1){ 
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}