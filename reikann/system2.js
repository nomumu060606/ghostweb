function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextQuestion = document.getElementById("question" + (questionNumber + 1));
  var nextBanner = document.getElementById("nextBanner");

  message.classList.remove("result-correct", "result-wrong");

  if (userInput === correctAnswer) {
    message.textContent = "（よし、なんだか合っていそう）";
    message.classList.add("result-correct");

    // 次の問題をフェードイン
    if (nextQuestion) {
      nextQuestion.style.display = "block";
      setTimeout(function() {
        nextQuestion.classList.add("show");
      }, 100);
    } else {
      // 最後の問題ならバナー表示
      setTimeout(function() {
        nextBanner.style.display = "block";
        setTimeout(function() {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);
    }

    document.getElementById("ans" + questionNumber).disabled = true;

  } else {
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}
