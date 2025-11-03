// ✅ 正解状況を記録するための配列をグローバル変数で定義
let correctAnswers = [false, false, false, false, false];

function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextBanner = document.getElementById("nextBanner");

  message.classList.remove("result-correct", "result-wrong");

  // --- 特殊な間違いワード処理 ---
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
    message.classList.add("result-correct");
    correctAnswers[questionNumber - 1] = true;
  }

  // --- 正解処理 ---
  if (userInput === correctAnswer) {
    message.textContent = "（よし、これなら...！）";
    message.classList.add("result-correct");
    document.getElementById("ans" + questionNumber).disabled = true;

    // ✅ この問題を「正解」として記録
    correctAnswers[questionNumber - 1] = true;

    // ✅ すべての問題が正解済みならバナー表示
    if (correctAnswers.every(v => v === true)) {
      setTimeout(function() {
        nextBanner.style.display = "block";
        setTimeout(function() {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);
    }

  } else if (
    !(
      (questionNumber === 1 && userInput === "いあい") ||
      (questionNumber === 2 && userInput === "とりこ") ||
      (questionNumber === 3 && userInput === "たから") ||
      (questionNumber === 4 && userInput === "ことし") ||
      (questionNumber === 5 && userInput === "ありがとう")
    )
  ) {
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}
