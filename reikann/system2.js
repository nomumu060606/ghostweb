// === プロフィール保存 ===
function saveProfile(event) {
  if (event && event.preventDefault) event.preventDefault();

  var name = document.getElementById("profileName").value.trim();
  var age = document.getElementById("profileAge").value;
  var food = document.getElementById("profileFood").value;
  var message = document.getElementById("profileSavedMessage");

  if (name.length === 0 || name.length > 3) {
    message.textContent = "⚠ 名前は1〜3文字以内で入力してください。";
    return;
  }
  if (age === "" || food === "") {
    message.textContent = "⚠ すべての項目を選択してください。";
    return;
  }

  var profile = { name: name, age: age, food: food };
  localStorage.setItem("userProfile", JSON.stringify(profile));

  message.textContent = "✅ プロフィールを保存しました！";
  setTimeout(function () {
    message.textContent = "";
  }, 3000);

  // ✅ クイズエリアを表示
  var quizSection = document.getElementById("quizSection");
  quizSection.classList.remove("hidden");
  quizSection.classList.add("show");

  // ✅ 全問を表示（hiddenを外す）
  for (var i = 1; i <= 5; i++) {
    var q = document.getElementById("question" + i);
    if (q) {
      q.classList.remove("hidden");
      q.classList.add("show");
    }
  }
}

var correctAnswers = [false, false, false, false, false];

// === 答えチェック ===
// === 答えチェック ===
function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  if (event && event.preventDefault) event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");

  // ✅ retry=2 の時は正解セットを上書き
  if (retry === "2") {
    var retryAnswers = ["しあい", "とりえ", "たかん", "ことば", "ありがとう"];
    correctAnswer = retryAnswers[questionNumber - 1];
  }

  message.classList.remove("result-correct", "result-wrong");

  if (userInput === correctAnswer) {
    message.textContent = "（よし、なんだか合っていそう）";
    message.classList.add("result-correct");
    correctAnswers[questionNumber - 1] = true;

    document.getElementById("ans" + questionNumber).disabled = true;

    // ✅ 全問正解チェック
    var allCorrect = true;
    for (var i = 0; i < correctAnswers.length; i++) {
      if (!correctAnswers[i]) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      // ✅ result1/result2 へのリンク先を設定してバナー表示
      var nextBanner = document.getElementById("nextBanner");
      var nextImg = nextBanner.querySelector("img");

      if (retry === "2") {
        nextImg.setAttribute("onclick", "window.location.href='result2.html'");
      } else {
        nextImg.setAttribute("onclick", "window.location.href='result1.html'");
      }

      nextBanner.style.display = "block";
      nextBanner.classList.add("show");

      message.textContent = "（……どうやら、全て正しく解けたようだ）";
    }
  } else {
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}


// === ページ読み込み時 ===
window.addEventListener("DOMContentLoaded", function () {
  // ✅ ページ読み込み時にプロフィール情報をリセット
  localStorage.removeItem("userProfile");

  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");
  var quizSection = document.getElementById("quizSection");
  var profile = localStorage.getItem("userProfile");

  if (!profile) {
    quizSection.classList.add("hidden");
  } else {
    try {
      var data = JSON.parse(profile);
      document.getElementById("profileName").value = data.name || "";
      document.getElementById("profileAge").value = data.age || "";
      document.getElementById("profileFood").value = data.food || "";

      quizSection.classList.remove("hidden");
      quizSection.classList.add("show");

      for (var i = 1; i <= 5; i++) {
        var q = document.getElementById("question" + i);
        if (q) {
          q.classList.remove("hidden");
          q.classList.add("show");
        }
      }
    } catch (e) {
      console.error("プロファイル読み込みエラー:", e);
    }
  }

  var numMessage = document.getElementById("numMessage");
  if (numMessage && retry === "2") {
    numMessage.textContent = "（二度目の挑戦。今度こそ正しい答えを…）";
  }
});

