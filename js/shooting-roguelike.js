```javascript
// 파일 경로: /js/shooting-roguelike.js

/* ==================================================
   슈팅 로그라이크
================================================== */

/* ================================
   HTML 요소 가져오기
================================ */

const shootingRoguelikeCanvas =
  document.getElementById("shooting-roguelike-canvas");

const shootingRoguelikeContext =
  shootingRoguelikeCanvas.getContext("2d");

const shootingRoguelikeStartScreen =
  document.getElementById("shooting-roguelike-start-screen");

const shootingRoguelikeGameOverScreen =
  document.getElementById("shooting-roguelike-game-over-screen");

const shootingRoguelikeLevelUpScreen =
  document.getElementById("shooting-roguelike-level-up-screen");

const shootingRoguelikeStartButton =
  document.getElementById("shooting-roguelike-start-button");

const shootingRoguelikeRestartButton =
  document.getElementById("shooting-roguelike-restart-button");

const shootingRoguelikeUpgradeList =
  document.getElementById("shooting-roguelike-upgrade-list");

const shootingRoguelikeTime =
  document.getElementById("shooting-roguelike-time");

const shootingRoguelikeLevel =
  document.getElementById("shooting-roguelike-level");

const shootingRoguelikeKills =
  document.getElementById("shooting-roguelike-kills");

const shootingRoguelikeHealthFill =
  document.getElementById("shooting-roguelike-health-fill");

const shootingRoguelikeHealthText =
  document.getElementById("shooting-roguelike-health-text");

const shootingRoguelikeExpFill =
  document.getElementById("shooting-roguelike-exp-fill");

const shootingRoguelikeExpText =
  document.getElementById("shooting-roguelike-exp-text");

const shootingRoguelikeWeapon =
  document.getElementById("shooting-roguelike-weapon");

const shootingRoguelikeFinalTime =
  document.getElementById("shooting-roguelike-final-time");

const shootingRoguelikeFinalKills =
  document.getElementById("shooting-roguelike-final-kills");

const shootingRoguelikeFinalLevel =
  document.getElementById("shooting-roguelike-final-level");

const shootingRoguelikeHighScore =
  document.getElementById("shooting-roguelike-high-score");


/* ================================
   게임 상수
================================ */

const shootingRoguelikeWidth =
  shootingRoguelikeCanvas.width;

const shootingRoguelikeHeight =
  shootingRoguelikeCanvas.height;

const shootingRoguelikeHighScoreKey =
  "shootingRoguelikeHighScore";


/* ================================
   게임 상태
================================ */

let shootingRoguelikeGameRunning =
  false;

let shootingRoguelikeGameOver =
  false;

let shootingRoguelikeLevelUpPaused =
  false;

let shootingRoguelikeAnimationFrame =
  null;

let shootingRoguelikeLastTime =
  0;

let shootingRoguelikeElapsedTime =
  0;

let shootingRoguelikeKillsValue =
  0;

let shootingRoguelikeLevelValue =
  1;

let shootingRoguelikeExperience =
  0;

let shootingRoguelikeExperienceRequired =
  10;

let shootingRoguelikeLastShotTime =
  0;

let shootingRoguelikeLastEnemySpawnTime =
  0;


/* ================================
   연속 발사 상태
================================ */

let shootingRoguelikeBurstShotsRemaining =
  0;

let shootingRoguelikeNextBurstShotTime =
  0;

const shootingRoguelikeBurstShotDelay =
  120;


/* ================================
   플레이어 피격 무적시간
================================ */

let shootingRoguelikeInvincibleUntil =
  0;

const shootingRoguelikeInvincibilityDuration =
  1000;


/* ================================
   플레이어
================================ */

const shootingRoguelikePlayer = {

  x:
    shootingRoguelikeWidth / 2,

  y:
    shootingRoguelikeHeight / 2,

  radius:
    18,

  speed:
    220,

  maxHealth:
    100,

  health:
    100,

  damage:
    20,

  attackInterval:
    600,

  attackRange:
    500,

  projectileCount:
    1,

  spreadAngle:
    0.22,

  multiShotLevel:
    0,

  rapidFireLevel:
    0,

  burstFireLevel:
    0

};


/* ================================
   게임 객체
================================ */

let shootingRoguelikeEnemies =
  [];

let shootingRoguelikeProjectiles =
  [];

let shootingRoguelikeExperienceOrbs =
  [];


/* ================================
   키보드 입력
================================ */

const shootingRoguelikeKeys =
  {};


/* ================================
   터치 입력
================================ */

let shootingRoguelikeTouchActive =
  false;

let shootingRoguelikeTouchStartX =
  0;

let shootingRoguelikeTouchStartY =
  0;

let shootingRoguelikeTouchCurrentX =
  0;

let shootingRoguelikeTouchCurrentY =
  0;


/* ==================================================
   시작 버튼
================================================== */

shootingRoguelikeStartButton.addEventListener(
  "click",
  function () {

    startShootingRoguelikeGame();

  }
);


/* ==================================================
   다시 시작 버튼
================================================== */

shootingRoguelikeRestartButton.addEventListener(
  "click",
  function () {

    startShootingRoguelikeGame();

  }
);


/* ==================================================
   키보드 이벤트
================================================== */

window.addEventListener(
  "keydown",
  function (event) {

    const key =
      event.key.toLowerCase();

    shootingRoguelikeKeys[key] =
      true;

    if (
      [
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " "
      ].includes(key)
    ) {

      event.preventDefault();

    }

  }
);


window.addEventListener(
  "keyup",
  function (event) {

    const key =
      event.key.toLowerCase();

    shootingRoguelikeKeys[key] =
      false;

  }
);


/* ==================================================
   터치 시작
================================================== */

shootingRoguelikeCanvas.addEventListener(
  "touchstart",
  function (event) {

    if (
      !shootingRoguelikeGameRunning ||
      shootingRoguelikeLevelUpPaused
    ) {

      return;

    }

    const touch =
      event.touches[0];

    shootingRoguelikeTouchActive =
      true;

    shootingRoguelikeTouchStartX =
      touch.clientX;

    shootingRoguelikeTouchStartY =
      touch.clientY;

    shootingRoguelikeTouchCurrentX =
      touch.clientX;

    shootingRoguelikeTouchCurrentY =
      touch.clientY;

  },
  {
    passive: true
  }
);


/* ==================================================
   터치 이동
================================================== */

shootingRoguelikeCanvas.addEventListener(
  "touchmove",
  function (event) {

    if (
      !shootingRoguelikeTouchActive
    ) {

      return;

    }

    const touch =
      event.touches[0];

    shootingRoguelikeTouchCurrentX =
      touch.clientX;

    shootingRoguelikeTouchCurrentY =
      touch.clientY;

  },
  {
    passive: true
  }
);


/* ==================================================
   터치 종료
================================================== */

shootingRoguelikeCanvas.addEventListener(
  "touchend",
  function () {

    shootingRoguelikeTouchActive =
      false;

  },
  {
    passive: true
  }
);


/* ==================================================
   게임 시작
================================================== */

function startShootingRoguelikeGame() {

  shootingRoguelikeGameRunning =
    true;

  shootingRoguelikeGameOver =
    false;

  shootingRoguelikeLevelUpPaused =
    false;

  shootingRoguelikeElapsedTime =
    0;

  shootingRoguelikeKillsValue =
    0;

  shootingRoguelikeLevelValue =
    1;

  shootingRoguelikeExperience =
    0;

  shootingRoguelikeExperienceRequired =
    10;

  shootingRoguelikeLastShotTime =
    0;

  shootingRoguelikeLastEnemySpawnTime =
    performance.now();

  shootingRoguelikeInvincibleUntil =
    0;

  shootingRoguelikeBurstShotsRemaining =
    0;

  shootingRoguelikeNextBurstShotTime =
    0;

  shootingRoguelikePlayer.x =
    shootingRoguelikeWidth / 2;

  shootingRoguelikePlayer.y =
    shootingRoguelikeHeight / 2;

  shootingRoguelikePlayer.speed =
    220;

  shootingRoguelikePlayer.maxHealth =
    100;

  shootingRoguelikePlayer.health =
    100;

  shootingRoguelikePlayer.damage =
    20;

  shootingRoguelikePlayer.attackInterval =
    600;

  shootingRoguelikePlayer.projectileCount =
    1;

  shootingRoguelikePlayer.spreadAngle =
    0.22;

  shootingRoguelikePlayer.multiShotLevel =
    0;

  shootingRoguelikePlayer.rapidFireLevel =
    0;

  shootingRoguelikePlayer.burstFireLevel =
    0;

  shootingRoguelikeEnemies =
    [];

  shootingRoguelikeProjectiles =
    [];

  shootingRoguelikeExperienceOrbs =
    [];

  shootingRoguelikeStartScreen.hidden =
    true;

  shootingRoguelikeGameOverScreen.hidden =
    true;

  shootingRoguelikeLevelUpScreen.hidden =
    true;

  updateShootingRoguelikeInterface();

  shootingRoguelikeLastTime =
    performance.now();

  if (
    shootingRoguelikeAnimationFrame !==
    null
  ) {

    cancelAnimationFrame(
      shootingRoguelikeAnimationFrame
    );

  }

  shootingRoguelikeAnimationFrame =
    requestAnimationFrame(
      shootingRoguelikeGameLoop
    );

}


/* ==================================================
   게임 루프
================================================== */

function shootingRoguelikeGameLoop(
  currentTime
) {

  if (
    !shootingRoguelikeGameRunning
  ) {

    drawShootingRoguelikeGame();

    return;

  }

  const deltaTime =
    Math.min(
      (
        currentTime -
        shootingRoguelikeLastTime
      ) / 1000,
      0.05
    );

  shootingRoguelikeLastTime =
    currentTime;

  if (
    !shootingRoguelikeLevelUpPaused
  ) {

    shootingRoguelikeElapsedTime +=
      deltaTime;

    updateShootingRoguelikePlayer(
      deltaTime
    );

    spawnShootingRoguelikeEnemies(
      currentTime
    );

    updateShootingRoguelikeEnemies(
      deltaTime
    );

    updateShootingRoguelikeProjectiles(
      deltaTime
    );

    updateShootingRoguelikeExperienceOrbs(
      deltaTime
    );

    shootingRoguelikeAutoAttack(
      currentTime
    );

    checkShootingRoguelikeCollisions();

    updateShootingRoguelikeInterface();

  }

  drawShootingRoguelikeGame();

  shootingRoguelikeAnimationFrame =
    requestAnimationFrame(
      shootingRoguelikeGameLoop
    );

}


/* ==================================================
   플레이어 이동
================================================== */

function updateShootingRoguelikePlayer(
  deltaTime
) {

  let directionX =
    0;

  let directionY =
    0;


  if (
    shootingRoguelikeKeys["w"] ||
    shootingRoguelikeKeys["arrowup"]
  ) {

    directionY -=
      1;

  }


  if (
    shootingRoguelikeKeys["s"] ||
    shootingRoguelikeKeys["arrowdown"]
  ) {

    directionY +=
      1;

  }


  if (
    shootingRoguelikeKeys["a"] ||
    shootingRoguelikeKeys["arrowleft"]
  ) {

    directionX -=
      1;

  }


  if (
    shootingRoguelikeKeys["d"] ||
    shootingRoguelikeKeys["arrowright"]
  ) {

    directionX +=
      1;

  }


  if (
    shootingRoguelikeTouchActive
  ) {

    const touchDeltaX =
      shootingRoguelikeTouchCurrentX -
      shootingRoguelikeTouchStartX;

    const touchDeltaY =
      shootingRoguelikeTouchCurrentY -
      shootingRoguelikeTouchStartY;

    const touchDistance =
      Math.sqrt(
        touchDeltaX *
          touchDeltaX +
        touchDeltaY *
          touchDeltaY
      );


    if (
      touchDistance >
      10
    ) {

      directionX =
        touchDeltaX /
        touchDistance;

      directionY =
        touchDeltaY /
        touchDistance;

    }

  }


  const directionLength =
    Math.sqrt(
      directionX *
        directionX +
      directionY *
        directionY
    );


  if (
    directionLength >
    0
  ) {

    directionX /=
      directionLength;

    directionY /=
      directionLength;

    shootingRoguelikePlayer.x +=
      directionX *
      shootingRoguelikePlayer.speed *
      deltaTime;

    shootingRoguelikePlayer.y +=
      directionY *
      shootingRoguelikePlayer.speed *
      deltaTime;

  }


  shootingRoguelikePlayer.x =
    Math.max(
      shootingRoguelikePlayer.radius,
      Math.min(
        shootingRoguelikeWidth -
          shootingRoguelikePlayer.radius,
        shootingRoguelikePlayer.x
      )
    );


  shootingRoguelikePlayer.y =
    Math.max(
      shootingRoguelikePlayer.radius,
      Math.min(
        shootingRoguelikeHeight -
          shootingRoguelikePlayer.radius,
        shootingRoguelikePlayer.y
      )
    );

}


/* ==================================================
   적 생성
================================================== */

function spawnShootingRoguelikeEnemies(
  currentTime
) {

  const spawnInterval =
    Math.max(
      250,
      1000 -
      shootingRoguelikeElapsedTime *
      5
    );


  if (
    currentTime -
    shootingRoguelikeLastEnemySpawnTime <
    spawnInterval
  ) {

    return;

  }


  shootingRoguelikeLastEnemySpawnTime =
    currentTime;


  const side =
    Math.floor(
      Math.random() *
      4
    );


  let x;

  let y;


  if (
    side ===
    0
  ) {

    x =
      -30;

    y =
      Math.random() *
      shootingRoguelikeHeight;

  }

  else if (
    side ===
    1
  ) {

    x =
      shootingRoguelikeWidth +
      30;

    y =
      Math.random() *
      shootingRoguelikeHeight;

  }

  else if (
    side ===
    2
  ) {

    x =
      Math.random() *
      shootingRoguelikeWidth;

    y =
      -30;

  }

  else {

    x =
      Math.random() *
      shootingRoguelikeWidth;

    y =
      shootingRoguelikeHeight +
      30;

  }


  const difficulty =
    1 +
    shootingRoguelikeElapsedTime /
    30;


  const enemyHealth =
    30 +
    difficulty *
    8;


  shootingRoguelikeEnemies.push({

    x:
      x,

    y:
      y,

    radius:
      15,

    speed:
      35 +
      Math.random() *
      25 +
      difficulty *
      4,

    health:
      enemyHealth,

    maxHealth:
      enemyHealth

  });

}


/* ==================================================
   적 이동
================================================== */

function updateShootingRoguelikeEnemies(
  deltaTime
) {

  for (
    let index =
      shootingRoguelikeEnemies.length -
      1;

    index >=
    0;

    index--
  ) {

    const enemy =
      shootingRoguelikeEnemies[index];


    const deltaX =
      shootingRoguelikePlayer.x -
      enemy.x;

    const deltaY =
      shootingRoguelikePlayer.y -
      enemy.y;


    const distance =
      Math.sqrt(
        deltaX *
          deltaX +
        deltaY *
          deltaY
      );


    if (
      distance >
      0
    ) {

      enemy.x +=
        (
          deltaX /
          distance
        ) *
        enemy.speed *
        deltaTime;

      enemy.y +=
        (
          deltaY /
          distance
        ) *
        enemy.speed *
        deltaTime;

    }

  }

}


/* ==================================================
   자동 공격
================================================== */

function shootingRoguelikeAutoAttack(
  currentTime
) {

  /* ================================
     연속 발사 진행 중
  ================================ */

  if (
    shootingRoguelikeBurstShotsRemaining >
    0
  ) {

    if (
      currentTime >=
      shootingRoguelikeNextBurstShotTime
    ) {

      const burstShotFired =
        shootingRoguelikeFireProjectileSet();

      if (
        burstShotFired
      ) {

        shootingRoguelikeBurstShotsRemaining -=
          1;

        shootingRoguelikeNextBurstShotTime =
          currentTime +
          shootingRoguelikeBurstShotDelay;

      }

    }

    return;

  }


  /* ================================
     다음 공격 대기
  ================================ */

  if (
    currentTime -
    shootingRoguelikeLastShotTime <
    shootingRoguelikePlayer.attackInterval
  ) {

    return;

  }


  const fired =
    shootingRoguelikeFireProjectileSet();


  if (
    !fired
  ) {

    return;

  }


  shootingRoguelikeLastShotTime =
    currentTime;


  /* ================================
     연속 발사 횟수
  ================================ */

  if (
    shootingRoguelikePlayer.burstFireLevel >
    0
  ) {

    shootingRoguelikeBurstShotsRemaining =
      shootingRoguelikePlayer.burstFireLevel;

    shootingRoguelikeNextBurstShotTime =
      currentTime +
      shootingRoguelikeBurstShotDelay;

  }

}


/* ==================================================
   실제 탄환 발사
================================================== */

function shootingRoguelikeFireProjectileSet() {

  if (
    shootingRoguelikeEnemies.length ===
    0
  ) {

    return false;

  }


  let nearestEnemy =
    null;

  let nearestDistance =
    Infinity;


  for (
    const enemy of
    shootingRoguelikeEnemies
  ) {

    const deltaX =
      enemy.x -
      shootingRoguelikePlayer.x;

    const deltaY =
      enemy.y -
      shootingRoguelikePlayer.y;


    const distance =
      Math.sqrt(
        deltaX *
          deltaX +
        deltaY *
          deltaY
      );


    if (
      distance <
      nearestDistance
    ) {

      nearestDistance =
        distance;

      nearestEnemy =
        enemy;

    }

  }


  if (
    nearestEnemy ===
    null ||
    nearestDistance >
    shootingRoguelikePlayer.attackRange
  ) {

    return false;

  }


  const baseDirectionX =
    (
      nearestEnemy.x -
      shootingRoguelikePlayer.x
    ) /
    nearestDistance;


  const baseDirectionY =
    (
      nearestEnemy.y -
      shootingRoguelikePlayer.y
    ) /
    nearestDistance;


  const baseAngle =
    Math.atan2(
      baseDirectionY,
      baseDirectionX
    );


  const projectileCount =
    shootingRoguelikePlayer.projectileCount;


  for (
    let projectileIndex =
      0;

    projectileIndex <
    projectileCount;

    projectileIndex++
  ) {

    let angleOffset =
      0;


    if (
      projectileCount >
      1
    ) {

      const centerIndex =
        (
          projectileCount -
          1
        ) /
        2;


      angleOffset =
        (
          projectileIndex -
          centerIndex
        ) *
        shootingRoguelikePlayer.spreadAngle;

    }


    const angle =
      baseAngle +
      angleOffset;


    shootingRoguelikeProjectiles.push({

      x:
        shootingRoguelikePlayer.x,

      y:
        shootingRoguelikePlayer.y,

      velocityX:
        Math.cos(angle) *
        500,

      velocityY:
        Math.sin(angle) *
        500,

      radius:
        6,

      damage:
        shootingRoguelikePlayer.damage,

      life:
        1.5

    });

  }


  return true;

}


/* ==================================================
   탄환 업데이트
================================================== */

function updateShootingRoguelikeProjectiles(
  deltaTime
) {

  for (
    let index =
      shootingRoguelikeProjectiles.length -
      1;

    index >=
    0;

    index--
  ) {

    const projectile =
      shootingRoguelikeProjectiles[index];


    projectile.x +=
      projectile.velocityX *
      deltaTime;

    projectile.y +=
      projectile.velocityY *
      deltaTime;

    projectile.life -=
      deltaTime;


    if (
      projectile.life <=
      0 ||
      projectile.x <
      -50 ||
      projectile.x >
      shootingRoguelikeWidth +
      50 ||
      projectile.y <
      -50 ||
      projectile.y >
      shootingRoguelikeHeight +
      50
    ) {

      shootingRoguelikeProjectiles.splice(
        index,
        1
      );

    }

  }

}


/* ==================================================
   경험치 구슬 업데이트
================================================== */

function updateShootingRoguelikeExperienceOrbs(
  deltaTime
) {

  for (
    const orb of
    shootingRoguelikeExperienceOrbs
  ) {

    const deltaX =
      shootingRoguelikePlayer.x -
      orb.x;

    const deltaY =
      shootingRoguelikePlayer.y -
      orb.y;


    const distance =
      Math.sqrt(
        deltaX *
          deltaX +
        deltaY *
          deltaY
      );


    if (
      distance <
      100 &&
      distance >
      0
    ) {

      orb.x +=
        (
          deltaX /
          distance
        ) *
        180 *
        deltaTime;

      orb.y +=
        (
          deltaY /
          distance
        ) *
        180 *
        deltaTime;

    }

  }

}


/* ==================================================
   충돌 처리
================================================== */

function checkShootingRoguelikeCollisions() {

  /* ================================
     탄환과 적
  ================================ */

  for (
    let projectileIndex =
      shootingRoguelikeProjectiles.length -
      1;

    projectileIndex >=
    0;

    projectileIndex--
  ) {

    const projectile =
      shootingRoguelikeProjectiles[
        projectileIndex
      ];


    for (
      let enemyIndex =
        shootingRoguelikeEnemies.length -
        1;

      enemyIndex >=
      0;

      enemyIndex--
    ) {

      const enemy =
        shootingRoguelikeEnemies[
          enemyIndex
        ];


      const deltaX =
        projectile.x -
        enemy.x;

      const deltaY =
        projectile.y -
        enemy.y;


      const distance =
        Math.sqrt(
          deltaX *
            deltaX +
          deltaY *
            deltaY
        );


      if (
        distance <
        projectile.radius +
        enemy.radius
      ) {

        enemy.health -=
          projectile.damage;


        shootingRoguelikeProjectiles.splice(
          projectileIndex,
          1
        );


        if (
          enemy.health <=
          0
        ) {

          shootingRoguelikeKillsValue +=
            1;


          shootingRoguelikeExperienceOrbs.push({

            x:
              enemy.x,

            y:
              enemy.y,

            radius:
              7,

            value:
              1

          });


          shootingRoguelikeEnemies.splice(
            enemyIndex,
            1
          );

        }


        break;

      }

    }

  }


  /* ================================
     경험치 획득
  ================================ */

  for (
    let index =
      shootingRoguelikeExperienceOrbs.length -
      1;

    index >=
    0;

    index--
  ) {

    const orb =
      shootingRoguelikeExperienceOrbs[index];


    const deltaX =
      shootingRoguelikePlayer.x -
      orb.x;

    const deltaY =
      shootingRoguelikePlayer.y -
      orb.y;


    const distance =
      Math.sqrt(
        deltaX *
          deltaX +
        deltaY *
          deltaY
      );


    if (
      distance <
      shootingRoguelikePlayer.radius +
      orb.radius
    ) {

      shootingRoguelikeExperience +=
        orb.value;


      shootingRoguelikeExperienceOrbs.splice(
        index,
        1
      );


      while (
        shootingRoguelikeExperience >=
        shootingRoguelikeExperienceRequired
      ) {

        shootingRoguelikeExperience -=
          shootingRoguelikeExperienceRequired;

        shootingRoguelikeLevelValue +=
          1;

        shootingRoguelikeExperienceRequired =
          Math.floor(
            shootingRoguelikeExperienceRequired *
            1.35 +
            5
          );

        showShootingRoguelikeLevelUp();

        break;

      }

    }

  }


  /* ================================
     적과 플레이어
     피격 후 무적시간 적용
  ================================ */

  const currentTime =
    performance.now();


  if (
    currentTime <
    shootingRoguelikeInvincibleUntil
  ) {

    return;

  }


  for (
    const enemy of
    shootingRoguelikeEnemies
  ) {

    const deltaX =
      shootingRoguelikePlayer.x -
      enemy.x;

    const deltaY =
      shootingRoguelikePlayer.y -
      enemy.y;


    const distance =
      Math.sqrt(
        deltaX *
          deltaX +
        deltaY *
          deltaY
      );


    if (
      distance <
      shootingRoguelikePlayer.radius +
      enemy.radius
    ) {

      shootingRoguelikePlayer.health -=
        15;


      shootingRoguelikeInvincibleUntil =
        currentTime +
        shootingRoguelikeInvincibilityDuration;


      if (
        shootingRoguelikePlayer.health <=
        0
      ) {

        shootingRoguelikePlayer.health =
          0;

        endShootingRoguelikeGame();

      }


      break;

    }

  }

}


/* ==================================================
   레벨업 선택지
================================================== */

function showShootingRoguelikeLevelUp() {

  shootingRoguelikeLevelUpPaused =
    true;


  shootingRoguelikeUpgradeList.innerHTML =
    "";


  const upgrades = [

    {

      name:
        "강력한 탄환",

      description:
        "공격력이 25% 증가합니다.",

      apply:
        function () {

          shootingRoguelikePlayer.damage *=
            1.25;

        }

    },


    {

      name:
        "빠른 공격",

      description:
        "다음 공격까지 기다리는 시간이 20% 감소합니다.",

      apply:
        function () {

          shootingRoguelikePlayer.attackInterval *=
            0.8;

          shootingRoguelikePlayer.rapidFireLevel +=
            1;

        }

    },


    {

      name:
        "연속 발사",

      description:
        "한 번의 공격을 짧은 간격으로 2번 연속 발사합니다.",

      apply:
        function () {

          shootingRoguelikePlayer.burstFireLevel +=
            1;

        }

    },


    {

      name:
        "탄막 추가",

      description:
        "한 번 발사할 때 탄환이 1개 더 발사됩니다.",

      apply:
        function () {

          shootingRoguelikePlayer.projectileCount +=
            1;

          shootingRoguelikePlayer.multiShotLevel +=
            1;

        }

    },


    {

      name:
        "탄막 확장",

      description:
        "여러 발의 탄환이 더 넓은 부채꼴로 퍼집니다.",

      apply:
        function () {

          shootingRoguelikePlayer.spreadAngle *=
            1.25;

        }

    },


    {

      name:
        "질주",

      description:
        "이동 속도가 20% 증가합니다.",

      apply:
        function () {

          shootingRoguelikePlayer.speed *=
            1.2;

        }

    },


    {

      name:
        "튼튼한 체력",

      description:
        "최대 체력이 25 증가하고 체력을 회복합니다.",

      apply:
        function () {

          shootingRoguelikePlayer.maxHealth +=
            25;

          shootingRoguelikePlayer.health =
            Math.min(
              shootingRoguelikePlayer.maxHealth,
              shootingRoguelikePlayer.health +
              25
            );

        }

    }

  ];


  const shuffledUpgrades =
    upgrades.sort(
      function () {

        return Math.random() -
          0.5;

      }
    );


  const selectedUpgrades =
    shuffledUpgrades.slice(
      0,
      3
    );


  for (
    const upgrade of
    selectedUpgrades
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "shooting-roguelike-upgrade-button";


    button.innerHTML =
      "<strong>" +
      upgrade.name +
      "</strong>" +
      "<span>" +
      upgrade.description +
      "</span>";


    button.addEventListener(
      "click",
      function () {

        upgrade.apply();

        shootingRoguelikeLevelUpPaused =
          false;

        shootingRoguelikeLevelUpScreen.hidden =
          true;

        updateShootingRoguelikeInterface();

      }
    );


    shootingRoguelikeUpgradeList.appendChild(
      button
    );

  }


  shootingRoguelikeLevelUpScreen.hidden =
    false;

}


/* ==================================================
   게임 종료
================================================== */

function endShootingRoguelikeGame() {

  shootingRoguelikeGameRunning =
    false;

  shootingRoguelikeGameOver =
    true;

  shootingRoguelikeLevelUpPaused =
    false;

  shootingRoguelikeBurstShotsRemaining =
    0;


  const finalTime =
    formatShootingRoguelikeTime(
      shootingRoguelikeElapsedTime
    );


  const savedHighScore =
    Number(
      localStorage.getItem(
        shootingRoguelikeHighScoreKey
      ) ||
      0
    );


  if (
    shootingRoguelikeElapsedTime >
    savedHighScore
  ) {

    localStorage.setItem(
      shootingRoguelikeHighScoreKey,
      shootingRoguelikeElapsedTime
    );

  }


  shootingRoguelikeFinalTime.textContent =
    finalTime;


  shootingRoguelikeFinalKills.textContent =
    shootingRoguelikeKillsValue;


  shootingRoguelikeFinalLevel.textContent =
    shootingRoguelikeLevelValue;


  shootingRoguelikeHighScore.textContent =
    formatShootingRoguelikeTime(
      Math.max(
        shootingRoguelikeElapsedTime,
        savedHighScore
      )
    );


  shootingRoguelikeGameOverScreen.hidden =
    false;

}


/* ==================================================
   인터페이스 업데이트
================================================== */

function updateShootingRoguelikeInterface() {

  shootingRoguelikeTime.textContent =
    formatShootingRoguelikeTime(
      shootingRoguelikeElapsedTime
    );


  shootingRoguelikeLevel.textContent =
    shootingRoguelikeLevelValue;


  shootingRoguelikeKills.textContent =
    shootingRoguelikeKillsValue;


  const healthPercentage =
    (
      shootingRoguelikePlayer.health /
      shootingRoguelikePlayer.maxHealth
    ) *
    100;


  shootingRoguelikeHealthFill.style.width =
    Math.max(
      0,
      healthPercentage
    ) +
    "%";


  shootingRoguelikeHealthText.textContent =
    Math.ceil(
      shootingRoguelikePlayer.health
    ) +
    " / " +
    shootingRoguelikePlayer.maxHealth;


  const experiencePercentage =
    (
      shootingRoguelikeExperience /
      shootingRoguelikeExperienceRequired
    ) *
    100;


  shootingRoguelikeExpFill.style.width =
    Math.min(
      100,
      experiencePercentage
    ) +
    "%";


  shootingRoguelikeExpText.textContent =
    shootingRoguelikeExperience +
    " / " +
    shootingRoguelikeExperienceRequired;


  if (
    shootingRoguelikePlayer.burstFireLevel >
    0 &&
    shootingRoguelikePlayer.projectileCount >
    1
  ) {

    shootingRoguelikeWeapon.textContent =
      "연속 다중 탄환";

  }

  else if (
    shootingRoguelikePlayer.burstFireLevel >
    0
  ) {

    shootingRoguelikeWeapon.textContent =
      "연속 자동 탄환";

  }

  else if (
    shootingRoguelikePlayer.projectileCount >
    1
  ) {

    shootingRoguelikeWeapon.textContent =
      "다중 자동 탄환";

  }

  else {

    shootingRoguelikeWeapon.textContent =
      "자동 탄환";

  }


  const savedHighScore =
    Number(
      localStorage.getItem(
        shootingRoguelikeHighScoreKey
      ) ||
      0
    );


  shootingRoguelikeHighScore.textContent =
    formatShootingRoguelikeTime(
      savedHighScore
    );

}


/* ==================================================
   시간 표시
================================================== */

function formatShootingRoguelikeTime(
  seconds
) {

  const minutes =
    Math.floor(
      seconds /
      60
    );


  const remainingSeconds =
    Math.floor(
      seconds %
      60
    );


  return (

    String(
      minutes
    ).padStart(
      2,
      "0"
    )

    +

    ":"

    +

    String(
      remainingSeconds
    ).padStart(
      2,
      "0"
    )

  );

}


/* ==================================================
   게임 그리기
================================================== */

function drawShootingRoguelikeGame() {

  const context =
    shootingRoguelikeContext;


  context.clearRect(
    0,
    0,
    shootingRoguelikeWidth,
    shootingRoguelikeHeight
  );


  /* ================================
     배경
  ================================ */

  context.fillStyle =
    "#dff7ff";


  context.fillRect(
    0,
    0,
    shootingRoguelikeWidth,
    shootingRoguelikeHeight
  );


  /* ================================
     배경 격자
  ================================ */

  context.strokeStyle =
    "rgba(60, 170, 190, 0.15)";


  context.lineWidth =
    1;


  const gridSize =
    40;


  for (
    let x =
      0;

    x <=
    shootingRoguelikeWidth;

    x +=
    gridSize
  ) {

    context.beginPath();

    context.moveTo(
      x,
      0
    );

    context.lineTo(
      x,
      shootingRoguelikeHeight
    );

    context.stroke();

  }


  for (
    let y =
      0;

    y <=
    shootingRoguelikeHeight;

    y +=
    gridSize
  ) {

    context.beginPath();

    context.moveTo(
      0,
      y
    );

    context.lineTo(
      shootingRoguelikeWidth,
      y
    );

    context.stroke();

  }


  /* ================================
     경험치 구슬
  ================================ */

  for (
    const orb of
    shootingRoguelikeExperienceOrbs
  ) {

    context.beginPath();


    context.arc(
      orb.x,
      orb.y,
      orb.radius,
      0,
      Math.PI *
      2
    );


    context.fillStyle =
      "#22b8cf";


    context.fill();

  }


  /* ================================
     적
  ================================ */

  for (
    const enemy of
    shootingRoguelikeEnemies
  ) {

    context.beginPath();


    context.arc(
      enemy.x,
      enemy.y,
      enemy.radius,
      0,
      Math.PI *
      2
    );


    context.fillStyle =
      "#ef6c6c";


    context.fill();


    const healthPercentage =
      enemy.health /
      enemy.maxHealth;


    context.fillStyle =
      "#ffffff";


    context.fillRect(
      enemy.x -
      15,
      enemy.y -
      enemy.radius -
      8,
      30,
      4
    );


    context.fillStyle =
      "#e53935";


    context.fillRect(
      enemy.x -
      15,
      enemy.y -
      enemy.radius -
      8,
      30 *
      Math.max(
        0,
        healthPercentage
      ),
      4
    );

  }


  /* ================================
     탄환
  ================================ */

  for (
    const projectile of
    shootingRoguelikeProjectiles
  ) {

    context.beginPath();


    context.arc(
      projectile.x,
      projectile.y,
      projectile.radius,
      0,
      Math.PI *
      2
    );


    context.fillStyle =
      "#ffb703";


    context.fill();

  }


  /* ================================
     플레이어
     피격 무적시간 깜빡임
  ================================ */

  const currentTime =
    performance.now();


  const isInvincible =
    currentTime <
    shootingRoguelikeInvincibleUntil;


  if (
    !isInvincible ||
    Math.floor(
      currentTime /
      100
    ) %
    2 ===
    0
  ) {

    context.beginPath();


    context.arc(
      shootingRoguelikePlayer.x,
      shootingRoguelikePlayer.y,
      shootingRoguelikePlayer.radius,
      0,
      Math.PI *
      2
    );


    context.fillStyle =
      "#168aad";


    context.fill();


    context.beginPath();


    context.arc(
      shootingRoguelikePlayer.x,
      shootingRoguelikePlayer.y,
      shootingRoguelikePlayer.radius -
      6,
      0,
      Math.PI *
      2
    );


    context.fillStyle =
      "#ffffff";


    context.fill();

  }

}


/* ==================================================
   초기 상태
================================================== */

updateShootingRoguelikeInterface();

drawShootingRoguelikeGame();
```
