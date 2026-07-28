// 파일 경로: /js/periodic-table.js

/* ==================================================
   원소주기율표 게임
================================================== */


/* ==================================================
   HTML 요소 가져오기
================================================== */

const periodicTable =
  document.getElementById(
    "periodic-table"
  );

const periodicTableAnswerCards =
  document.getElementById(
    "periodic-table-answer-cards"
  );

const periodicTableQuestionNumber =
  document.getElementById(
    "periodic-table-question-number"
  );

const periodicTableCorrectCount =
  document.getElementById(
    "periodic-table-correct-count"
  );

const periodicTableScore =
  document.getElementById(
    "periodic-table-score"
  );

const periodicTableQuestion =
  document.getElementById(
    "periodic-table-question"
  );

const periodicTableResult =
  document.getElementById(
    "periodic-table-result"
  );

const periodicTableNextButton =
  document.getElementById(
    "periodic-table-next-button"
  );

const periodicTableStartButton =
  document.getElementById(
    "periodic-table-start-button"
  );


/* ==================================================
   게임 상태
================================================== */

let periodicTableGameRunning =
  false;

let periodicTableQuestionCount =
  0;

let periodicTableCorrect =
  0;

let periodicTableScoreValue =
  0;

let periodicTableCurrentElement =
  null;

let periodicTableAnswered =
  false;

let periodicTableNextTimer =
  null;


/* ==================================================
   원소 데이터
================================================== */

