

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


// === 前ページからのデータを読み取って画像を表示 ===
window.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded system2.js");  // ← 追加
  var params = new URLSearchParams(window.location.search);
  var dataParam = params.get("data");
  console.log("dataParam:", dataParam);  // ← 追加

  if (!dataParam) {
    console.log("no data param");
    return;
  }

  try {
    var decoded = decodeURIComponent(dataParam);
    console.log("decoded data:", decoded);  // ← 追加
    var resultData = JSON.parse(decoded);
    console.log("resultData:", resultData);  // ← 追加

    var key = resultData.key || "";
    console.log("key value:", key);  // ← 追加
    // デバッグログ：受け取ったキー
    console.log("received key:", key);

    // --- 表示する画像を決定 ---
    var imgSrc = "";
    if (key === "41") {
      imgSrc = "imgrei/診断1.png";
    } else if (key === "43") {
      imgSrc = "imgrei/診断3.png";
    } else if (key === "44") {
      imgSrc = "imgrei/診断4.png";
    } else if (key === "45") {
      imgSrc = "imgrei/診断5.png";
    } else if (key === "52") {
      imgSrc = "imgrei/診断2.png";
    }

    if (imgSrc === "") {
      console.log("no matching imgSrc for key:", key);
      return;
    }

    var memoryDiv = document.getElementById("memoryMessage");
    if (!memoryDiv) {
      console.log("memoryMessage element not found");
      return;
    }

    // 既存内容をクリア
    memoryDiv.innerHTML = "";

    // 画像要素を作成してロード確認
    var img = new Image();
    img.className = "memory-image";
    img.alt = "前回の結果";

    // onload / onerror を付けて挙動を可視化
    img.onload = function () {
      console.log("image loaded:", imgSrc);
      memoryDiv.appendChild(img);
      // 見せ方用のクラスを付与（CSSで .show を使ってフェード等を制御）
      setTimeout(function () {
        // 追加の show クラスを element 自身に付ける（既存のCSSが #memoryMessage.show .memory-image を想定している場合は memoryDiv に付ける）
        if (memoryDiv.classList) {
          memoryDiv.classList.add("show");
        } else {
          memoryDiv.className += " show";
        }
      }, 100);
    };

    img.onerror = function (e) {
      console.error("image failed to load:", imgSrc, e);
      // フォールバックのテキスト表示
      memoryDiv.textContent = "（結果画像の読み込みに失敗しました）";
    };

    // 画像読み込み開始（パスが正しいかに依存）
    img.src = imgSrc;

  } catch (e) {
    console.error("データの解析に失敗:", e);
  }
});
