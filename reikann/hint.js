//チェックボックスの要素を取得
const checkboxes = document.querySelectorAll(".checkbox");

//味見
console.log(checkboxes[0]);
//checkboxクラスがついた最初の要素
//→つまり<input type="checkbox" value="apple" class="checkbox">が取得できる

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    //velueという変数に、取得した（つまりチェックされた）inputタグのvalue値を代入→りんごにチェックをいれたら、「apple」が代入される
    const value = checkbox.value;
    //correspondingDivという変数に、変数valueと同じクラス名をもつ要素を取得して代入→りんごにチェックをいれる→appleがvalueに代入→.appleのついた要素を取得
    const correspondingDiv = document.querySelector(`.${value}`);
    
    if(checkbox.checked) {
      //チェックボックスがオンの時
      correspondingDiv.classList.add("selected");
    } else {
      //チェックボックスがオフの時
     correspondingDiv.classList.remove("selected");
    }
  });
});



