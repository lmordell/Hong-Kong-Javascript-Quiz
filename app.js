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
    choices: ["Ramen", "Dim Sum", "Pizza", "Spaghetti"],
    correctAnswer: 1
  },

  {
    question: "What does LKF stand for?",
    choices: ["Long Kwan Fung", "Lan Kew Fan", "Lan Kwai Fong"],
    correctAnswer: 2
  }];
  


//Initialize the page
$(document).ready(function() {


  //Defining element variables 
  var welcomeButton = $('#welcomeButton');
  var innerQuizBox = $('#innerQuizBox');
  var questionBox = $('#questionBox');
  var submitButton = $('#submit');
  var backButton = $('#back');


    //Defining counting variables
  var maxQuestions = allQuestions.length;
  var rightAnswers = 0;
  var i = 0;

  //Display questions function
  function displayQuestions() {

    questionBox.append("<p id='question'>" + allQuestions[i].question + "</p>").hide().fadeIn();

    var numOfChoices = allQuestions[i].choices.length;

    for(var j=0; j<= numOfChoices-1; j++) {

      var choice = allQuestions[i].choices[j];
      questionBox.append('<div class=\"choice\"><input type=\"radio\" name=\"answers\" value=' + j + '>' + choice + "<br>" + "</div>");

    }
  }

  //Remove questions function
  function removeQuestions() {
    $('#question').fadeOut().detach(); // remove question
    $('.choice').detach(); // remove choices
  }

  //Displays buttons
  function displayButtons() {
    questionBox.append(submitButton);
    questionBox.append(backButton);
  }

  //Removes buttons
  function removeButtons() {
    submitButton.remove();
    backButton.remove();
  }

submitButton.click(function callback() { //Submit Button

 var answer = ($('input[name="answers"]:checked').val());


    //checks if player checked an answer
    if(answer == undefined) {
      $('.error').show();
      } else {
      $('.error').hide();

      //Check if the value matches the  correct answer
      if (answer == allQuestions[i].correctAnswer) {
        rightAnswers++; //Increase # of right answers
      } 

      removeQuestions();  //Removes previous set of question

      i++ //Increases the counter and moves to the next question

      backButton.show(); //Shows the back button for next question

      // if the last question hasn't been surpassed, keep appending new questions
      if (i < maxQuestions) {
        displayQuestions();
        displayButtons();
      }

      else { // last question surpassed, display the final score
        removeButtons();
        questionBox.append("<div class='msg'><br>" + "<br>" + "You've got " + rightAnswers + " out of " + maxQuestions + " questions right!" + "<br>" + "</div>").hide().fadeIn();
        questionBox.append("<button id=\"tryAgain\" class=\"button msg\">Try Again?</button>");

        //Score Message
        if (rightAnswers === maxQuestions) {
          questionBox.append("<p class='msg'>Perfect Score!</p>");
        } else if (rightAnswers >= 2 && rightAnswers < maxQuestions) {
          questionBox.append("<p class='msg'>Not too bad!</p>");
        } else {
          questionBox.append("<p class='msg'>Yikes! You definietely need to try again!</p>");
        }
      }
}
      //Retake the quiz (Try Again Button)
      var tryAgain = $('#tryAgain');

      tryAgain.click(function() {
        //Reset counters to 0
        i = 0;
        rightAnswers = 0;

        //Remove previous content
        tryAgain.remove();
        $('#questionsRight').remove();
        $('.p').remove();
        backButton.remove();

        //Append first question
        displayQuestions();
        //Recursively call the click handler function on the original click event
        questionBox.append(submitButton.click(function() {
        callback();
        }));
        
        $('#answerMessage').remove();
        backButton.remove();
        $('.msg').remove();
      }); //tryAgain end of input
    }); //submitButton end of input

  //Back Button
  backButton.click(function() {
  removeQuestions();
  i--;
  rightAnswers--;
  displayQuestions();
  displayButtons();

        if (i == 0) {
          backButton.hide();
        } else {
          backButton.show();
        }
      });//End of backButton

//Quiz Start

    //Hide elements before quiz starts
    questionBox.hide();
     $('.error').hide();
    //Initialize the first question upon click
    welcomeButton.click(function() {
      innerQuizBox.hide();
      questionBox.show();
      //Display the questions & buttons
      displayQuestions();
      displayButtons();
      backButton.hide(); //Hide back button for 1st question
    });

});//End of document ready
