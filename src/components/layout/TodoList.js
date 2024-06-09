import styled from "@emotion/styled";
import "../../css/todolist.css";
import { useEffect, useRef, useState } from "react";
import { colorSystem } from "../../css/color";
import { Link } from "react-router-dom";

const TodoListMenu = styled.div`
  &.todolistOff {
    display: none;
  }

  .todo-list-menu-wrap {
    display: flex;
  }

  .todo-create-btn {
    border: 1px solid ${colorSystem.g500};
    cursor: pointer;
  }

  .todo-checkbox {
    cursor: pointer;
  }
`;

const TodoList = ({ todoListClassAdded, onTodoListToggle, todoListClose }) => {
  const [toggle, setToggle] = useState(todoListClassAdded);
  const todoListRef = useRef(null);

  useEffect(() => {
    setToggle(todoListClassAdded);
  }, [todoListClassAdded]);

  const handleClickOutside = e => {
    // 투두 리스트가 열려있는 상태에서만 실행합니다.
    if (toggle) {
      const isOutsideTodoList = !todoListRef.current.contains(e.target);
      const isOutsideTodoListWrap = !e.target.closest(".todo-list-wrap");

      // 투두 리스트와 그 외의 영역을 클릭했을 때 투두 리스트가 닫히도록 합니다.
      if (isOutsideTodoList && isOutsideTodoListWrap) {
        // setToggle 함수를 사용하여 상태를 업데이트합니다.
        setToggle(false);
        // onTodoListToggle(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle, onTodoListToggle]);

  const handleCreateButtonClick = () => {
    window.location.href = "/write/create";
  };

  return (
    <TodoListMenu ref={todoListRef} className={toggle ? "" : "todolistOff"}>
      <div className="todo-list-menu-wrap">
        {/* <div className="todo-list-menu-wrap todolistOff"> */}
        <div className="todo-list-menu-div">
          <div className="todo-list-wrap">
            <div className="todo-list-btn-wrap">
              <Link to="/write/create">
                <button
                  type="button"
                  className="todo-create-btn"
                  onClick={todoListClose}
                >
                  + 추가
                </button>
              </Link>
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
    </TodoListMenu>
  );
};

export default TodoList;
