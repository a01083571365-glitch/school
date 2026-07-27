// 파일 경로: /js/gallery-game.js

/* ==================================================
   갤로그게임 - 탄막 슈팅 게임
================================================== */


/* ================================
   HTML 요소 가져오기
================================ */

const galleryCanvas =
  document.getElementById("gallery-game-canvas");

const galleryContext =
  galleryCanvas.getContext("2d");

const galleryScoreElement =
  document.getElementById("gallery-score");

const galleryLifeElement =
  document.getElementById("gallery-life");

const galleryPowerElement =
  document.getElementById("gallery-power");

const galleryOverlay =
  document.getElementById("gallery-game-overlay");

const galleryOverlayTitle =
  document.getElementById("gallery-game-overlay-title");

const galleryOverlayMessage =
  document.getElementById("gallery-game-overlay-message");

const galleryGameControls =
  document.getElementById("gallery-game-controls");

const galleryStartButton =
  document.getElementById("gallery-game-start-button");


/* ================================
   게임 기본 설정
================================ */

const GAME_WIDTH =
  galleryCanvas.width;

const GAME_HEIGHT =
  galleryCanvas.height;


/* ================================
   게임 상태
================================ */

let galleryGameRunning = false;

let galleryGameOver = false;

let galleryGameCleared = false;

let galleryAnimationId = null;

let galleryLastTime = 0;

let galleryGameTime = 0;


/* ================================
   플레이어 상태
================================ */

const galleryPlayer = {

  x:
    GAME_WIDTH / 2,

  y:
    GAME_HEIGHT - 90,

  width:
    28,

  height:
    28,

  speed:
    300,

  life:
    3,

  power:
    1,

  invincible:
    false,

  invincibleTime:
    0

};


/* ================================
   점수
================================ */

let galleryScore =
  0;


/* ================================
   키 입력 상태
================================ */

const galleryKeys = {};


/* ================================
   게임 객체
================================ */

let galleryPlayerBullets = [];

let galleryEnemyBullets = [];

let galleryEnemies = [];

let galleryParticles = [];


/* ================================
   적 생성 시간
================================ */

let galleryEnemySpawnTimer =
  0;

let galleryEnemySpawnInterval =
  1.2;


/* ==================================================
   키보드 입력
================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    galleryKeys[event.code] =
      true;


    if (
      event.code === "Space"
    ) {

      event.preventDefault();

    }


    if (
      !galleryGameRunning &&
      event.code === "Space"
    ) {

      if (
        !galleryGameOver &&
        !galleryGameCleared
      ) {

        startGalleryGame();

      }

    }

  }
);


document.addEventListener(
  "keyup",
  function (event) {

    galleryKeys[event.code] =
      false;

  }
);


/* ==================================================
   게임 시작 버튼
================================================== */

galleryStartButton.addEventListener(
  "click",
  function () {

    startGalleryGame();

  }
);


/* ==================================================
   게임 시작
================================================== */

function startGalleryGame() {

  galleryGameRunning =
    true;

  galleryGameOver =
    false;

  galleryGameCleared =
    false;

  galleryScore =
    0;

  galleryGameTime =
    0;

  galleryEnemySpawnTimer =
    0;

  galleryEnemySpawnInterval =
    1.2;


  galleryPlayerBullets =
    [];

  galleryEnemyBullets =
    [];

  galleryEnemies =
    [];

  galleryParticles =
    [];


  galleryPlayer.x =
    GAME_WIDTH / 2;

  galleryPlayer.y =
    GAME_HEIGHT - 90;

  galleryPlayer.life =
    3;

  galleryPlayer.power =
    1;

  galleryPlayer.invincible =
    false;

  galleryPlayer.invincibleTime =
    0;


  galleryOverlay.classList.add(
    "gallery-game-hidden"
  );


  updateGalleryStatus();


  galleryLastTime =
    performance.now();


  if (
    galleryAnimationId !== null
  ) {

    cancelAnimationFrame(
      galleryAnimationId
    );

  }


  galleryAnimationId =
    requestAnimationFrame(
      galleryGameLoop
    );

}


/* ==================================================
   게임 루프
================================================== */

function galleryGameLoop(
  currentTime
) {

  if (
    !galleryGameRunning
  ) {

    return;

  }


  const deltaTime =
    Math.min(
      (currentTime - galleryLastTime) /
      1000,
      0.05
    );


  galleryLastTime =
    currentTime;


  galleryGameTime +=
    deltaTime;


  updateGalleryGame(
    deltaTime
  );


  drawGalleryGame();


  galleryAnimationId =
    requestAnimationFrame(
      galleryGameLoop
    );

}


