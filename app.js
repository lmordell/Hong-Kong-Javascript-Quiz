//Quiz Questions contained in an array
var allQuestions = [{
    question: "In which part of Hong Kong can Sai Kung be found?",
    choices: ["Hong Kong Island", "Kowloon", "The New Territories"],
    correctAnswer: 2
  },

  {
    question: "What flower represents Hong Kong?",
    choices: ["The Bauhinia", "Roses", "Lillies"],
    correctAnswer: 0
  },

  {
    question: "What food is Hong Kong famous for?",
    choices: ["Ramen", "Dim Sum", "Pizza"],
    correctAnswer: 1
  },

  {
    question: "What does LKF stand for?",
    choices: ["Long Kwan Fung", "Lan Kew Fan", "Lan Kwai Fong"],
    correctAnswer: 2
  }
];

//Initialize the page
$(document).ready(function() {

  //Defining element variables 
  var welcomeButton = $('#welcomeButton');
  var innerQuizBox = $('#innerQuizBox');
  var questionBox = $('#questionBox');
  var submitButton = $('#submit');
  var tryAgain = $('#tryAgain');

  //Hide elements before quiz starts
  questionBox.hide();
  //Initialize the first question upon click
  welcomeButton.click(function() {
    innerQuizBox.hide();
    questionBox.show();
  });

  //Defining counting variables
  var maxQuestions = allQuestions.length;
  var rightAnswers = 0;
  var i = 0;

  //Display the questions
  questionBox.append("<p id='question'>" + allQuestions[i].question + "</p>");
  questionBox.append("<div id=\"ch1\"><input type='radio' name='answers' value=0>" + allQuestions[i].choices[0] + "</div>");
  questionBox.append("<div id=\"ch2\"><input type='radio' name='answers' value=1>" + allQuestions[i].choices[1] + "</div>");
  questionBox.append("<div id=\"ch3\"><input type='radio' name='answers' value=2>" + allQuestions[i].choices[2] + "</div>");
  questionBox.append(submitButton);



  submitButton.click(function callback() {

    var answer = ($('input[name="answers"]:checked').val());
    //CHeck if the value matches the  correct answer
    if (answer == allQuestions[i].correctAnswer) {
      //Increase # of right answers
      rightAnswers++;
    }

    //Removes previous set of question
    $('#question').remove(); // remove question
    $('#ch1').remove(); // remove choice1
    $('#ch2').remove(); // remove choice2
    $('#ch3').remove(); // remove choice3

    //Increases the counter and moves to the next question
    i++

    // if the last question hasn't been surpassed, keep appending new questions
    if (i < maxQuestions) {
      questionBox.append("<p id='question'>" + allQuestions[i].question + "</p>");
      questionBox.append("<div id=\"ch1\"><input type='radio' name='answers' value=0>" + allQuestions[i].choices[0] + "</div>");
      questionBox.append("<div id=\"ch2\"><input type='radio' name='answers' value=1>" + allQuestions[i].choices[1] + "</div>");
      questionBox.append("<div id=\"ch3\"><input type='radio' name='answers' value=2>" + allQuestions[i].choices[2] + "</div>");
      questionBox.append(submitButton);
    }
    // last question surpassed, display the final score
    else {
      $('#submit').remove();
      questionBox.append("<div id=\"questionsRight\"><br>" + "<br>" + "You've got " + rightAnswers + " out of " + maxQuestions + " questions right!" + "<br>" + "</div>");
      questionBox.append("<button id=\"tryAgain\" class=\"button\">Try Again?</button>");

      //Score Message
      if (rightAnswers === 4) {
        questionBox.append("<p class=\"p\">Perfect Score!</p>");
      } else if (rightAnswers >= 2 && rightAnswers <= 3) {
        questionBox.append("<p class=\"p\">Not too bad!</p>");
      } else {
        questionBox.append("<p class=\"p\">Yikes! You definietely need to try again!</p>");
      }
    }


    //Retake the quiz
    var tryAgain = $('#tryAgain');

    tryAgain.click(function() {
      //Reset counters to 0
      i = 0;
      rightAnswers = 0;

      //Remove previous content
      tryAgain.remove();
      $('#questionsRight').remove();
      $('.p').remove();

      questionBox.append("<p id='question'>" + allQuestions[i].question + "</p>");
      questionBox.append("<div id=\"ch1\"><input type='radio' name='answers' value=0>" + allQuestions[i].choices[0] + "</div>");
      questionBox.append("<div id=\"ch2\"><input type='radio' name='answers' value=1>" + allQuestions[i].choices[1] + "</div>");
      questionBox.append("<div id=\"ch3\"><input type='radio' name='answers' value=2>" + allQuestions[i].choices[2] + "</div>");
      //Recursively call the click handler function on the original click event
      questionBox.append(submitButton.click(function() {
        callback();
        $('#answerMessage').remove();
      }));
      //tryAgain button end of input
    });


    //submitButton end of input
  });


  //End of document ready
});
