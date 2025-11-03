

// === プロフィール保存 ===
function saveProfile(event) {
  event.preventDefault();

  var name = document.getElementById("profileName").value.trim();
  var age = document.getElementById("profileAge").value;
  var food = document.getElementById("profileFood").value;
  var message = document.getElementById("profileSavedMessage");

  if (name.length === 0 || name.length > 3) {
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
  setTimeout(function() { message.textContent = ""; }, 3000);

  // ✅ プロフィール保存後、クイズ全体を表示
  var quizSection = document.getElementById("quizSection");
  if (quizSection) {
    quizSection.classList.remove("hidden");
    quizSection.classList.add("show");
  }
}




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
      msg = "あなたはとても慎重な人間のようですね。";
    } else if (key === "43") {
      msg = "あなたはとても屈強な人間のようですね。";
    } else if (key === "44") {
      msg = "あなたはとても信仰深い人間のようですね。";
    } else if (key === "45") {
      msg = "あなたは恐れ知らずな人間のようですね。";
    } else if (key === "52") {
      msg = "ようこそ霊のあなたをサポートいたします。";
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