/* ==================================================
   게임 업데이트
================================================== */

function updateGalleryGame(
  deltaTime
) {

  updateGalleryPlayer(
    deltaTime
  );


  updateGalleryPlayerBullets(
    deltaTime
  );


  updateGalleryEnemies(
    deltaTime
  );


  updateGalleryEnemyBullets(
    deltaTime
  );


  updateGalleryParticles(
    deltaTime
  );


  spawnGalleryEnemy(
    deltaTime
  );


  checkGalleryCollisions();


  updateGalleryInvincibility(
    deltaTime
  );


  updateGalleryStatus();

}


/* ==================================================
   플레이어 이동
================================================== */

function updateGalleryPlayer(
  deltaTime
) {

  let moveX =
    0;

  let moveY =
    0;


  if (
    galleryKeys["ArrowLeft"] ||
    galleryKeys["KeyA"]
  ) {

    moveX -=
      1;

  }


  if (
    galleryKeys["ArrowRight"] ||
    galleryKeys["KeyD"]
  ) {

    moveX +=
      1;

  }


  if (
    galleryKeys["ArrowUp"] ||
    galleryKeys["KeyW"]
  ) {

    moveY -=
      1;

  }


  if (
    galleryKeys["ArrowDown"] ||
    galleryKeys["KeyS"]
  ) {

    moveY +=
      1;

  }


  if (
    moveX !== 0 ||
    moveY !== 0
  ) {

    const length =
      Math.sqrt(
        moveX * moveX +
        moveY * moveY
      );


    moveX /=
      length;

    moveY /=
      length;


    galleryPlayer.x +=
      moveX *
      galleryPlayer.speed *
      deltaTime;


    galleryPlayer.y +=
      moveY *
      galleryPlayer.speed *
      deltaTime;

  }


  const halfWidth =
    galleryPlayer.width / 2;

  const halfHeight =
    galleryPlayer.height / 2;


  galleryPlayer.x =
    Math.max(
      halfWidth,
      Math.min(
        GAME_WIDTH - halfWidth,
        galleryPlayer.x
      )
    );


  galleryPlayer.y =
    Math.max(
      halfHeight,
      Math.min(
        GAME_HEIGHT - halfHeight,
        galleryPlayer.y
      )
    );


  /* Space 또는 Z 키로 공격 */

  if (
    galleryKeys["Space"] ||
    galleryKeys["KeyZ"]
  ) {

    fireGalleryPlayerBullet();

  }

}


/* ==================================================
   플레이어 공격
================================================== */

let galleryPlayerShootTimer =
  0;


function fireGalleryPlayerBullet() {

  if (
    galleryPlayerShootTimer >
    0
  ) {

    return;

  }


  galleryPlayerShootTimer =
    0.16;


  if (
    galleryPlayer.power >=
    3
  ) {

    galleryPlayerBullets.push({

      x:
        galleryPlayer.x - 10,

      y:
        galleryPlayer.y - 18,

      width:
        5,

      height:
        16,

      speed:
        620

    });


    galleryPlayerBullets.push({

      x:
        galleryPlayer.x + 10,

      y:
        galleryPlayer.y - 18,

      width:
        5,

      height:
        16,

      speed:
        620

    });

  }


  else if (
    galleryPlayer.power >=
    2
  ) {

    galleryPlayerBullets.push({

      x:
        galleryPlayer.x - 7,

      y:
        galleryPlayer.y - 18,

      width:
        5,

      height:
        16,

      speed:
        620

    });


    galleryPlayerBullets.push({

      x:
        galleryPlayer.x + 7,

      y:
        galleryPlayer.y - 18,

      width:
        5,

      height:
        16,

      speed:
        620

    });

  }


  else {

    galleryPlayerBullets.push({

      x:
        galleryPlayer.x,

      y:
        galleryPlayer.y - 18,

      width:
        5,

      height:
        16,

      speed:
        620

    });

  }

}


/* ==================================================
   플레이어 탄환 업데이트
================================================== */

