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

  // ✅ クイズエリアを表示（6問すべて）
  var quizSection = document.getElementById("quizSection");
  quizSection.classList.remove("hidden");
  quizSection.classList.add("show");

  for (var i = 1; i <= 6; i++) {
    var q = document.getElementById("question" + i);
    if (q) q.classList.remove("hidden");
  }
}

var correctAnswers = [false, false, false, false, false, false];

// === 答えチェック ===
function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  if (event && event.preventDefault) event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var message2 = document.getElementById("resultMessage2" + questionNumber);
  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");

  // ✅ retry=2 の時の答えセット
  if (retry === "2") {
    var retryAnswers = ["しあい", "とりえ", "たかん", "ことば", "ありがとう", "ありがとう"];
    correctAnswer = retryAnswers[questionNumber - 1];
  }

  message.classList.remove("result-correct", "result-wrong");
  

  // ✅ retry=2かつ「前回の正解（いあい・とりこ・たから・ことし）」を入力した場合
  if (
    retry === "2" &&
    (
      (questionNumber === 1 && userInput === "いあい") ||
      (questionNumber === 2 && userInput === "とりこ") ||
      (questionNumber === 3 && userInput === "たから") ||
      (questionNumber === 4 && userInput === "ことし")
    )
  ) {
    message.textContent = "（ゆうさんは何と答えたのだろうか）";
    message.classList.add("result-wrong");
    return; // ✅ 他の処理をスキップ
  }

  // ✅ 通常の正解処理
  if (userInput === correctAnswer) {
    message.textContent = "（よし、なんだか合っていそう）";
    message2.textContent = correctAnswer;
    message.classList.add("result-correct");
    correctAnswers[questionNumber - 1] = true;
    document.getElementById("ans" + questionNumber).disabled = true;

    // ✅ 全問正解チェック
    if (correctAnswers.every(Boolean)) {
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
  var ref = document.referrer; // 前のページURL

  // ✅ 「前ページが htmlrei2 / result1 / result2 以外」ならリセット
  
  var params = new URLSearchParams(window.location.search);
  var retry = params.get("retry");

  // ✅ 「前ページがresult系」のときだけプロフリセット（リロードでは消さない）
  if (
    !ref.includes("htmlrei2.html") &&
    !ref.includes("result1.html") &&
    !ref.includes("result2.html")
  ) {
    localStorage.removeItem("userProfile");
  }

  var profile = localStorage.getItem("userProfile");
  var quizSection = document.getElementById("quizSection");

  if (!profile) {
    // 🔹 プロフィール未登録 → クイズ非表示
    quizSection.classList.add("hidden");
  } else {
    // 🔹 プロフィールあり → 復元してクイズ全表示
    try {
      var data = JSON.parse(profile);
      document.getElementById("profileName").value = data.name || "";
      document.getElementById("profileAge").value = data.age || "";
      document.getElementById("profileFood").value = data.food || "";

      quizSection.classList.remove("hidden");
      quizSection.classList.add("show");

      for (var i = 1; i <= 6; i++) {
        var q = document.getElementById("question" + i);
        if (q) q.classList.remove("hidden");
      }
    } catch (e) {
      console.error("プロファイル読み込みエラー:", e);
    }
  }

  // ✅ retry=2メッセージ
  var numMessage = document.getElementById("numMessage");
  if (numMessage && retry === "2") {
    numMessage.textContent = "（二度目の挑戦。今度こそ正しい答えを…）";
  }
});



