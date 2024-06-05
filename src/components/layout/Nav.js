const Nav = () => {
  const todolistMenuBtnClick = () => {
    const todoMenuBtn = document.querySelector(".move-writepage-btn");
    const todolistClick = document.querySelector(".todo-list-menu-wrap");

    // todoMenuBtn.addEventListener("click", () => {
    //   //   document.div.style.backgroundColor = "red";

    //   const classLength = todolistClick.classList.length;
    //   for (let i = 0; i < classLength; i++) {
    //     if (todolistClick.classList.item(i) === "todolistOff") {
    //       todolistClick.className = "todo-list-menu-wrap";
    //     } else {
    //       todolistClick.className += " todolistOff";
    //     }
    //   }
    //   console.log(todolistClick.className);
    // });
  };

  return (
    <div className="menu">
      <div className="div-menu-header">
        <h1 className="menu-header">
          <a href="index.html">
            <div className="postime-logo"></div>
            <span className="blind">POSTIME</span>
          </a>
        </h1>
      </div>

      <div className="move-writepage-btn-area-wrap">
        <div className="move-writepage-btn-area">
          <span className="move-writepage">
            <button type="button" className="move-writepage-btn">
              <span
                className="ns-font-bold-17"
                onClick={todolistMenuBtnClick()}
                // onclick="todolistMenuBtnClick()"
              >
                일정 등록
              </span>
            </button>
          </span>
        </div>
      </div>

      <div className="nav-all-calender-wrap">
        <div className="nav-all-calender">
          <div className="nav-icon-style nav-complete-icon">
            <i className=" icon-30"></i>
          </div>
          <span className="ns-font-bold-17 all-calender-icon">전체 일정</span>
        </div>
      </div>

      <div className="nav-content">
        <div className="nav-wrap">
          <div className="nav-inner">
            <div className="div-calender div-mycalender-title">
              <h1 className="mycalender-title">
                <div
                  className="mycalender-btn"
                  // onclick="calenderListBtnClick()"
                ></div>
                <span className="ns-font-bold-17">내 캘린더</span>
              </h1>
            </div>
            <div className="div-calender div-mycalender-list">
              <div className="div-calender mycalender-list mycalender">
                <input type="checkbox" className="calender-color" />
                <div className="calender-name">내 캘린더</div>
              </div>
              <div className="div-calender mycalender-list a-team-calender">
                <input type="checkbox" className="calender-color" />
                <div className="calender-name">A팀 캘린더</div>
              </div>
              <div className="div-calender mycalender-list b-team-calender">
                <input type="checkbox" className="calender-color" />
                <div className="calender-name">B팀 캘린더</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-content">
        <div className="nav-wrap">
          <div className="nav-inner nav-menu-gap">
            <div className="div-calender div-mycalender-title">
              <div className="mycalender-title">
                <div className="nav-icon-style nav-complete-icon"></div>
                <span className="ns-font-17">완료</span>
              </div>
            </div>
            <div className="div-calender div-mycalender-title">
              <div className="mycalender-title">
                <div className="nav-icon-style nav-delete-icon"></div>
                <span className="ns-font-17">휴지통</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-content">
        <div className="nav-wrap">
          <div className="nav-inner nav-menu-gap">
            <div className="div-calender div-mycalender-title">
              <div className="mycalender-title">
                <div className="nav-icon-style nav-alarm-icon"></div>
                <span className="ns-font-17">알림</span>
              </div>
            </div>
            <div className="div-calender div-mycalender-title">
              <div className="mycalender-title">
                <div className="nav-icon-style nav-support-icon"></div>
                <span className="ns-font-17">고객지원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
