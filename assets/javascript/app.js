// Create option array with questions, different options and correct answer
// Create variables for correct answer count, wrong answer count, time, interval, user guess, time running variable, 
// Randomize questions
// set timer so user has x amount of seconds to select answer
// if user does not select answer, or user selects wrong answer, alert "you lose", then go to next question
// if user selects correct answer, alert "you win!" then take them to next question
// When win/lose alert pops up, reveal answer and show picture of answer
// Keep track of wins and losses and reveal at end of 10 questions.
// divs in html to reference timer, questions, answers and buttons for start and reset
// create buttons in html for user to click their guess 

$(document).ready(function(){
    // creates questions, choices and answers as object, string, number and array and photo
    var options = [
        {
            question: "What is the famous beach called from the movie 'The Beach'?",
            choices: ["Koh Lanta", "Koh Phi Phi", "Maya Bay", "Leonardo Di Caprio is hot"],
            answer: 2,
            photo: "../assets/images/mayabay.jpg"
        },
        {
            question: "What is Angkor Wat?",
            choices: ["Worlds largest Religious Monument", "King Tut's tomb", "A city in Vietnam", "Chinese Food"],
            answer: 0,
            photo:"../assets/images/agkorwat.jpg"
        },
        {
            question: "The Daintree Rainforest is the oldest tropical rainforest in the world, and is in which country?",
            choices: ["Costa Rica", "Thailand", "Fiji", "Australia"],
            answer: 3,
            photo: "../assets/images/daintree.jpg"
        },
        {
            question: "The most expensive beef in the world comes from...",
            choices: ["Australia", "America", "Japan", "Canada"],
            answer: 2,
            photo: "../assets/images/japan.jpg"
        },
        {
            question: "The only native mammals to this country are 2 species of bats...",
            choices: ["Laos", "New Zealand", "Russia", "Sri Lanka"],
            answer: 1,
            photo: "../assets/images/bats.jpg"
        },
    ]
//console.log(options[0].question);

// creates variables needed 
var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess = "";
var running = false;
var qCount = options.length;
var pick;
var newArray = [];
var holder = [];

$("#reset").hide();
// click start button to start Game

$("#start").on("click", function (){
    $("#start").hide();
    displayQuestion();
    runTimer();
    for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
})

// start timer function

function runTimer() {
    if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
}

// timer countdown function

function decrement() {
    $("#timeleft").html("<h3>Time Remaining: " + timer + "</h3>");
    timer --;

    if (timer === 0) {
        unanswerCount++;
        stop();
        $("#answerblock").html("<p>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
        hidepicture();
    }
}
// stop timer function

function stop() {
    running = false;
    clearInterval(intervalId);
}

// randomize questions from array 
// display question and possible answers 

function displayQuestion() {
    index = Math.floor(Math.random()*options.length);
    pick = options[index];
}

})