function updateGalleryPlayerBullets(
  deltaTime
) {

  galleryPlayerShootTimer =
    Math.max(
      0,
      galleryPlayerShootTimer -
      deltaTime
    );


  for (
    let i =
      galleryPlayerBullets.length - 1;

    i >= 0;

    i--
  ) {

    const bullet =
      galleryPlayerBullets[i];


    bullet.y -=
      bullet.speed *
      deltaTime;


    if (
      bullet.y <
      -30
    ) {

      galleryPlayerBullets.splice(
        i,
        1
      );

    }

  }

}


/* ==================================================
   적 생성
================================================== */

function spawnGalleryEnemy(
  deltaTime
) {

  galleryEnemySpawnTimer +=
    deltaTime;


  if (
    galleryEnemySpawnTimer <
    galleryEnemySpawnInterval
  ) {

    return;

  }


  galleryEnemySpawnTimer =
    0;


  const enemyType =
    Math.random();


  let enemy;


  if (
    enemyType <
    0.65
  ) {

    enemy = {

      x:
        40 +
        Math.random() *
        (GAME_WIDTH - 80),

      y:
        -40,

      width:
        34,

      height:
        34,

      speed:
        65 +
        Math.random() *
        35,

      hp:
        3,

      maxHp:
        3,

      shootTimer:
        1 +
        Math.random(),

      shootInterval:
        1.2 +
        Math.random() *
        1.3,

      type:
        "normal"

    };

  }


  else {

    enemy = {

      x:
        40 +
        Math.random() *
        (GAME_WIDTH - 80),

      y:
        -50,

      width:
        48,

      height:
        48,

      speed:
        35 +
        Math.random() *
        25,

      hp:
        8,

      maxHp:
        8,

      shootTimer:
        0.8,

      shootInterval:
        1.4,

      type:
        "strong"

    };

  }


  galleryEnemies.push(
    enemy
  );

}


/* ==================================================
   적 업데이트
================================================== */

function updateGalleryEnemies(
  deltaTime
) {

  for (
    let i =
      galleryEnemies.length - 1;

    i >= 0;

    i--
  ) {

    const enemy =
      galleryEnemies[i];


    enemy.y +=
      enemy.speed *
      deltaTime;


    enemy.shootTimer -=
      deltaTime;


    if (
      enemy.shootTimer <=
      0
    ) {

      fireGalleryEnemyBullet(
        enemy
      );


      enemy.shootTimer =
        enemy.shootInterval;

    }


    if (
      enemy.y >
      GAME_HEIGHT + 70
    ) {

      galleryEnemies.splice(
        i,
        1
      );

    }

  }

}


/* ==================================================
   적 탄막 발사
================================================== */

function fireGalleryEnemyBullet(
  enemy
) {

  const dx =
    galleryPlayer.x -
    enemy.x;

  const dy =
    galleryPlayer.y -
    enemy.y;


  const distance =
    Math.sqrt(
      dx * dx +
      dy * dy
    );


  const speed =
    enemy.type ===
    "strong"
      ? 150
      : 125;


  galleryEnemyBullets.push({

    x:
      enemy.x,

    y:
      enemy.y,

    radius:
      enemy.type ===
      "strong"
        ? 7
        : 5,

    vx:
      (dx / distance) *
      speed,

    vy:
      (dy / distance) *
      speed

  });


  if (
    enemy.type ===
    "strong"
  ) {

    const sideSpeed =
      55;


    galleryEnemyBullets.push({

      x:
        enemy.x,

      y:
        enemy.y,

      radius:
        5,

      vx:
        (dx / distance) *
        speed -
        sideSpeed,

      vy:
        (dy / distance) *
        speed

    });


    galleryEnemyBullets.push({

      x:
        enemy.x,

      y:
        enemy.y,

      radius:
        5,

      vx:
        (dx / distance) *
        speed +
        sideSpeed,

      vy:
        (dy / distance) *
        speed

    });

  }

}


/* ==================================================
   적 탄막 업데이트
================================================== */

function updateGalleryEnemyBullets(
  deltaTime
) {

  for (
    let i =
      galleryEnemyBullets.length - 1;

    i >= 0;

    i--
  ) {

    const bullet =
      galleryEnemyBullets[i];


    bullet.x +=
      bullet.vx *
      deltaTime;


    bullet.y +=
      bullet.vy *
      deltaTime;


    if (
      bullet.x <
        -30 ||
      bullet.x >
        GAME_WIDTH + 30 ||
      bullet.y <
        -30 ||
      bullet.y >
        GAME_HEIGHT + 30
    ) {

      galleryEnemyBullets.splice(
        i,
        1
      );

    }

  }

}


