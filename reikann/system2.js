// === 前ページからのデータを読み取ってメッセージを表示 ===
window.addEventListener("DOMContentLoaded", function () {
  var params = new URLSearchParams(window.location.search);
  var dataParam = params.get("data");
  if (!dataParam) return;

  try {
    var decoded = decodeURIComponent(dataParam);
    var resultData = JSON.parse(decoded);
    var key = resultData.key || "";
    var answers = resultData.answers || [];

    // --- 表示するメッセージを決定 ---
    var msg = "";
    if (key === "41") {
      msg = "（前回は冷静な判断で正解を導いたようだ。）";
    } else if (key === "43") {
      msg = "（以前も鋭い直感を見せていたようだ…）";
    } else if (key === "44") {
      msg = "（この前も神秘的な雰囲気を感じたな…）";
    } else if (key === "45") {
      msg = "（前回も良いバランス感覚を見せていた。）";
    } else if (key === "52") {
      msg = "（強い霊感を感じる…あの時の感覚に似ている。）";
    }

    // --- メッセージを表示 ---
    if (msg !== "") {
      var memoryDiv = document.getElementById("memoryMessage");
      if (memoryDiv) {
        memoryDiv.textContent = msg;
        setTimeout(function () {
          memoryDiv.classList.add("show");
        }, 100);
      }
    }

  } catch (e) {
    console.error("データの解析に失敗:", e);
  }
});


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