const periodicTableElements = [

  {
    number: 1,
    symbol: "H",
    name: "수소"
  },

  {
    number: 2,
    symbol: "He",
    name: "헬륨"
  },

  {
    number: 3,
    symbol: "Li",
    name: "리튬"
  },

  {
    number: 4,
    symbol: "Be",
    name: "베릴륨"
  },

  {
    number: 5,
    symbol: "B",
    name: "붕소"
  },

  {
    number: 6,
    symbol: "C",
    name: "탄소"
  },

  {
    number: 7,
    symbol: "N",
    name: "질소"
  },

  {
    number: 8,
    symbol: "O",
    name: "산소"
  },

  {
    number: 9,
    symbol: "F",
    name: "플루오린"
  },

  {
    number: 10,
    symbol: "Ne",
    name: "네온"
  },

  {
    number: 11,
    symbol: "Na",
    name: "나트륨"
  },

  {
    number: 12,
    symbol: "Mg",
    name: "마그네슘"
  },

  {
    number: 13,
    symbol: "Al",
    name: "알루미늄"
  },

  {
    number: 14,
    symbol: "Si",
    name: "규소"
  },

  {
    number: 15,
    symbol: "P",
    name: "인"
  },

  {
    number: 16,
    symbol: "S",
    name: "황"
  },

  {
    number: 17,
    symbol: "Cl",
    name: "염소"
  },

  {
    number: 18,
    symbol: "Ar",
    name: "아르곤"
  },

  {
    number: 19,
    symbol: "K",
    name: "칼륨"
  },

  {
    number: 20,
    symbol: "Ca",
    name: "칼슘"
  },

  {
    number: 21,
    symbol: "Sc",
    name: "스칸듐"
  },

  {
    number: 22,
    symbol: "Ti",
    name: "티타늄"
  },

  {
    number: 23,
    symbol: "V",
    name: "바나듐"
  },

  {
    number: 24,
    symbol: "Cr",
    name: "크로뮴"
  },

  {
    number: 25,
    symbol: "Mn",
    name: "망가니즈"
  },

  {
    number: 26,
    symbol: "Fe",
    name: "철"
  },

  {
    number: 27,
    symbol: "Co",
    name: "코발트"
  },

  {
    number: 28,
    symbol: "Ni",
    name: "니켈"
  },

  {
    number: 29,
    symbol: "Cu",
    name: "구리"
  },

  {
    number: 30,
    symbol: "Zn",
    name: "아연"
  },

  {
    number: 31,
    symbol: "Ga",
    name: "갈륨"
  },

  {
    number: 32,
    symbol: "Ge",
    name: "저마늄"
  },

  {
    number: 33,
    symbol: "As",
    name: "비소"
  },

  {
    number: 34,
    symbol: "Se",
    name: "셀레늄"
  },

  {
    number: 35,
    symbol: "Br",
    name: "브로민"
  },

  {
    number: 36,
    symbol: "Kr",
    name: "크립톤"
  },

  {
    number: 37,
    symbol: "Rb",
    name: "루비듐"
  },

  {
    number: 38,
    symbol: "Sr",
    name: "스트론튬"
  },

  {
    number: 39,
    symbol: "Y",
    name: "이트륨"
  },

  {
    number: 40,
    symbol: "Zr",
    name: "지르코늄"
  },

  {
    number: 41,
    symbol: "Nb",
    name: "나이오븀"
  },

  {
    number: 42,
    symbol: "Mo",
    name: "몰리브데넘"
  },

  {
    number: 43,
    symbol: "Tc",
    name: "테크네튬"
  },

  {
    number: 44,
    symbol: "Ru",
    name: "루테늄"
  },

  {
    number: 45,
    symbol: "Rh",
    name: "로듐"
  },

  {
    number: 46,
    symbol: "Pd",
    name: "팔라듐"
  },

  {
    number: 47,
    symbol: "Ag",
    name: "은"
  },

  {
    number: 48,
    symbol: "Cd",
    name: "카드뮴"
  },

  {
    number: 49,
    symbol: "In",
    name: "인듐"
  },

  {
    number: 50,
    symbol: "Sn",
    name: "주석"
  },

  {
    number: 51,
    symbol: "Sb",
    name: "안티모니"
  },

  {
    number: 52,
    symbol: "Te",
    name: "텔루륨"
  },

  {
    number: 53,
    symbol: "I",
    name: "아이오딘"
  },

  {
    number: 54,
    symbol: "Xe",
    name: "제논"
  },

  {
    number: 55,
    symbol: "Cs",
    name: "세슘"
  },

  {
    number: 56,
    symbol: "Ba",
    name: "바륨"
  },

  {
    number: 57,
    symbol: "La",
    name: "란타넘"
  },

  {
    number: 58,
    symbol: "Ce",
    name: "세륨"
  },

  {
    number: 59,
    symbol: "Pr",
    name: "프라세오디뮴"
  },

  {
    number: 60,
    symbol: "Nd",
    name: "네오디뮴"
  },

  {
    number: 61,
    symbol: "Pm",
    name: "프로메튬"
  },

  {
    number: 62,
    symbol: "Sm",
    name: "사마륨"
  },

  {
    number: 63,
    symbol: "Eu",
    name: "유로퓸"
  },

  {
    number: 64,
    symbol: "Gd",
    name: "가돌리늄"
  },

  {
    number: 65,
    symbol: "Tb",
    name: "터븀"
  },

  {
    number: 66,
    symbol: "Dy",
    name: "디스프로슘"
  },

  {
    number: 67,
    symbol: "Ho",
    name: "홀뮴"
  },

  {
    number: 68,
    symbol: "Er",
    name: "어븀"
  },

  {
    number: 69,
    symbol: "Tm",
    name: "툴륨"
  },

  {
    number: 70,
    symbol: "Yb",
    name: "이터븀"
  },

  {
    number: 71,
    symbol: "Lu",
    name: "루테튬"
  },

  {
    number: 72,
    symbol: "Hf",
    name: "하프늄"
  },

  {
    number: 73,
    symbol: "Ta",
    name: "탄탈럼"
  },

  {
    number: 74,
    symbol: "W",
    name: "텅스텐"
  },

  {
    number: 75,
    symbol: "Re",
    name: "레늄"
  },

  {
    number: 76,
    symbol: "Os",
    name: "오스뮴"
  },

  {
    number: 77,
    symbol: "Ir",
    name: "이리듐"
  },

  {
    number: 78,
    symbol: "Pt",
    name: "백금"
  },

  {
    number: 79,
    symbol: "Au",
    name: "금"
  },

  {
    number: 80,
    symbol: "Hg",
    name: "수은"
  },

  {
    number: 81,
    symbol: "Tl",
    name: "탈륨"
  },

  {
    number: 82,
    symbol: "Pb",
    name: "납"
  },

  {
    number: 83,
    symbol: "Bi",
    name: "비스무트"
  },

  {
    number: 84,
    symbol: "Po",
    name: "폴로늄"
  },

  {
    number: 85,
    symbol: "At",
    name: "아스타틴"
  },

  {
    number: 86,
    symbol: "Rn",
    name: "라돈"
  },

  {
    number: 87,
    symbol: "Fr",
    name: "프랑슘"
  },

  {
    number: 88,
    symbol: "Ra",
    name: "라듐"
  },

  {
    number: 89,
    symbol: "Ac",
    name: "악티늄"
  },

  {
    number: 90,
    symbol: "Th",
    name: "토륨"
  },

  {
    number: 91,
    symbol: "Pa",
    name: "프로트악티늄"
  },

  {
    number: 92,
    symbol: "U",
    name: "우라늄"
  },

  {
    number: 93,
    symbol: "Np",
    name: "넵투늄"
  },

  {
    number: 94,
    symbol: "Pu",
    name: "플루토늄"
  },

  {
    number: 95,
    symbol: "Am",
    name: "아메리슘"
  },

  {
    number: 96,
    symbol: "Cm",
    name: "퀴륨"
  },

  {
    number: 97,
    symbol: "Bk",
    name: "버클륨"
  },

  {
    number: 98,
    symbol: "Cf",
    name: "캘리포늄"
  },

  {
    number: 99,
    symbol: "Es",
    name: "아인슈타이늄"
  },

  {
    number: 100,
    symbol: "Fm",
    name: "페르뮴"
  },

  {
    number: 101,
    symbol: "Md",
    name: "멘델레븀"
  },

  {
    number: 102,
    symbol: "No",
    name: "노벨륨"
  },

  {
    number: 103,
    symbol: "Lr",
    name: "로렌슘"
  },

  {
    number: 104,
    symbol: "Rf",
    name: "러더퍼듐"
  },

  {
    number: 105,
    symbol: "Db",
    name: "더브늄"
  },

  {
    number: 106,
    symbol: "Sg",
    name: "시보귬"
  },

  {
    number: 107,
    symbol: "Bh",
    name: "보륨"
  },

  {
    number: 108,
    symbol: "Hs",
    name: "하슘"
  },

  {
    number: 109,
    symbol: "Mt",
    name: "마이트너륨"
  },

  {
    number: 110,
    symbol: "Ds",
    name: "다름슈타튬"
  },

  {
    number: 111,
    symbol: "Rg",
    name: "뢴트게늄"
  },

  {
    number: 112,
    symbol: "Cn",
    name: "코페르니슘"
  },

  {
    number: 113,
    symbol: "Nh",
    name: "니호늄"
  },

  {
    number: 114,
    symbol: "Fl",
    name: "플레로븀"
  },

  {
    number: 115,
    symbol: "Mc",
    name: "모스코븀"
  },

  {
    number: 116,
    symbol: "Lv",
    name: "리버모륨"
  },

  {
    number: 117,
    symbol: "Ts",
    name: "테네신"
  },

  {
    number: 118,
    symbol: "Og",
    name: "오가네손"
  }

];


