window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});

let questions = [
  {
    numb: 1,
    question: "Q1. 当社は何年に設立しましたか？",
    answer: "1987",
    options: ["1987", "1991", "1994"],
  },
  {
    numb: 2,
    question: "Q2. 社長の氏名を選択してください。",
    answer: "山﨑雅人",
    options: ["孫正義", "小澤隆生", "山﨑雅人"],
  },
  {
    numb: 3,
    question: "Q3. 当社のオフィスが位置していない地域を選択してください。",
    answer: "大阪",
    options: ["東京", "大阪", "沖縄"],
  },
  {
    numb: 4,
    question: "Q4. 当社のホスティング事業はいつからですか？",
    answer: "1997年",
    options: ["1992年", "1995年", "1997年"],
  },
  {
    numb: 5,
    question: "Q5. 当社が提供していないサービスを選択してください。",
    answer: "Alexa",
    options: ["Twilio", "Alexa", "ジンドゥー"],
  },
];

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
};

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  next_btn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    next_btn.classList.remove("show"); //hide the next button
  } else {
    showResult(); //calling showResult function
  }
};

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = "<span>" + questions[index].question + "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>";
  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag
  const option = option_list.querySelectorAll(".option");
  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items
  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore == 5) {
    // if user scored is 5
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      '<img src="../img/quiz/all_correct.png"><span><p>早速「新卒採用情報」をチェックしましょう！</p></span><a href="https://recruit.kddi-webcommunications.co.jp/recruitment/fresh/" target="_blank"><button class="recruit">応募サイトへ</button>';
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore == 4) {
    // if user scored is 4
    let scoreTag =
      '<img src="../img/quiz/4_correct.png"><span><p>早速「新卒採用情報」をチェックしましょう！</p></span><a href="https://recruit.kddi-webcommunications.co.jp/recruitment/fresh/" target="_blank"><button class="recruit">応募サイトへ</button>';
    scoreText.innerHTML = scoreTag;
  } else if (userScore <= 3) {
    // if user scored is equal or under 3
    let scoreTag =
      '<img src="../img/quiz/321.png"><span><p>惜しい！もう少し見直してみましょう。</p></span>';
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      '<img src="../img/quiz/zero.png"><span><p>危険！直ちに調べ直しましょう。</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag = "<span><p>" + index + "</p> / <p>" + questions.length;
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
