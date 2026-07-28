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

  /* ==================================================
     공통 메뉴 생성 함수
  ================================================== */

  function createSiteHeader() {

    /*
     * 이미 공통 메뉴가 생성되어 있다면
     * 중복으로 생성하지 않습니다.
     */
    if (
      document.querySelector(
        ".site-header"
      )
    ) {
      return;
    }

    /* ==================================================
       현재 HTML 파일 위치 확인
    ================================================== */

    var currentPath =
      window.location.pathname;

    /*
     * 현재 페이지가 pages 폴더 안에 있는지 확인합니다.
     *
     * 예:
     * /index.html
     * → 최상위 폴더
     *
     * /pages/rps.html
     * → pages 폴더 안
     *
     * /pages/shooting-roguelike.html
     * → pages 폴더 안
     */
    var isInsidePagesFolder =
      currentPath.indexOf(
        "/pages/"
      ) !== -1;

    /*
     * 현재 HTML 파일 위치에 따라
     * 홈페이지 최상위 폴더로 이동하는 경로를 정합니다.
     */
    var rootPath =
      isInsidePagesFolder
        ? "../"
        : "";

    /* ==================================================
       홈페이지 페이지 경로
    ================================================== */

    var pagePaths = {

      home:
        rootPath +
        "index.html",

      rps:
        rootPath +
        "pages/rps.html",

      galleryGame:
        rootPath +
        "pages/gallery-game.html",

      shootingRoguelike:
        rootPath +
        "pages/shooting-roguelike.html",

      mentalMath:
        rootPath +
        "pages/mental-math.html",

      periodicTable:
        rootPath +
        "pages/periodic-table.html"

    };

    /* ==================================================
       공통 헤더 생성
    ================================================== */

    var header =
      document.createElement(
        "header"
      );

    header.className =
      "site-header";

    /* ==================================================
       네비게이션 생성
    ================================================== */

    var nav =
      document.createElement(
        "nav"
      );

    nav.className =
      "site-nav";

    nav.setAttribute(
      "aria-label",
      "주요 메뉴"
    );

    /* ==================================================
       메인 메뉴 목록 생성
    ================================================== */

    var menuList =
      document.createElement(
        "ul"
      );

    menuList.className =
      "main-menu";

    /* ==================================================
       일반 메뉴 링크 생성 함수
    ================================================== */

    function createMenuLink(
      text,
      href,
      className
    ) {

      var li =
        document.createElement(
          "li"
        );

      li.className =
        className ||
        "menu-item";

      var link =
        document.createElement(
          "a"
        );

      link.href =
        href;

      link.textContent =
        text;

      link.className =
        "menu-link";

      li.appendChild(
        link
      );

      return li;
    }

    /* ==================================================
       하위 메뉴 생성 함수
    ================================================== */

    function createDropdownMenu(
      text,
      submenuItems,
      className
    ) {

      var li =
        document.createElement(
          "li"
        );

      li.className =
        "menu-item menu-dropdown " +
        (
          className ||
          ""
        );

      /* ----------------------------------------------
         상위 메뉴 버튼
      ---------------------------------------------- */

      var button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "menu-link menu-toggle";

      button.textContent =
        text;

      button.setAttribute(
        "aria-expanded",
        "false"
      );

      button.setAttribute(
        "aria-haspopup",
        "true"
      );

      /* ----------------------------------------------
         하위 메뉴 목록
      ---------------------------------------------- */

      var submenu =
        document.createElement(
          "ul"
        );

      submenu.className =
        "submenu";

      submenu.setAttribute(
        "aria-label",
        text +
        " 하위 메뉴"
      );

      submenuItems.forEach(
        function (item) {

          var submenuLi =
            document.createElement(
              "li"
            );

          submenuLi.className =
            "submenu-item";

          var submenuLink =
            document.createElement(
              "a"
            );

          submenuLink.href =
            item.href;

          submenuLink.textContent =
            item.text;

          submenuLink.className =
            "submenu-link";

          submenuLi.appendChild(
            submenuLink
          );

          submenu.appendChild(
            submenuLi
          );

        }
      );

      li.appendChild(
        button
      );

      li.appendChild(
        submenu
      );

      /* ==================================================
         모바일 터치 메뉴
      ================================================== */

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          event.stopPropagation();

          var isOpen =
            li.classList.contains(
              "is-open"
            );

          /*
           * 다른 열린 하위 메뉴를 닫습니다.
           */
          document
            .querySelectorAll(
              ".menu-dropdown.is-open"
            )
            .forEach(
              function (openMenu) {

                if (
                  openMenu !== li
                ) {

                  openMenu.classList.remove(
                    "is-open"
                  );

                  var openButton =
                    openMenu.querySelector(
                      ".menu-toggle"
                    );

                  if (
                    openButton
                  ) {

                    openButton.setAttribute(
                      "aria-expanded",
                      "false"
                    );

                  }

                }

              }
            );

          /*
           * 현재 메뉴를 열거나 닫습니다.
           */
          li.classList.toggle(
            "is-open",
            !isOpen
          );

          button.setAttribute(
            "aria-expanded",
            String(
              !isOpen
            )
          );

        }
      );

      /* ==================================================
         PC 마우스 오버 메뉴
      ================================================== */

      li.addEventListener(
        "mouseenter",
        function () {

          li.classList.add(
            "is-hover"
          );

        }
      );

      li.addEventListener(
        "mouseleave",
        function () {

          li.classList.remove(
            "is-hover"
          );

        }
      );

      return li;

    }

    /* ==================================================
       처음으로
    ================================================== */

    menuList.appendChild(
      createMenuLink(
        "처음으로",
        pagePaths.home,
        "menu-item menu-home"
      )
    );

    /* ==================================================
       게임하자 하위 메뉴
    ================================================== */

    var gameMenuItems = [

      {
        text:
          "가위바위보게임",

        href:
          pagePaths.rps
      },

      {
        text:
          "갤로그게임",

        href:
          pagePaths.galleryGame
      },

      {
        text:
          "슈팅 로그라이크",

        href:
          pagePaths.shootingRoguelike
      }

    ];

    menuList.appendChild(
      createDropdownMenu(
        "게임하자",
        gameMenuItems,
        "menu-games"
      )
    );

    /* ==================================================
       공부하자 하위 메뉴
    ================================================== */

    var studyMenuItems = [

      {
        text:
          "암산연습",

        href:
          pagePaths.mentalMath
      },

      {
        text:
          "원소주기율표",

        href:
          pagePaths.periodicTable
      }

    ];

    menuList.appendChild(
      createDropdownMenu(
        "공부하자",
        studyMenuItems,
        "menu-study"
      )
    );

    /* ==================================================
       메뉴 조립
    ================================================== */

    nav.appendChild(
      menuList
    );

    header.appendChild(
      nav
    );

    /* ==================================================
       헤더 삽입
    ================================================== */

    /*
     * body가 존재하면 즉시 삽입합니다.
     */
    if (
      document.body
    ) {

      document.body.insertBefore(
        header,
        document.body.firstChild
      );

    }

    /*
     * body가 아직 만들어지지 않았다면
     * DOMContentLoaded 때 삽입합니다.
     */
    else {

      document.addEventListener(
        "DOMContentLoaded",
        function () {

          if (
            !document.querySelector(
              ".site-header"
            )
          ) {

            document.body.insertBefore(
              header,
              document.body.firstChild
            );

          }

        },
        {
          once: true
        }
      );

    }

    /* ==================================================
       바깥 영역 클릭 시 하위 메뉴 닫기
    ================================================== */

    document.addEventListener(
      "click",
      function () {

        document
          .querySelectorAll(
            ".menu-dropdown.is-open"
          )
          .forEach(
            function (openMenu) {

              openMenu.classList.remove(
                "is-open"
              );

              var openButton =
                openMenu.querySelector(
                  ".menu-toggle"
                );

              if (
                openButton
              ) {

                openButton.setAttribute(
                  "aria-expanded",
                  "false"
                );

              }

            }
          );

      }
    );

    /* ==================================================
       헤더 내부 클릭 전파 방지
    ================================================== */

    header.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

      }
    );

  }

  /* ==================================================
     DOM 준비 상태에 따라 메뉴 생성
  ================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      createSiteHeader,
      {
        once: true
      }
    );

  }

  else {

    createSiteHeader();

  }

})();