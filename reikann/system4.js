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

  // 🔹画像上に反映
  updateAgeDigits(profile.age);
  updateNameOverlay(profile.name);
  updateFoodChars(profile.food);

  message.textContent = "✅ プロフィールを保存しました！";
  setTimeout(function() { message.textContent = ""; }, 3000);

  // ✅ プロフィール保存後、クイズ全体を表示
  var quizSection = document.getElementById("quizSection");
  if (quizSection) {
    quizSection.classList.remove("hidden");
    quizSection.classList.add("show");
  }
}

// === ページ読み込み時 ===
window.addEventListener("DOMContentLoaded", function() {
  var saved = localStorage.getItem("userProfile");
  if (saved) {
    try {
      var profile = JSON.parse(saved);
      if (profile.name) {document.getElementById("profileName").value = profile.name;
						updateNameOverlay(profile.name);}
      if (profile.age) document.getElementById("profileAge").value = profile.age;
      if (profile.food) {
  document.getElementById("profileFood").value = profile.food;
  updateFoodChars(profile.food); // ← これを追加！
}
		

      // 🔹再表示
      updateAgeDigits(profile.age);
      
    } catch (e) {
      console.error("プロフィール復元エラー:", e);
    }
  }
});

// === 年齢の数字を分割して画像に反映 ===
function updateAgeDigits(ageText) {
  var match = ageText.match(/^(\d{2})代$/);
  var overlay1 = document.getElementById("overlayDigit1");
  var overlay2 = document.getElementById("overlayDigit2");

  if (!overlay1 || !overlay2) return;

  if (match) {
    var digits = match[1].split(""); // ["2","0"]など
    overlay1.src = "imgrei/" + digits[0] + ".png";
    overlay2.src = "imgrei/" + digits[1] + ".png";
    overlay1.style.display = "block";
    overlay2.style.display = "block";
  } else {
    overlay1.src = "";
    overlay2.src = "";
    overlay1.style.display = "none";
    overlay2.style.display = "none";
  }
}

// === 名前を画像上に表示 ===
function updateNameOverlay(name) {
  var nameDiv = document.getElementById("nameOverlay");
  if (nameDiv) {
    nameDiv.textContent = name || "";
  }
}



function checkAnswerGeneric(event, questionNumber, correctAnswer) {
  event.preventDefault();

  var userInput = document.getElementById("ans" + questionNumber).value.trim();
  var message = document.getElementById("resultMessage" + questionNumber);
  var nextQuestion = document.getElementById("question" + (questionNumber + 1));
  var nextBanner = document.getElementById("nextBanner");

  if (message) {
    message.classList.remove("result-correct");
    message.classList.remove("result-wrong");
  }

  // 🔸 全角数字を半角に変換
  var normalizedInput = userInput.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  });

  // 🔸 プロフィール取得
  var profile = null;
  var saved = localStorage.getItem("userProfile");
  if (saved) {
    try {
      profile = JSON.parse(saved);
    } catch (e) {
      console.error("プロフィール解析エラー:", e);
    }
  }

  // === 問題1：年齢 ===
  if (questionNumber === 1 && profile && profile.age) {
    var m = profile.age.match(/^(\d{2})代$/);
    if (m) correctAnswer = m[1];
  }

  // === 問題2：名前 ===
  if (questionNumber === 2 && profile && profile.name) {
    correctAnswer = profile.name;
  }

  // === 問題3：嫌いなもの2文字 ===
  if (questionNumber === 3 && profile && profile.food) {
    correctAnswer = profile.food.slice(0, 2);
  }

  // === 特定の誤答 ===
  var specialWrongAnswers = {
    1: ["いあい", "しあい"],
    2: ["とりこ", "とりえ"],
    3: ["たから", "たかん"],
    4: ["ことし", "ことば"],
    5: ["ありがとう"],
	6: [""]
  };

  // ✅ 特別誤答処理
  if (
    specialWrongAnswers[questionNumber] &&
    specialWrongAnswers[questionNumber].indexOf(normalizedInput) !== -1
  ) {
    message.textContent = "（謎都さんはこう答えないだろう...）";
    message.classList.add("result-wrong");
    return;
  }

  // === 問題5専用ロジック ===
  if (questionNumber === 5) {
	// 🔸「こたえろ」系入力の特別処理
  var lowerInput = normalizedInput.toLowerCase(); // 小文字化で統一
  var answerVariants = ["こたえろ", "答えろ", "コタエロ", "答えロ", "こたえロ"];

  if (answerVariants.includes(lowerInput)) {
     message.textContent = "（よし、なんだか合っていそう）";
      message.classList.add("result-correct");
    return;
  }

  }
	
  // === 問題5専用ロジック ===
  if (questionNumber === 6) {
    var validAnswers = ["39", "３９", "さんきゅう", "さんきゅー", "サンキュー", "サンキュウ"];
	// 🔸「こたえろ」系入力の特別処理

    // 全角数字→半角数字
    var normalized = normalizedInput.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });

    // 入力が有効な答えパターンのどれか？
    var isValidAnswer =
      validAnswers.indexOf(userInput) !== -1 || validAnswers.indexOf(normalized) !== -1;

    // プロフィール条件チェック
    var nameOK = profile && (profile.name === "まい" || profile.name === "マイ");
    var foodOK = profile && profile.food === "なす";
    var ageOK = profile && profile.age === "40代";

    if (isValidAnswer && nameOK && foodOK && ageOK) {
      // ✅ 条件完全一致：正解
      message.textContent = "（よし、なんだか合っていそう）";
      message.classList.add("result-correct");

      // バナー表示
      setTimeout(function () {
        nextBanner.style.display = "block";
        setTimeout(function () {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);

      return;
    } else if (isValidAnswer) {
      // ⚠ 条件不一致だが答えは一応正答形式
      message.textContent = "（計算が合わない。）";
      message.classList.add("result-wrong");
      return;
    }
  }

  // === 通常正解処理 ===
  if (normalizedInput === correctAnswer) {
    message.textContent = "（よし、なんだか合っていそう）";
    message.classList.add("result-correct");

    if (nextQuestion) {
      setTimeout(function () {
        nextQuestion.classList.add("show");
      }, 100);
    } else {
      setTimeout(function () {
        setTimeout(function () {
          nextBanner.classList.add("show");
        }, 100);
      }, 500);
    }

  } else {
    // ❌ それ以外は不正解
    message.textContent = "（何か違うような気がする）";
    message.classList.add("result-wrong");
  }
}





// === 前ページからのデータを読み取ってメッセージを表示 ===
window.addEventListener("DOMContentLoaded", function () {
  var ref = document.referrer; // 前のページURL
  var params = new URLSearchParams(window.location.search);
  var dataParam = params.get("data");
  if (!dataParam) return;
	
  // ✅ 「前ページがresult系」のときだけプロフリセット（リロードでは消さない）
  if (
    ref.includes("htmlrei.html") ||
    ref.includes("result1.html") ||
    ref.includes("result2.html")
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

});

// === 嫌いな食べ物の1・2文字目を画像に表示 ===
function updateFoodChars(foodText) {
  var overlay1 = document.getElementById("overlayFood1");
  var overlay2 = document.getElementById("overlayFood2");

  if (!overlay1 || !overlay2) return;

  if (foodText && foodText.length >= 2) {
    overlay1.textContent = foodText.charAt(0);
    overlay2.textContent = foodText.charAt(1);
  } else if (foodText && foodText.length === 1) {
    overlay1.textContent = foodText.charAt(0);
    overlay2.textContent = "";
  } else {
    overlay1.textContent = "";
    overlay2.textContent = "";
  }
}