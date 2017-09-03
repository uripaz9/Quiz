var quiz = {};

$(document).ready(function () {

    //Global variable

    quiz.questionIndex = 0;
    quiz.counter = 0;
    quiz.answerArray = [];
    quiz.emptyAnswerArray = [];
    quiz.questionText = document.getElementById("questionTextId");
    quiz.insertAnswerText = document.getElementsByTagName("label");
    quiz.nextBtn = document.getElementById("nextBtn");
    quiz.radios = document.getElementsByName('answer');
    quiz.sumItems = document.getElementById("sum");

    // Display show/hide state

    document.getElementById("nextBtn").style.display = 'block';
    document.getElementById("submitBtn").style.display = 'none';
    document.getElementById("backBtn").style.display = 'none';
    document.getElementById("questionForm").style.display = 'block';
    document.getElementById("results").style.display = 'none';


    //Get data from json

    $.getJSON("questions.json", function (data) {

        quiz.response = data.questions;

        if (quiz.response.length == 0) {
            console.log("Error")
        } else {
            quiz.displayQuestion();
        }

    });

    //Next question click event

    quiz.nextQuestionClick = function () {
        quiz.checkAnswer();
        quiz.nextQuestionIndex();
        quiz.emptyAnswer();
    };

    //Check if answer true or false

    quiz.checkAnswer = function () {
        for (var i = 0; i < quiz.radios.length; i++) {

            if (quiz.radios[i].checked) {

                if (quiz.radios[i].id === quiz.response[quiz.questionIndex].answer) {
                    quiz.counter += 1;
                    quiz.answerArray.push("<span class='trueAnswer'>" + "Well done!" + "<span>");
                }

                else {
                    quiz.answerArray.push("<span class='wrongAnswer'>" + "Wrong, try again" + "</span>");
                }
            }

            if (quiz.radios[0].checked === false && quiz.radios[1].checked === false && quiz.radios[2].checked === false && quiz.radios[3].checked === false) {
                quiz.emptyAnswerArray.push("empty");
            }

            quiz.radios[i].checked = false;
        }
    };

    // Move to next question

    quiz.nextQuestionIndex = function () {
        if (quiz.questionIndex < quiz.response.length - 1) {
            quiz.questionIndex += 1;
            quiz.displayQuestion();
        }

        else {
            quiz.nextBtn.disabled = true;
            document.getElementById("questionForm").style.display = 'none';
            document.getElementById("nextBtn").style.display = 'none';
            document.getElementById("submitBtn").style.display = 'block';
        }
    };

    //Check if empty answer

    quiz.emptyAnswer = function () {
        if (quiz.emptyAnswerArray.length === 4) {
            quiz.answerArray.push("<span class='forgotAnswer'>" + "Oops, you probably forgot to answer" + "<span>");
        }
        quiz.emptyAnswerArray.length = 0;
    };

    // Submit button event

    quiz.submitAnswer = function () {
        document.getElementById("count").innerHTML = quiz.counter;

        quiz.sumItems.innerHTML = '';
        for (var i = 0; i < quiz.response.length; i++) {
            quiz.sumLine = document.createElement("li");
            quiz.sumLine.innerHTML = "<p class='questionItem'>" + quiz.response[i].question + "</p>" + "<p class='answerFeedback'>" + quiz.answerArray[i] + "</p>";
            quiz.sumItems.appendChild(quiz.sumLine);
        }

        document.getElementById("questionForm").style.display = 'none';
        document.getElementById("submitBtn").style.display = 'none';
        document.getElementById("backBtn").style.display = 'block';
        document.getElementById("results").style.display = 'block';
    };

    // Back button event

    quiz.backBtn = function () {
        quiz.questionIndex = 0;
        quiz.answerArray = [];
        quiz.emptyAnswerArray = [];
        quiz.nextBtn.disabled = false;
        quiz.displayQuestion();
        document.getElementById("questionForm").style.display = 'block';
        document.getElementById("nextBtn").style.display = 'block';
        document.getElementById("submitBtn").style.display = 'none';
        document.getElementById("backBtn").style.display = 'none';
        document.getElementById("results").style.display = 'none';
    };

    //Display question

    quiz.displayQuestion = function () {

        for (var i = 0; i < quiz.response[quiz.questionIndex].choices.length; i++) {

            quiz.questionText.innerHTML = quiz.response[quiz.questionIndex].question;
            quiz.lableAttr = document.getElementsByTagName("label")[i].getAttribute("for");

            if (quiz.lableAttr === ("answer-" + (1 + i))) {
                quiz.insertAnswerText[i].innerHTML = quiz.response[quiz.questionIndex].choices[i].text;
            }
        }
    };

})
;