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

  var quizSection = document.getElementById("quizSection");
  if (quizSection) {
    quizSection.classList.remove("hidden");
    quizSection.classList.add("show");
  }
}

var correctAnswers = [false, false, false, false, false];
var retryLevel = "1";

// === 回答チェック ===
function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  if (event && event.preventDefault) event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextBanner = document.getElementById("nextBanner");

  message.classList.remove("result-correct", "result-wrong");

  // ✅ retry=2 の場合は正解を上書き
  if (retryLevel === "2") {
    var altAnswers = {
      1: "しあい",
      2: "とりえ",
      3: "たかん",
      4: "ことば",
      5: "ありがとう" // 5問目は変わらない例
    };
    if (altAnswers[questionNumber]) {
      correctAnswer = altAnswers[questionNumber];
    }
  }

  // --- retry=2 の特殊コメント処理 ---
  if (retryLevel === "2") {
    if (questionNumber === 1 && userInput === "いあい") {
      message.innerHTML = "（以前これで間違っていた。相手は何と答えたんだろう。）";
      message.classList.add("result-wrong");
      return;
    }
    if (questionNumber === 2 && userInput === "とりこ") {
      message.innerHTML = "（以前これで間違っていた。相手は何と答えたんだろう。）";
      message.classList.add("result-wrong");
      return;
    }
    if (questionNumber === 3 && userInput === "たから") {
      message.innerHTML = "（以前これで間違っていた。相手は何と答えたんだろう。）";
      message.classList.add("result-wrong");
      return;
    }
    if (questionNumber === 4 && userInput === "ことし") {
      message.innerHTML = "（以前これで間違っていた。相手は何と答えたんだろう。）";
      message.classList.add("result-wrong");
      return;
    }
  }

  // --- 通常正解処理 ---
  if (userInput === correctAnswer) {
    message.innerHTML = retryLevel === "2" ? "（よし、これなら...！）" : "（よし、なんだか合っていそう）";
    message.classList.add("result-correct");
    document.getElementById("ans" + questionNumber).disabled = true;

    correctAnswers[questionNumber - 1] = true;

    var allCorrect = correctAnswers.every(function (val) { return val; });
    if (allCorrect) {
      setTimeout(function () {
        nextBanner.style.display = "block";
        setTimeout(function () {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);
    }

  } else if (!message.classList.contains("result-wrong")) {
    message.innerHTML = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}

// === ページ読み込み時 ===
window.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded revised system2.js with alt answers");

  var params = new URLSearchParams(window.location.search);
  retryLevel = params.get("retry") || "1";

  var numMessage = document.getElementById("numMessage");
  if (numMessage) {
    if (retryLevel === "2") {
      numMessage.innerHTML = "（二度目だ。頑張ろう。）";
    } else if (retryLevel === "3") {
      numMessage.innerHTML = "（三度目だ。このままでは、、。）";
    }
  }

  // 全問題を初期表示
  var questions = document.querySelectorAll("[id^='question']");
  for (var i = 0; i < questions.length; i++) {
    questions[i].style.display = "block";
    questions[i].classList.add("show");
  }

  // --- 診断画像表示処理 ---
  var dataParam = params.get("data");
  if (!dataParam) return;

  try {
    var decoded = decodeURIComponent(dataParam);
    var resultData = JSON.parse(decoded);
    var key = resultData.key || "";
    var imgSrc = "";

    if (key === "41") imgSrc = "imgrei/診断1.png";
    else if (key === "43") imgSrc = "imgrei/診断3.png";
    else if (key === "44") imgSrc = "imgrei/診断4.png";
    else if (key === "45") imgSrc = "imgrei/診断5.png";
    else if (key === "52") imgSrc = "imgrei/診断2.png";

    if (!imgSrc) return;

    var memoryDiv = document.getElementById("memoryMessage");
    if (!memoryDiv) return;

    var img = new Image();
    img.className = "memory-image";
    img.src = imgSrc;
    img.alt = "前回の結果";

    img.onload = function () {
      memoryDiv.innerHTML = "";
      memoryDiv.appendChild(img);
      setTimeout(function () {
        memoryDiv.classList.add("show");
      }, 100);
    };

    img.onerror = function () {
      memoryDiv.textContent = "（結果画像の読み込みに失敗しました）";
    };

  } catch (e) {
    console.error("データの解析に失敗:", e);
  }
});