/* ==================================================
   충돌 검사
================================================== */

function checkGalleryCollisions() {

  checkGalleryPlayerBulletCollisions();


  checkGalleryEnemyBulletCollisions();


  checkGalleryEnemyPlayerCollisions();

}


/* ==================================================
   플레이어 탄환과 적 충돌
================================================== */

function checkGalleryPlayerBulletCollisions() {

  for (
    let i =
      galleryPlayerBullets.length - 1;

    i >= 0;

    i--
  ) {

    const bullet =
      galleryPlayerBullets[i];


    let bulletHit =
      false;


    for (
      let j =
        galleryEnemies.length - 1;

      j >= 0;

      j--
    ) {

      const enemy =
        galleryEnemies[j];


      if (
        isGalleryRectCollision(
          bullet,
          enemy
        )
      ) {

        enemy.hp -=
          galleryPlayer.power;


        galleryPlayerBullets.splice(
          i,
          1
        );


        createGalleryParticles(
          bullet.x,
          bullet.y,
          5
        );


        bulletHit =
          true;


        if (
          enemy.hp <=
          0
        ) {

          galleryScore +=
            enemy.type ===
            "strong"
              ? 150
              : 50;


          createGalleryParticles(
            enemy.x,
            enemy.y,
            15
          );


          galleryEnemies.splice(
            j,
            1
          );


          if (
            galleryScore %
            300 ===
            0 &&
            galleryPlayer.power <
            3
          ) {

            galleryPlayer.power +=
              1;

          }

        }


        break;

      }

    }


    if (
      bulletHit
    ) {

      continue;

    }

  }

}


/* ==================================================
   적 탄막과 플레이어 충돌
================================================== */

function checkGalleryEnemyBulletCollisions() {

  if (
    galleryPlayer.invincible
  ) {

    return;

  }


  for (
    let i =
      galleryEnemyBullets.length - 1;

    i >= 0;

    i--
  ) {

    const bullet =
      galleryEnemyBullets[i];


    const dx =
      bullet.x -
      galleryPlayer.x;

    const dy =
      bullet.y -
      galleryPlayer.y;


    const distance =
      Math.sqrt(
        dx * dx +
        dy * dy
      );


    if (
      distance <
      bullet.radius +
      10
    ) {

      galleryEnemyBullets.splice(
        i,
        1
      );


      damageGalleryPlayer();


      break;

    }

  }

}


/* ==================================================
   적과 플레이어 충돌
================================================== */

function checkGalleryEnemyPlayerCollisions() {

  if (
    galleryPlayer.invincible
  ) {

    return;

  }


  for (
    let i =
      galleryEnemies.length - 1;

    i >= 0;

    i--
  ) {

    const enemy =
      galleryEnemies[i];


    if (
      isGalleryCircleRectCollision(
        galleryPlayer.x,
        galleryPlayer.y,
        10,
        enemy
      )
    ) {

      galleryEnemies.splice(
        i,
        1
      );


      damageGalleryPlayer();


      break;

    }

  }

}


/* ==================================================
   플레이어 피해
================================================== */

function damageGalleryPlayer() {

  if (
    galleryPlayer.invincible
  ) {

    return;

  }


  galleryPlayer.life -=
    1;


  galleryPlayer.invincible =
    true;

  galleryPlayer.invincibleTime =
    2;


  createGalleryParticles(
    galleryPlayer.x,
    galleryPlayer.y,
    20
  );


  if (
    galleryPlayer.life <=
    0
  ) {

    endGalleryGame();

  }

}


/* ==================================================
   무적 시간
================================================== */

function updateGalleryInvincibility(
  deltaTime
) {

  if (
    !galleryPlayer.invincible
  ) {

    return;

  }


  galleryPlayer.invincibleTime -=
    deltaTime;


  if (
    galleryPlayer.invincibleTime <=
    0
  ) {

    galleryPlayer.invincible =
      false;

    galleryPlayer.invincibleTime =
      0;

  }

}


/* ==================================================
   사각형 충돌
================================================== */

function isGalleryRectCollision(
  a,
  b
) {

  return (

    a.x -
      a.width / 2 <
    b.x +
      b.width / 2 &&

    a.x +
      a.width / 2 >
    b.x -
      b.width / 2 &&

    a.y -
      a.height / 2 <
    b.y +
      b.height / 2 &&

    a.y +
      a.height / 2 >
    b.y -
      b.height / 2

  );

}


