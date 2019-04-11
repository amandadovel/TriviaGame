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
            photo: "assets/images/mayabay.jpg"
        },
        {
            question: "What is Angkor Wat?",
            choices: ["Worlds largest Religious Monument", "King Tut's tomb", "A city in Vietnam", "Chinese Food"],
            answer: 0,
            photo:"assets/images/angkorwat.jpg"
        },
        {
            question: "The Daintree Rainforest is the oldest tropical rainforest in the world, and is in which country?",
            choices: ["Costa Rica", "Thailand", "Fiji", "Australia"],
            answer: 3,
            photo: "assets/images/daintree.jpg"
        },
        {
            question: "The most expensive beef in the world comes from...",
            choices: ["Australia", "America", "Japan", "Canada"],
            answer: 2,
            photo: "assets/images/japan.jpg"
        },
        {
            question: "The only native mammals to this country are 2 species of bats...",
            choices: ["Laos", "New Zealand", "Russia", "Sri Lanka"],
            answer: 1,
            photo: "assets/images/bats.jpg"
        },
        {
            question: "What event takes place at Black Rock City?",
            choices: ["A large religious gathering to worship a giant black rock", "A Native American pow wow", "running of the bulls", "Thousands gather to burn a giant wooden sculpture of a man"],
            answer: 3,
            photo:"assets/images/burningman.jpeg"
        },
        {
            question: "Which of these countries is the birth place of Yoga?",
            choices: ["America", "Vietnam", "India", "England"],
            answer: 2,
            photo:"assets/images/rishikesh.jpg"
        },
        {
            question: "In this country they have a festival called Loi Krathong, which is one of the largest floating lantern festivals in this world.",
            choices: ["Thailand", "China", "Taiwan", "Japan"],
            answer: 0,
            photo:"assets/images/lanterns.jpg"
        }, 
        {
            question: "This country is known as the adventure capital of the world.",
            choices: ["South Africa", "Canada", "Thailand", "New Zealand"],
            answer: 3,
            photo:"assets/images/nevis.jpg"
        },
        {
            question: "This animal faced extinction in Costa Rica because they are monogamous for life, once they're separated from their mate they will never mate again.",
            choices: ["Jaguars", "Parrots", "Monkeys", "Toucans"],
            answer: 1,
            photo:"assets/images/parrots.jpg"
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
    $("#timeremaining").html("<h3>Time Remaining: " + timer + "</h3>");
    timer --;

    if (timer === 0) {
        unanswerCount++;
        stop();
        $("#answerblock").html("<p>Time's up! The correct answer is: " + pick.choices[pick.answer] + "</p>");
        hidePicture();
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

// this if/ else is so the same question does not show up more than once.
    if (pick.shown) {
        displayQuestion();
    } else {
        console.log(pick.question);

// goes through answer array and displays in html
    $("#questionblock").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choices.length; i ++){
        var userChoice = $("<div>");
        userChoice.addClass("answerchoice");
        userChoice.html(pick.choices[i]);

// assign array position so it can check answer
    userChoice.attr("data-guessvalue", i);
    $("#answerblock").append(userChoice);
    }
    }

// click function to select answer and outcomes
    $(".answerchoice").on("click", function(){

// grab array position from userGuess
    userGuess = parseInt($(this).attr("data-guessvalue"));

// correct or wrong guess if else statements
    if (userGuess === pick.answer) {
        stop();
        correctCount++;
        userGuess="";
        $("#answerblock").html("<p>Correct!<p>");
        hidePicture();
    } else {
        stop();
        wrongCount++;
        userGuess="";
        $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
        hidePicture();
    }

    })
}
// Defines hidepicturefunction
    function hidePicture () {
        $("#answerblock").append("<img class='photo' src="  + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);

        var hidPic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;

// runs score screen once all questions have been answered
    if ((wrongCount + correctCount + unanswerCount) === qCount) {
        $("#questionblock").empty();
        $("#questionblock").html("<h3>Game Over! Final scores: </h3>");
        $("#answerblock").append("<h4>Correct: " + correctCount + "</h4>");
        $("#answerblock").append("<h4>Incorrect: " + wrongCount + "</h4>");
        $("#answerblock").append("<h4>Unanswered: " + unanswerCount + "</h4>");
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unanswerCount = 0;

    } else {
        runTimer();
        displayQuestion();

    }
        }, 3000);
    }

// reset function 
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i=0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
  
})