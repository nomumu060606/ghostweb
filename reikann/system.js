// JavaScript Document
var answers = "00";
var answersArray = ["0","0"];
var answered = 0;
var i;
var id;
var contents;
var sending = false;
var ans;
var res;

function select_reset(Qnum){
  for(i=1;i<=5;i++){
    id=Qnum+'_'+i;
    contents='<img src="select/'+Qnum+'_'+i+'.png" class="select" alt="選択肢" onclick="select('+Qnum+',String('+i+'))">';
    document.getElementById(id).innerHTML=contents;
  }
}

function select(Qnum,Snum){
  select_reset(Qnum)
  id=Qnum+'_'+Snum;
  contents='<img src="selected/'+Qnum+'_'+Snum+'.png" class="selected" alt="選択肢">';
  document.getElementById(id).innerHTML=contents;

  answersArray[Qnum-1]=Snum;
  answers="";
  for(i=0;i<2;i++){
    answers = answers + answersArray[i];
  }

  answered = 0;
  for(i=0;i<2;i++){
    if(answersArray[i]!="0") answered++;
  }
  if(answered==2){
    document.getElementById('button').disabled = false;
    document.getElementById('message').innerText = "ボタンを押せば回答送信が可能です";
  }

}

function check(){

	if(sending)	return;
	sending = true;
	document.getElementById('button').disabled = true;
	document.getElementById('message').innerText = "判定中";
	
	if(answers=="11"||answers=="13"||answers=="14"||answers=="15"){
    window.location.href = 'https://nomumu060606.github.io/ghostweb/reikann/htmlrei2';}
		
	else{
    document.getElementById('message').innerText = "不正解の問題があるようです";
  }


}

function checkAnswer(){
  event.preventDefault(); // ページのリロードを防ぐ

  ans = document.getElementById("ans").value.trim();
  res = document.getElementById("res");

  if (ans === "ライオン") {
    res.textContent = "🎉 正解です！";
    res.style.color = "green";
  } else {
    res.textContent = "❌ 不正解です。";
    res.style.color = "red";
  }
}
