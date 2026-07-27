// 파일 경로: /js/mental-math.js

/* ==================================================
   암산연습
================================================== */


/* ================================
   HTML 요소 가져오기
================================ */

const mentalMathQuestionNumber =
  document.getElementById("mental-math-question-number");

const mentalMathCorrectCount =
  document.getElementById("mental-math-correct-count");

const mentalMathScore =
  document.getElementById("mental-math-score");

const mentalMathQuestion =
  document.getElementById("mental-math-question");

const mentalMathAnswer =
  document.getElementById("mental-math-answer");

const mentalMathSubmitButton =
  document.getElementById("mental-math-submit-button");

const mentalMathResult =
  document.getElementById("mental-math-result");

const mentalMathNextButton =
  document.getElementById("mental-math-next-button");

const mentalMathStartButton =
  document.getElementById("mental-math-start-button");


/* ================================
   게임 상태
================================ */

let mentalMathGameRunning = false;

let mentalMathQuestionCount = 0;

let mentalMathCorrect = 0;

let mentalMathScoreValue = 0;

let mentalMathCurrentAnswer = null;

let mentalMathAnswered = false;

let mentalMathNextTimer = null;


/* ================================
   게임 시작 버튼
================================ */

mentalMathStartButton.addEventListener("click", function () {
  startMentalMathGame();
});


/* ================================
   정답 확인 버튼
================================ */

mentalMathSubmitButton.addEventListener("click", function () {
  checkMentalMathAnswer();
});


/* ================================
   다음 문제 버튼
================================ */

mentalMathNextButton.addEventListener("click", function () {
  generateMentalMathQuestion();
});


/* ================================
   Enter 키 입력
================================ */

mentalMathAnswer.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkMentalMathAnswer();
  }
});


/* ==================================================
   게임 시작
================================================== */

function startMentalMathGame() {
  if (mentalMathNextTimer !== null) {
    clearTimeout(mentalMathNextTimer);
    mentalMathNextTimer = null;
  }

  mentalMathGameRunning = true;

  mentalMathQuestionCount = 0;

  mentalMathCorrect = 0;

  mentalMathScoreValue = 0;

  mentalMathCurrentAnswer = null;

  mentalMathAnswered = false;

  mentalMathStartButton.textContent = "다시 시작";

  mentalMathSubmitButton.disabled = false;

  mentalMathNextButton.disabled = true;

  mentalMathAnswer.disabled = false;

  mentalMathResult.textContent = "문제를 풀어보세요!";

  mentalMathResult.className = "mental-math-result";

  updateMentalMathStatus();

  generateMentalMathQuestion();
}


/* ==================================================
   문제 생성
================================================== */

function generateMentalMathQuestion() {
  if (!mentalMathGameRunning) {
    return;
  }

  if (mentalMathNextTimer !== null) {
    clearTimeout(mentalMathNextTimer);
    mentalMathNextTimer = null;
  }

  mentalMathAnswered = false;

  mentalMathQuestionCount += 1;

  mentalMathSubmitButton.disabled = false;

  mentalMathNextButton.disabled = true;

  mentalMathAnswer.disabled = false;

  mentalMathAnswer.value = "";

  const problem = createMentalMathProblem();

  mentalMathCurrentAnswer = problem.answer;

  mentalMathQuestion.textContent = problem.question;

  mentalMathResult.textContent = "정답을 입력하고 확인해보세요.";

  mentalMathResult.className = "mental-math-result";

  updateMentalMathStatus();

  mentalMathAnswer.focus();
}


/* ==================================================
   랜덤 문제 생성
================================================== */

function createMentalMathProblem() {
  const operations = [
    "+",
    "-",
    "×",
    "÷"
  ];

  const operation =
    operations[
      Math.floor(
        Math.random() * operations.length
      )
    ];

  let firstNumber;

  let secondNumber;

  let answer;


  /* ================================
     덧셈
  ================================ */

  if (operation === "+") {
    firstNumber = getRandomInteger(1, 99);

    secondNumber = getRandomInteger(1, 99);

    answer = firstNumber + secondNumber;
  }


  /* ================================
     뺄셈
  ================================ */

  else if (operation === "-") {
    firstNumber = getRandomInteger(1, 99);

    secondNumber = getRandomInteger(1, firstNumber);

    answer = firstNumber - secondNumber;
  }


  /* ================================
     곱셈
  ================================ */

  else if (operation === "×") {
    firstNumber = getRandomInteger(2, 20);

    secondNumber = getRandomInteger(2, 12);

    answer = firstNumber * secondNumber;
  }


  /* ================================
     나눗셈
  ================================ */

  else {
    secondNumber = getRandomInteger(2, 12);

    answer = getRandomInteger(1, 20);

    firstNumber = secondNumber * answer;
  }


  return {
    question:
      firstNumber +
      " " +
      operation +
      " " +
      secondNumber +
      " = ?",

    answer: answer
  };
}


/* ==================================================
   정답 확인
================================================== */

function checkMentalMathAnswer() {
  if (!mentalMathGameRunning) {
    return;
  }

  if (mentalMathAnswered) {
    return;
  }

  if (mentalMathAnswer.value.trim() === "") {
    mentalMathResult.textContent = "답을 입력해주세요.";

    mentalMathResult.className =
      "mental-math-result mental-math-warning";

    mentalMathAnswer.focus();

    return;
  }

  const userAnswer = Number(
    mentalMathAnswer.value.trim()
  );

  if (!Number.isFinite(userAnswer)) {
    mentalMathResult.textContent =
      "숫자로 답을 입력해주세요.";

    mentalMathResult.className =
      "mental-math-result mental-math-warning";

    mentalMathAnswer.focus();

    return;
  }

  mentalMathAnswered = true;

  mentalMathSubmitButton.disabled = true;

  mentalMathNextButton.disabled = true;

  mentalMathAnswer.disabled = true;


  /* ================================
     정답
  ================================ */

  if (userAnswer === mentalMathCurrentAnswer) {
    mentalMathCorrect += 1;

    mentalMathScoreValue += 100;

    mentalMathResult.textContent =
      "정답입니다! 현재 정답 수: " +
      mentalMathCorrect +
      "개";

    mentalMathResult.className =
      "mental-math-result mental-math-correct";
  }


  /* ================================
     오답
  ================================ */

  else {
    mentalMathResult.textContent =
      "아쉽습니다. 정답은 " +
      mentalMathCurrentAnswer +
      "입니다.";

    mentalMathResult.className =
      "mental-math-result mental-math-wrong";
  }


  /* ================================
     상태 업데이트
  ================================ */

  updateMentalMathStatus();


  /* ================================
     0.8초 후 자동으로 다음 문제
  ================================ */

  mentalMathNextTimer = setTimeout(
    function () {
      mentalMathNextTimer = null;

      generateMentalMathQuestion();
    },
    800
  );
}


/* ==================================================
   상태 표시 업데이트
================================================== */

function updateMentalMathStatus() {
  mentalMathQuestionNumber.textContent =
    mentalMathQuestionCount;

  mentalMathCorrectCount.textContent =
    mentalMathCorrect;

  mentalMathScore.textContent =
    mentalMathScoreValue;
}


/* ==================================================
   랜덤 정수 생성
================================================== */

function getRandomInteger(min, max) {
  return Math.floor(
    Math.random() *
    (max - min + 1)
    +
    min
  );
}


/* ==================================================
   초기 화면
================================================== */

updateMentalMathStatus();

mentalMathSubmitButton.disabled = true;

mentalMathNextButton.disabled = true;

mentalMathAnswer.disabled = true;