/* ==================================================
   원형과 사각형 충돌
================================================== */

function isGalleryCircleRectCollision(
  circleX,
  circleY,
  radius,
  rect
) {

  const closestX =
    Math.max(
      rect.x -
        rect.width / 2,

      Math.min(
        circleX,

        rect.x +
          rect.width / 2
      )
    );


  const closestY =
    Math.max(
      rect.y -
        rect.height / 2,

      Math.min(
        circleY,

        rect.y +
          rect.height / 2
      )
    );


  const dx =
    circleX -
    closestX;

  const dy =
    circleY -
    closestY;


  return (
    dx * dx +
    dy * dy <
    radius * radius
  );

}


/* ==================================================
   파티클 생성
================================================== */

function createGalleryParticles(
  x,
  y,
  amount
) {

  for (
    let i = 0;

    i < amount;

    i++
  ) {

    const angle =
      Math.random() *
      Math.PI *
      2;


    const speed =
      40 +
      Math.random() *
      120;


    galleryParticles.push({

      x:
        x,

      y:
        y,

      vx:
        Math.cos(angle) *
        speed,

      vy:
        Math.sin(angle) *
        speed,

      life:
        0.4 +
        Math.random() *
        0.4,

      maxLife:
        0.8

    });

  }

}


/* ==================================================
   파티클 업데이트
================================================== */

function updateGalleryParticles(
  deltaTime
) {

  for (
    let i =
      galleryParticles.length - 1;

    i >= 0;

    i--
  ) {

    const particle =
      galleryParticles[i];


    particle.x +=
      particle.vx *
      deltaTime;


    particle.y +=
      particle.vy *
      deltaTime;


    particle.life -=
      deltaTime;


    if (
      particle.life <=
      0
    ) {

      galleryParticles.splice(
        i,
        1
      );

    }

  }

}


/* ==================================================
   게임 그리기
================================================== */

function drawGalleryGame() {

  galleryContext.clearRect(
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT
  );


  drawGalleryBackground();


  drawGalleryParticles();


  drawGalleryPlayerBullets();


  drawGalleryEnemyBullets();


  drawGalleryEnemies();


  drawGalleryPlayer();

}


/* ==================================================
   배경 그리기
================================================== */

function drawGalleryBackground() {

  const gradient =
    galleryContext.createLinearGradient(
      0,
      0,
      0,
      GAME_HEIGHT
    );


  gradient.addColorStop(
    0,
    "#dff8ff"
  );


  gradient.addColorStop(
    0.5,
    "#f5fdff"
  );


  gradient.addColorStop(
    1,
    "#eafaff"
  );


  galleryContext.fillStyle =
    gradient;


  galleryContext.fillRect(
    0,
    0,
    GAME_WIDTH,
    GAME_HEIGHT
  );


  galleryContext.fillStyle =
    "rgba(53, 183, 201, 0.08)";


  for (
    let i = 0;

    i < 35;

    i++
  ) {

    const x =
      (
        i * 97 +
        galleryGameTime *
        10
      ) %
      GAME_WIDTH;


    const y =
      (
        i * 131 +
        galleryGameTime *
        20
      ) %
      GAME_HEIGHT;


    galleryContext.beginPath();


    galleryContext.arc(
      x,
      y,
      2,
      0,
      Math.PI * 2
    );


    galleryContext.fill();

  }

}


/* ==================================================
   플레이어 그리기
================================================== */

function drawGalleryPlayer() {

  if (
    galleryPlayer.invincible &&
    Math.floor(
      galleryPlayer.invincibleTime *
      10
    ) %
      2 ===
      0
  ) {

    return;

  }


  galleryContext.save();


  galleryContext.translate(
    galleryPlayer.x,
    galleryPlayer.y
  );


  galleryContext.fillStyle =
    "#35b7c9";


  galleryContext.beginPath();


  galleryContext.moveTo(
    0,
    -18
  );


  galleryContext.lineTo(
    -15,
    15
  );


  galleryContext.lineTo(
    0,
    9
  );


  galleryContext.lineTo(
    15,
    15
  );


  galleryContext.closePath();


  galleryContext.fill();


  galleryContext.fillStyle =
    "#ffffff";


  galleryContext.beginPath();


  galleryContext.arc(
    0,
    0,
    5,
    0,
    Math.PI * 2
  );


  galleryContext.fill();


  galleryContext.restore();

}


