// === プロフィール保存 ===
function saveProfile(event) {
  event.preventDefault();

  var name = document.getElementById("profileName").value.trim();
  var age = document.getElementById("profileAge").value;
  var food = document.getElementById("profileFood").value;
  var message = document.getElementById("profileSavedMessage");

  if (name.length === 0 || name.length > 5) {
    message.textContent = "⚠ 名前は1〜5文字以内で入力してください。";
    return;
  }
  if (age === "" || food === "") {
    message.textContent = "⚠ すべての項目を選択してください。";
    return;
  }

  var profile = { name: name, age: age, food: food };
  localStorage.setItem("userProfile", JSON.stringify(profile));

  message.textContent = "✅ プロフィールを保存しました！";
  setTimeout(function () { message.textContent = ""; }, 3000);

  // ✅ クイズ全体を表示
  var quizSection = document.getElementById("quizSection");
  if (quizSection) {
    quizSection.classList.remove("hidden");
    quizSection.classList.add("show");
  }
}

// === グローバル変数 ===
var correctAnswers = [false, false, false, false, false];
var correctCount = 0;

// === 答えをチェック ===
function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  if (event && event.preventDefault) event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextBanner = document.getElementById("nextBanner");

  message.classList.remove("result-correct", "result-wrong");

  // ✅ URLパラメータ retry を取得
  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");

  // ✅ retry=2 のとき、答えを変更する
  if (retry === "2") {
    // ここで「第n問の正解」を上書き
    if (questionNumber === 1) correctAnswer = "しあい";
    if (questionNumber === 2) correctAnswer = "とりえ";
    if (questionNumber === 3) correctAnswer = "たかん";
    if (questionNumber === 4) correctAnswer = "ことば";
    if (questionNumber === 5) correctAnswer = "ありがとう";
  }

  if (userInput === correctAnswer) {
    message.textContent = "（よし、なんだか合っていそう）";
    message.classList.add("result-correct");
    correctAnswers[questionNumber - 1] = true;
    correctCount++;

    document.getElementById("ans" + questionNumber).disabled = true;

    // ✅ 全問正解したら結果へ
    if (correctAnswers.every(v => v === true)) {
      setTimeout(function () {
        // ✅ retry=2 のときは result2.html へ、それ以外は result1.html へ
        if (retry === "2") {
          window.location.href = "result2.html";
        } else {
          window.location.href = "result1.html";
        }
      }, 1000);
    }

  } else {
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}

// === ページ読み込み時 ===
window.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded system2.js");

  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");

  // ✅ retry=2 の場合でも、プロフィール保存されていなければ非表示にする
  var quizSection = document.getElementById("quizSection");
  var profile = localStorage.getItem("userProfile");

  if (!profile) {
    // プロフィール未保存 → クイズを隠す
    if (quizSection) quizSection.classList.add("hidden");
  } else {
    // 保存済みならフォームに値を復元
    try {
      var data = JSON.parse(profile);
      document.getElementById("profileName").value = data.name || "";
      document.getElementById("profileAge").value = data.age || "";
      document.getElementById("profileFood").value = data.food || "";

      if (quizSection) {
        quizSection.classList.remove("hidden");
        quizSection.classList.add("show");
      }
    } catch (e) {
      console.error("プロファイル読み込みエラー:", e);
    }
  }

  // ✅ retry=2 の場合のセリフ変更などがあればここに追記
  var numMessage = document.getElementById("numMessage");
  if (numMessage) {
    if (retry === "2") {
      numMessage.textContent = "（二度目だ。今度こそ正しい答えを…）";
    }
  }
});
