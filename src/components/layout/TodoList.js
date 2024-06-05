import "../../css/todolist.css";

const TodoList = () => {
  return (
    <div className="todo-list-menu-wrap todolistOff">
      <div className="todo-list-menu-div">
        <div className="todo-list-wrap">
          <div className="todo-list-btn-wrap">
            <button type="button" className="todo-create-btn">
              + 추가
            </button>
          </div>

          <div className="todo-list-box">
            <div className="todo-list-sub-title todo-list-today">
              <span className="todo-list-sub-title-text">오늘까지 (1)</span>
            </div>
            <div className="todo-list today-todo-list">
              <div className="todo today-01">
                <input type="checkbox" className="todo-checkbox" />
                <div className="todo-info-wrap todo-info-no-01">
                  <div className="todo-info">
                    <div className="todo-info-tag">태그</div>
                    <div className="todo-info-title">개인 일정 1</div>
                  </div>
                  <div className="todo-deadline">
                    <span className="todo-deadline-text">6월 3일 마감</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="todo-list-sub-title todo-list-this-month">
              <span className="todo-list-sub-title-text">이번달까지 (3)</span>
            </div>
            <div className="todo-list this-month-todo-list">
              <div className="todo this-month-01">
                <input type="checkbox" className="todo-checkbox" />
                <div className="todo-info-wrap">
                  <div className="todo-info">
                    <div className="todo-info-tag dis-none">태그</div>
                    <div className="todo-info-title">A팀 일정</div>
                  </div>
                  <div className="todo-deadline">
                    <span className="todo-deadline-text">6월 13일 마감</span>
                  </div>
                </div>
              </div>
              <div className="todo this-month-02">
                <input type="checkbox" className="todo-checkbox" />
                <div className="todo-info-wrap todo-info-no-02">
                  <div className="todo-info">
                    <div className="todo-info-tag dis-none">태그</div>
                    <div className="todo-info-title">B팀 일정</div>
                  </div>
                  <div className="todo-deadline">
                    <span className="todo-deadline-text">6월 14일 마감</span>
                  </div>
                </div>
              </div>
              <div className="todo this-month-03">
                <input type="checkbox" className="todo-checkbox" />
                <div className="todo-info-wrap todo-info-no-03">
                  <div className="todo-info">
                    <div className="todo-info-tag dis-none">태그</div>
                    <div className="todo-info-title">개인 일정 2</div>
                  </div>
                  <div className="todo-deadline">
                    <span className="todo-deadline-text">6월 29일 마감</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="todo-list-sub-title todo-list-next-month">
              <span className="todo-list-sub-title-text">2024년 7월 (1)</span>
            </div>
            <div className="todo-list next-month-todo-list">
              <div className="todo next-month-01">
                <input type="checkbox" className="todo-checkbox" />
                <div className="todo-info-wrap todo-info-no-01">
                  <div className="todo-info">
                    <div className="todo-info-tag">태그</div>
                    <div className="todo-info-title">개인 일정 3</div>
                  </div>
                  <div className="todo-deadline">
                    <span className="todo-deadline-text">7월 5일 마감</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
