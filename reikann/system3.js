function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextQuestion = document.getElementById("question" + (questionNumber + 1));
  var nextBanner = document.getElementById("nextBanner");

  message.classList.remove("result-correct", "result-wrong");
	
	if (questionNumber === 1 && userInput === "いあい") {
    message.textContent = "（以前これで間違っていた。相手は何と答えたんだろう。）";
    message.classList.add("result-wrong");
    return;
  }

  if (questionNumber === 2 && userInput === "とりこ") {
    message.textContent = "（以前これで間違っていた。相手は何と答えたんだろう。）";
    message.classList.add("result-wrong");
    return;
  }
	if (questionNumber === 3 && userInput === "たから") {
    message.textContent = "（以前これで間違っていた。相手は何と答えたんだろう。）";
    message.classList.add("result-wrong");
    return;
  }
	if (questionNumber === 4 && userInput === "ことし") {
    message.textContent = "（以前これで間違っていた。相手は何と答えたんだろう。）";
    message.classList.add("result-wrong");
    return;
  }
	if (questionNumber === 5 && userInput === "ありがとう") {
    message.textContent = "（以前もここは合っていた。これで間違いない。）";
    message.classList.add("result-wrong");
    return;
  }
	
  if (userInput === correctAnswer && questionNumber !== 5) {
    message.textContent = "（よし、これなら...！）";
    message.classList.add("result-correct");

    document.getElementById("ans" + questionNumber).disabled = true;

  }else {
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
	
	if (nextQuestion) {
		return;
    } else {
      // 最後の問題ならバナー表示
      setTimeout(function() {
        nextBanner.style.display = "block";
        setTimeout(function() {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);
    }
}