/* ==================================================
   초기화
================================================== */

function initializePeriodicTable() {

  if (
    !periodicTable ||
    !periodicTableAnswerCards ||
    !periodicTableStartButton ||
    !periodicTableNextButton
  ) {

    return;

  }


  periodicTableStartButton.addEventListener(
    "click",
    function () {

      startPeriodicTableGame();

    }
  );


  periodicTableNextButton.addEventListener(
    "click",
    function () {

      generatePeriodicTableQuestion();

    }
  );


  periodicTableNextButton.disabled =
    true;


  updatePeriodicTableStatus();

}


/* ==================================================
   게임 시작
================================================== */

function startPeriodicTableGame() {

  if (periodicTableNextTimer !== null) {

    clearTimeout(
      periodicTableNextTimer
    );

    periodicTableNextTimer =
      null;

  }


  periodicTableGameRunning =
    true;

  periodicTableQuestionCount =
    0;

  periodicTableCorrect =
    0;

  periodicTableScoreValue =
    0;

  periodicTableCurrentElement =
    null;

  periodicTableAnswered =
    false;


  periodicTableStartButton.textContent =
    "다시 시작";


  periodicTableNextButton.disabled =
    true;


  periodicTableResult.textContent =
    "문제를 풀어보세요.";


  periodicTableResult.className =
    "periodic-table-result";


  updatePeriodicTableStatus();


  generatePeriodicTableQuestion();

}


/* ==================================================
   문제 생성
================================================== */

function generatePeriodicTableQuestion() {

  if (
    !periodicTableGameRunning
  ) {

    return;

  }


  if (periodicTableNextTimer !== null) {

    clearTimeout(
      periodicTableNextTimer
    );

    periodicTableNextTimer =
      null;

  }


  periodicTableAnswered =
    false;


  periodicTableQuestionCount +=
    1;


  periodicTableNextButton.disabled =
    true;


  periodicTableQuestion.textContent =
    "";


  periodicTableAnswerCards.innerHTML =
    "";


  const shuffledElements =
    shuffleArray(
      periodicTableElements
    );


  const selectedElements =
    shuffledElements.slice(
      0,
      16
    );


  periodicTableCurrentElement =
    selectedElements[
      Math.floor(
        Math.random() *
        selectedElements.length
      )
    ];


  periodicTableQuestion.innerHTML =
    "<strong>" +
    periodicTableCurrentElement.name +
    "</strong>" +
    "<br>" +
    "원자번호 " +
    periodicTableCurrentElement.number +
    " · 원소 기호 " +
    periodicTableCurrentElement.symbol +
    "인 원소를 찾아보세요.";


  periodicTableResult.textContent =
    "16개의 카드 중 정답을 선택하세요.";


  periodicTableResult.className =
    "periodic-table-result";


  createPeriodicTableQuizCards(
    selectedElements
  );


  updatePeriodicTableStatus();

}


