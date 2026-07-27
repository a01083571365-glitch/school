// 파일 경로: /js/rps.js

// ================================
// 가위바위보 게임
// ================================


// ================================
// 가위바위보 선택 정보
// ================================

const choices = {
  scissors: {
    name: "가위",
    emoji: "✌️"
  },

  rock: {
    name: "바위",
    emoji: "✊"
  },

  paper: {
    name: "보",
    emoji: "🖐️"
  }
};


// ================================
// 저장된 점수 불러오기
// ================================

const savedScore = JSON.parse(
  localStorage.getItem("rpsScore")
) || {
  win: 0,
  lose: 0,
  draw: 0
};


let winScore = savedScore.win;
let loseScore = savedScore.lose;
let drawScore = savedScore.draw;


// ================================
// HTML 요소 가져오기
// ================================

const playerChoiceElement =
  document.getElementById("player-choice");

const playerChoiceTextElement =
  document.getElementById("player-choice-text");

const computerChoiceElement =
  document.getElementById("computer-choice");

const computerChoiceTextElement =
  document.getElementById("computer-choice-text");

const gameResultElement =
  document.getElementById("game-result");

const winScoreElement =
  document.getElementById("win-score");

const loseScoreElement =
  document.getElementById("lose-score");

const drawScoreElement =
  document.getElementById("draw-score");

const choiceButtons =
  document.querySelectorAll(".rps-choice-button");

const rpsGameSection =
  document.querySelector(".rps-game-section");


// ================================
// 전적 초기화 버튼 생성
// ================================

const resetButton =
  document.createElement("button");

resetButton.type =
  "button";

resetButton.textContent =
  "전적 초기화";

resetButton.className =
  "rps-reset-button";


// 점수판 아래에 버튼 추가
if (rpsGameSection) {

  rpsGameSection.appendChild(
    resetButton
  );

}


// ================================
// 컴퓨터 선택
// ================================

function getComputerChoice() {

  const choiceKeys =
    Object.keys(choices);

  const randomIndex =
    Math.floor(
      Math.random() *
      choiceKeys.length
    );

  return choiceKeys[randomIndex];
}


// ================================
// 승부 판정
// ================================

function getGameResult(
  playerChoice,
  computerChoice
) {

  // 같은 선택이면 무승부
  if (
    playerChoice ===
    computerChoice
  ) {

    return "draw";

  }


  // 플레이어 승리 조건
  if (
    (
      playerChoice === "scissors" &&
      computerChoice === "paper"
    ) ||

    (
      playerChoice === "rock" &&
      computerChoice === "scissors"
    ) ||

    (
      playerChoice === "paper" &&
      computerChoice === "rock"
    )
  ) {

    return "win";

  }


  // 그 외에는 패배
  return "lose";
}


// ================================
// 점수 저장
// ================================

function saveScore() {

  localStorage.setItem(
    "rpsScore",

    JSON.stringify({
      win: winScore,
      lose: loseScore,
      draw: drawScore
    })
  );

}


// ================================
// 점수판 업데이트
// ================================

function updateScore() {

  winScoreElement.textContent =
    winScore;

  loseScoreElement.textContent =
    loseScore;

  drawScoreElement.textContent =
    drawScore;

}


// ================================
// 결과 표시
// ================================

function updateGameResult(
  result
) {

  // 이전 결과 상태 제거
  gameResultElement.classList.remove(
    "rps-win",
    "rps-lose",
    "rps-draw"
  );


  if (result === "win") {

    gameResultElement.textContent =
      "승리했습니다!";

    gameResultElement.classList.add(
      "rps-win"
    );

    winScore++;


  } else if (result === "lose") {

    gameResultElement.textContent =
      "아쉽네요! 패배했습니다.";

    gameResultElement.classList.add(
      "rps-lose"
    );

    loseScore++;


  } else {

    gameResultElement.textContent =
      "무승부입니다!";

    gameResultElement.classList.add(
      "rps-draw"
    );

    drawScore++;

  }


  updateScore();

  saveScore();


  // 결과 애니메이션 재실행
  gameResultElement.classList.remove(
    "rps-result-animation"
  );


  void gameResultElement.offsetWidth;


  gameResultElement.classList.add(
    "rps-result-animation"
  );

}


// ================================
// 선택 결과 애니메이션
// ================================

function animateChoice(
  element
) {

  element.classList.remove(
    "rps-choice-animation"
  );


  // 애니메이션을 다시 실행하기 위한 처리
  void element.offsetWidth;


  element.classList.add(
    "rps-choice-animation"
  );

}


// ================================
// 게임 한 판 실행
// ================================

function playGame(
  playerChoice
) {

  // 컴퓨터 선택
  const computerChoice =
    getComputerChoice();


  // 승부 판정
  const result =
    getGameResult(
      playerChoice,
      computerChoice
    );


  // 플레이어 선택 표시
  playerChoiceElement.textContent =
    choices[playerChoice].emoji;

  playerChoiceTextElement.textContent =
    choices[playerChoice].name;


  // 컴퓨터 선택 표시
  computerChoiceElement.textContent =
    choices[computerChoice].emoji;

  computerChoiceTextElement.textContent =
    choices[computerChoice].name;


  // 선택 결과 애니메이션
  animateChoice(
    playerChoiceElement
  );

  animateChoice(
    computerChoiceElement
  );


  // 모든 버튼의 선택 상태 제거
  choiceButtons.forEach(
    function(button) {

      button.classList.remove(
        "rps-selected"
      );

    }
  );


  // 현재 선택 버튼 표시
  const selectedButton =
    document.querySelector(
      '[data-choice="' +
      playerChoice +
      '"]'
    );


  if (selectedButton) {

    selectedButton.classList.add(
      "rps-selected"
    );

  }


  // 게임 결과 표시
  updateGameResult(
    result
  );

}


// ================================
// 선택 버튼 이벤트
// ================================

choiceButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const playerChoice =
          button.dataset.choice;

        playGame(
          playerChoice
        );

      }
    );

  }
);


// ================================
// 전적 초기화
// ================================

resetButton.addEventListener(
  "click",
  function() {

    const shouldReset =
      confirm(
        "저장된 가위바위보 전적을 모두 초기화할까요?"
      );


    if (!shouldReset) {

      return;

    }


    // 점수 초기화
    winScore = 0;
    loseScore = 0;
    drawScore = 0;


    // 저장 데이터 삭제
    localStorage.removeItem(
      "rpsScore"
    );


    // 화면 점수 초기화
    updateScore();


    // 선택 결과 초기화
    playerChoiceElement.textContent =
      "?";

    playerChoiceTextElement.textContent =
      "선택해주세요";


    computerChoiceElement.textContent =
      "?";

    computerChoiceTextElement.textContent =
      "대기 중";


    // 결과 문구 초기화
    gameResultElement.textContent =
      "가위, 바위, 보 중 하나를 선택하세요!";


    // 결과 상태 제거
    gameResultElement.classList.remove(
      "rps-win",
      "rps-lose",
      "rps-draw",
      "rps-result-animation"
    );


    // 선택된 버튼 상태 제거
    choiceButtons.forEach(
      function(button) {

        button.classList.remove(
          "rps-selected"
        );

      }
    );

  }
);


// ================================
// 페이지를 처음 열었을 때 점수 표시
// ================================

updateScore();