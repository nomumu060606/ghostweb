// === 初期変数 ===
var answersArray = ["0", "0", "0", "0"];   // ユーザーの回答
var sending = false;

// === 選択肢リセット ===
function select_reset(Qnum) {
  var i;
  for (i = 1; i <= 5; i++) {
    var id = Qnum + "_" + i;
    var contents = '<img src="select/' + Qnum + '_' + i + '.png" class="select" alt="選択肢" onclick="select(' + Qnum + ',\'' + i + '\')">';
    document.getElementById(id).innerHTML = contents;
  }
}

// === 選択処理 ===
function select(Qnum, Snum) {
  select_reset(Qnum);
  var id = Qnum + "_" + Snum;
  var contents = '<img src="selected/' + Qnum + '_' + Snum + '.png" class="selected" alt="選択肢">';
  document.getElementById(id).innerHTML = contents;

  answersArray[Qnum - 1] = Snum;

  // 両方回答済みならボタン有効化
  var allAnswered = true;
  for (var j = 0; j < answersArray.length; j++) {
    if (answersArray[j] === "0") allAnswered = false;
  }

  if (allAnswered) {
    document.getElementById("button").disabled = false;
    document.getElementById("message").innerText = "ボタンを押せば回答送信が可能です";
  }
}

// === 判定処理 ===
function check() {
  if (sending) return;
  sending = true;
  document.getElementById("button").disabled = true;
  document.getElementById("message").innerText = "判定中...";

  var answerKey = answersArray.join(""); // 例: ["4","1"] → "41"

  var nextUrl = ""; // 遷移先URLを格納

  // --- パターン別に判定 ---
  if (answerKey === "1211") {
    nextUrl = "https://nomumu060606.github.io/ghostweb/reikann/htmlrei2.html";
  } else if (answerKey === "1213") {
    nextUrl = "https://nomumu060606.github.io/ghostweb/reikann/htmlrei2.html";
  } else if (answerKey === "1214") {
    nextUrl = "https://nomumu060606.github.io/ghostweb/reikann/htmlrei2.html";
  } else if (answerKey === "1215") {
    nextUrl = "https://nomumu060606.github.io/ghostweb/reikann/htmlrei2.html";
  } else if (answerKey === "1212") {
    nextUrl = "https://nomumu060606.github.io/ghostweb/reikann/htmlrei4.html";
  }

  // --- 結果処理 ---
  if (nextUrl !== "") {
    document.getElementById("message").innerText = "全問正解！次のページへ進みます。";

    var resultData = {
      answers: answersArray,
      key: answerKey
    };
    var encoded = encodeURIComponent(JSON.stringify(resultData));

    setTimeout(function () {
      window.location.href = nextUrl + "?data=" + encoded;
    }, 1500);

  } else {
    document.getElementById("message").innerText = "不正解の問題があります。再挑戦してください。";
    sending = false;
    document.getElementById("button").disabled = false;
  }
}