/* ==================================================
   플레이어 탄환 그리기
================================================== */

function drawGalleryPlayerBullets() {

  galleryContext.fillStyle =
    "#42c9c5";


  galleryPlayerBullets.forEach(
    function (bullet) {

      galleryContext.fillRect(

        bullet.x -
          bullet.width / 2,

        bullet.y -
          bullet.height / 2,

        bullet.width,

        bullet.height

      );

    }
  );

}


/* ==================================================
   적 그리기
================================================== */

function drawGalleryEnemies() {

  galleryEnemies.forEach(
    function (enemy) {

      galleryContext.save();


      galleryContext.translate(
        enemy.x,
        enemy.y
      );


      galleryContext.fillStyle =
        enemy.type ===
        "strong"
          ? "#8b6fc9"
          : "#e56d83";


      galleryContext.beginPath();


      galleryContext.arc(
        0,
        0,
        enemy.width / 2,
        0,
        Math.PI * 2
      );


      galleryContext.fill();


      galleryContext.fillStyle =
        "#ffffff";


      galleryContext.beginPath();


      galleryContext.arc(
        -7,
        -3,
        4,
        0,
        Math.PI * 2
      );


      galleryContext.arc(
        7,
        -3,
        4,
        0,
        Math.PI * 2
      );


      galleryContext.fill();


      galleryContext.restore();


      const hpRatio =
        enemy.hp /
        enemy.maxHp;


      galleryContext.fillStyle =
        "rgba(255,255,255,0.6)";


      galleryContext.fillRect(

        enemy.x -
          enemy.width / 2,

        enemy.y -
          enemy.height / 2 -
          10,

        enemy.width,

        4

      );


      galleryContext.fillStyle =
        "#35b7c9";


      galleryContext.fillRect(

        enemy.x -
          enemy.width / 2,

        enemy.y -
          enemy.height / 2 -
          10,

        enemy.width *
          hpRatio,

        4

      );

    }
  );

}


/* ==================================================
   적 탄막 그리기
================================================== */

function drawGalleryEnemyBullets() {

  galleryEnemyBullets.forEach(
    function (bullet) {

      galleryContext.fillStyle =
        "#e56d83";


      galleryContext.beginPath();


      galleryContext.arc(

        bullet.x,

        bullet.y,

        bullet.radius,

        0,

        Math.PI * 2

      );


      galleryContext.fill();

    }
  );

}


/* ==================================================
   파티클 그리기
================================================== */

function drawGalleryParticles() {

  galleryParticles.forEach(
    function (particle) {

      const alpha =
        particle.life /
        particle.maxLife;


      galleryContext.fillStyle =
        "rgba(53, 183, 201, " +
        alpha +
        ")";


      galleryContext.beginPath();


      galleryContext.arc(

        particle.x,

        particle.y,

        3,

        0,

        Math.PI * 2

      );


      galleryContext.fill();

    }
  );

}


/* ==================================================
   상태 표시 업데이트
================================================== */

function updateGalleryStatus() {

  galleryScoreElement.textContent =
    galleryScore;


  galleryLifeElement.textContent =
    galleryPlayer.life;


  galleryPowerElement.textContent =
    galleryPlayer.power;

}


/* ==================================================
   게임 오버
================================================== */

function endGalleryGame() {

  galleryGameRunning =
    false;

  galleryGameOver =
    true;


  if (
    galleryAnimationId !== null
  ) {

    cancelAnimationFrame(
      galleryAnimationId
    );

    galleryAnimationId =
      null;

  }


  galleryOverlay.classList.remove(
    "gallery-game-hidden"
  );


  galleryOverlayTitle.textContent =
    "게임 오버";


  galleryOverlayMessage.innerHTML =
    "모든 LIFE를 잃었습니다.<br>" +
    "점수: <strong>" +
    galleryScore +
    "</strong>";


  galleryGameControls.classList.add(
    "gallery-game-hidden"
  );


  galleryStartButton.textContent =
    "다시 시작";

}


/* ==================================================
   게임 클리어
   ※ 현재 갤로그게임은 무한 생존 방식이므로 사용하지 않음
================================================== */

function clearGalleryGame() {

  return;

}


/* ==================================================
   초기 화면
================================================== */

updateGalleryStatus();


drawGalleryGame();