/* ==================================================
   4×4 퀴즈 카드 생성
================================================== */

function createPeriodicTableQuizCards(
  elements
) {

  periodicTableAnswerCards.innerHTML =
    "";


  const shuffledElements =
    shuffleArray(
      elements
    );


  shuffledElements.forEach(
    function (element) {

      const card =
        document.createElement(
          "button"
        );


      card.type =
        "button";


      card.className =
        "periodic-table-element-card";


      card.dataset.elementNumber =
        element.number;


      card.innerHTML =
        "<span class=\"periodic-table-element-number\">" +
        element.number +
        "</span>" +

        "<span class=\"periodic-table-element-symbol\">" +
        element.symbol +
        "</span>" +

        "<span class=\"periodic-table-element-name\">" +
        element.name +
        "</span>";


      card.addEventListener(
        "click",
        function () {

          selectPeriodicTableQuizCard(
            card,
            element
          );

        }
      );


      periodicTableAnswerCards.appendChild(
        card
      );

    }
  );

}


/* ==================================================
   카드 선택
================================================== */

function selectPeriodicTableQuizCard(
  selectedCard,
  selectedElement
) {

  if (
    !periodicTableGameRunning ||
    periodicTableAnswered
  ) {

    return;

  }


  periodicTableAnswered =
    true;


  const allCards =
    periodicTableAnswerCards.querySelectorAll(
      ".periodic-table-element-card"
    );


  allCards.forEach(
    function (card) {

      card.disabled =
        true;

    }
  );


  const isCorrect =
    selectedElement.number ===
    periodicTableCurrentElement.number;


  if (isCorrect) {

    periodicTableCorrect +=
      1;

    periodicTableScoreValue +=
      100;


    selectedCard.classList.add(
      "periodic-table-correct"
    );


    periodicTableResult.textContent =
      "정답입니다! " +
      periodicTableCurrentElement.name +
      "을(를) 찾았습니다. +100점";


    periodicTableResult.className =
      "periodic-table-result periodic-table-correct";

  } else {

    selectedCard.classList.add(
      "periodic-table-wrong"
    );


    allCards.forEach(
      function (card) {

        if (
          Number(
            card.dataset.elementNumber
          ) ===
          periodicTableCurrentElement.number
        ) {

          card.classList.add(
            "periodic-table-correct"
          );

        }

      }
    );


    periodicTableResult.textContent =
      "아쉽습니다. 정답은 " +
      periodicTableCurrentElement.name +
      " (" +
      periodicTableCurrentElement.symbol +
      ")입니다.";


    periodicTableResult.className =
      "periodic-table-result periodic-table-wrong";

  }


  updatePeriodicTableStatus();


  /* ================================================
     정답 또는 오답 확인 후 1초 뒤 자동 다음 문제
  ================================================ */

  periodicTableNextTimer =
    setTimeout(
      function () {

        periodicTableNextTimer =
          null;

        if (
          periodicTableGameRunning
        ) {

          generatePeriodicTableQuestion();

        }

      },
      1000
    );

}


/* ==================================================
   상태 표시 업데이트
================================================== */

function updatePeriodicTableStatus() {

  if (periodicTableQuestionNumber) {

    periodicTableQuestionNumber.textContent =
      periodicTableQuestionCount;

  }


  if (periodicTableCorrectCount) {

    periodicTableCorrectCount.textContent =
      periodicTableCorrect;

  }


  if (periodicTableScore) {

    periodicTableScore.textContent =
      periodicTableScoreValue;

  }

}


/* ==================================================
   배열 섞기
================================================== */

function shuffleArray(
  array
) {

  const shuffledArray =
    array.slice();


  for (
    let i =
      shuffledArray.length - 1;

    i > 0;

    i -= 1
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    const temporaryValue =
      shuffledArray[i];


    shuffledArray[i] =
      shuffledArray[randomIndex];


    shuffledArray[randomIndex] =
      temporaryValue;

  }


  return shuffledArray;

}


/* ==================================================
   초기 실행
================================================== */

initializePeriodicTable();