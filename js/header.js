// 파일 경로: /js/header.js

(function () {
  "use strict";

  /*
   * 홈페이지 공통 상단 메뉴
   *
   * 담당 기능:
   * 1. 공통 상단 메뉴 생성
   * 2. 현재 HTML 파일 위치에 따른 상대 경로 자동 계산
   * 3. 게임하자 하위 메뉴 생성
   * 4. 공부하자 하위 메뉴 생성
   * 5. PC 마우스 오버 메뉴 지원
   * 6. 모바일 터치 메뉴 지원
   *
   * 담당하지 않는 기능:
   * - 게임 기능
   * - 공부 기능
   * - 점수 계산
   * - 게임 진행
   * - 학습 기능
   */

  // 현재 HTML 파일이 pages 폴더 안에 있는지 확인합니다.
  var isInsidePagesFolder = window.location.pathname.indexOf("/pages/") !== -1;

  // 현재 HTML 위치를 기준으로 최상위 폴더까지 이동하는 경로입니다.
  var rootPath = isInsidePagesFolder ? "../" : "";

  // 홈페이지의 각 페이지 경로를 자동으로 계산합니다.
  var pagePaths = {
    home: rootPath + "index.html",
    rps: rootPath + "pages/rps.html",
    galleryGame: rootPath + "pages/gallery-game.html",
    mentalMath: rootPath + "pages/mental-math.html",
    periodicTable: rootPath + "pages/periodic-table.html"
  };

  // 공통 메뉴가 들어갈 위치를 만듭니다.
  var header = document.createElement("header");
  header.className = "site-header";

  // 메뉴 전체를 감싸는 영역입니다.
  var nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "주요 메뉴");

  // 메뉴 목록입니다.
  var menuList = document.createElement("ul");
  menuList.className = "main-menu";

  // 일반 메뉴 항목을 만드는 함수입니다.
  function createMenuLink(text, href, className) {
    var li = document.createElement("li");
    li.className = className || "menu-item";

    var link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    link.className = "menu-link";

    li.appendChild(link);

    return li;
  }

  // 하위 메뉴가 있는 메뉴 항목을 만드는 함수입니다.
  function createDropdownMenu(text, submenuItems, className) {
    var li = document.createElement("li");
    li.className = "menu-item menu-dropdown " + (className || "");

    // PC와 모바일에서 모두 사용할 수 있는 메뉴 버튼입니다.
    var button = document.createElement("button");
    button.type = "button";
    button.className = "menu-link menu-toggle";
    button.textContent = text;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-haspopup", "true");

    // 하위 메뉴입니다.
    var submenu = document.createElement("ul");
    submenu.className = "submenu";

    submenuItems.forEach(function (item) {
      var submenuLi = document.createElement("li");
      submenuLi.className = "submenu-item";

      var submenuLink = document.createElement("a");
      submenuLink.href = item.href;
      submenuLink.textContent = item.text;
      submenuLink.className = "submenu-link";

      submenuLi.appendChild(submenuLink);
      submenu.appendChild(submenuLi);
    });

    li.appendChild(button);
    li.appendChild(submenu);

    // 모바일 터치용 메뉴 열기/닫기
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      var isOpen = li.classList.contains("is-open");

      // 다른 하위 메뉴를 닫습니다.
      document.querySelectorAll(".menu-dropdown.is-open").forEach(function (openMenu) {
        if (openMenu !== li) {
          openMenu.classList.remove("is-open");

          var openButton = openMenu.querySelector(".menu-toggle");

          if (openButton) {
            openButton.setAttribute("aria-expanded", "false");
          }
        }
      });

      // 현재 메뉴의 상태를 변경합니다.
      li.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });

    // PC 마우스 오버용 메뉴 열기
    li.addEventListener("mouseenter", function () {
      li.classList.add("is-hover");
    });

    // PC 마우스가 메뉴를 벗어나면 닫기
    li.addEventListener("mouseleave", function () {
      li.classList.remove("is-hover");
    });

    return li;
  }

  // 처음으로 메뉴
  menuList.appendChild(
    createMenuLink(
      "처음으로",
      pagePaths.home,
      "menu-item menu-home"
    )
  );

  // 게임하자 하위 메뉴
  var gameMenuItems = [
    {
      text: "가위바위보게임",
      href: pagePaths.rps
    },
    {
      text: "갤로그게임",
      href: pagePaths.galleryGame
    }
  ];

  menuList.appendChild(
    createDropdownMenu(
      "게임하자",
      gameMenuItems,
      "menu-games"
    )
  );

  // 공부하자 하위 메뉴
  var studyMenuItems = [
    {
      text: "암산연습",
      href: pagePaths.mentalMath
    },
    {
      text: "원소주기율표",
      href: pagePaths.periodicTable
    }
  ];

  menuList.appendChild(
    createDropdownMenu(
      "공부하자",
      studyMenuItems,
      "menu-study"
    )
  );

  // 메뉴를 nav에 넣습니다.
  nav.appendChild(menuList);

  // nav를 header에 넣습니다.
  header.appendChild(nav);

  // HTML 문서의 가장 앞에 공통 헤더를 삽입합니다.
  if (document.body) {
    document.body.insertBefore(header, document.body.firstChild);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.insertBefore(header, document.body.firstChild);
    });
  }

  // 페이지의 다른 영역을 클릭하면 열린 하위 메뉴를 닫습니다.
  document.addEventListener("click", function () {
    document.querySelectorAll(".menu-dropdown.is-open").forEach(function (openMenu) {
      openMenu.classList.remove("is-open");

      var openButton = openMenu.querySelector(".menu-toggle");

      if (openButton) {
        openButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 메뉴 내부를 클릭했을 때 document의 클릭 이벤트가
  // 바로 실행되어 메뉴가 닫히는 것을 방지합니다.
  header.addEventListener("click", function (event) {
    event.stopPropagation();
  });
})();