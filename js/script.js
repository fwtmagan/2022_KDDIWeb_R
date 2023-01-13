class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

let questions = [
  new Question("Q1. 当社は何年に設立しましたか？", ["1987", "1991", "1994"], "1987"),
  new Question("Q2. 社長の氏名を選択してください。", ["孫正義", "小澤隆生", "山﨑雅人"], "山﨑雅人"),
  new Question("Q3. 当社のオフィスが位置していない地域を選択してください。", ["東京", "大阪", "沖縄"], "大阪"),
  new Question("Q4. 当社のホスティング事業はいつからですか？", ["1992年", "1995年", "1997年"], "1997年"),
  new Question("Q5. 当社が提供していないサービスを選択してください。", ["Twilio", "Alexa", "ジンドゥー"], "Alexa")
];

console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Regroup all  functions relative to the App Display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function () {
    endQuizHTML = `
      <p>早速「新卒採用情報」をチェックしましょう！</p>
      <h3> 答對題數 : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
    btnReset.addEventListener("click", init, false);
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      }
    }
    // display choices and handle guess
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " / " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);