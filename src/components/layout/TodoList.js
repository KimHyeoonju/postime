import styled from "@emotion/styled";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { patchCompleteList } from "../../apis/etc/apicomplete";
import { colorSystem } from "../../css/color";
import "../../css/todolist.css";

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
  const userId = sessionStorage.getItem("userId");

  // 오늘까지
  const [todoTodayListArr, setTodoTodayListArr] = useState([]);
  // 이번달까지
  const [todoMonthListArr, setTodoMonthListArr] = useState([]);
  // 다음달
  const [todoNextMonthListArr, setTodoNextMonthListArr] = useState([]);
  const nextMonth = moment().add(1, "months").format("YYYY년 M월");

  useEffect(() => {
    setToggle(todoListClassAdded);
  }, [todoListClassAdded]);

  const getTodoList = async userId => {
    try {
      const resepons = await axios.get(
        `/api/board/todo?signed_user_id=${userId}`,
      );
      const status = resepons.status.toString().charAt(0);
      if (status === "2") {
        return resepons.data;
      } else {
        console.log("API 오류");
      }
      console.log(resepons.data);
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  };

  const [todoListArr, setTodoListArr] = useState([]);
  const todoListPrint = async () => {
    const result = await getTodoList(userId);

    // (주석제거)
    setTodoListArr(result.resultData.untilNextMonthBoard);
    setTodoTodayListArr(result.resultData.untilTodayBoard);
    setTodoMonthListArr(result.resultData.untilThisMonthBoard);
    setTodoNextMonthListArr(result.resultData.untilNextMonthBoard);


    checkDay();
  };

  useEffect(() => {
    todoListPrint();
    return () => {};
  }, []);

  // TodoList 닫았을 때 : 체크한 일정 완료 처리 & 갱신
  useEffect(() => {
    if (toggle === false) {
      handleRestoreApi();
      todoListPrint();
    }
    return () => {};
  }, [toggle]);

  const handleClickOutside = e => {
    // 투두 리스트가 열려있는 상태에서만 실행합니다.
    if (toggle) {
      const isOutsideTodoList = !todoListRef.current.contains(e.target);
      const isOutsideTodoListWrap = !e.target.closest(".todo-list-wrap");

      // 투두 리스트와 그 외의 영역을 클릭했을 때 투두 리스트가 닫히도록 합니다.
      if (isOutsideTodoList && isOutsideTodoListWrap) {
        // setToggle 함수를 사용하여 상태를 업데이트합니다.
        setToggle(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle, onTodoListToggle]);

  const checkDay = dDay => {
    const endDay = moment(dDay).format("M월 D일");
    // console.log("check", endDay);
    return <span>{endDay}</span>;
  };

  // 체크박스 선택된 항목
  const [selectedItems, setSelectedItems] = useState([]);

  // 선택된 항목들의 boradid, state 를 저장
  const [selectedBoardId, setSelectBoardId] = useState([]);

  useEffect(() => {

    // 선택된 항목들의 boradid, state 를 저장
    const boardIds = selectedItems.map(item => ({
      boardId: item.boardId,
      state: 2,
    }));

    setSelectBoardId(boardIds);

  }, [selectedItems]);

  // input onchange 이벤트 핸들러
  const handleCheckboxChange = (item, isChecked) => {
    console.log("item : ", item);
    console.log("isChecked : ", isChecked);
    console.log("selectedItems : ", selectedItems);

    if (isChecked) {
      setSelectedItems(prevItems => [...prevItems, item]);
    } else {
      setSelectedItems(prevItems =>
        prevItems.filter(selectedItem => selectedItem.boardId !== item.boardId),
      );
    }
  };

  // state 1 > 2 완료 처리
  const handleRestoreApi = async () => {
    const result = await patchCompleteList(selectedBoardId);

    setSelectBoardId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
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
                {/* <span className="todo-list-sub-title-text">오늘까지 (1)</span> */}
                <span className="todo-list-sub-title-text">
                  오늘까지 ({todoTodayListArr.length})
                </span>
              </div>
              <div className="todo-list today-todo-list">
                {todoTodayListArr.map((item, index) => {
                  return (
                    <div
                      className="todo today-01"
                      style={{ borderLeft: `7px solid ${item.color}` }}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        onClick={() => {
                          selectedItems.some(
                            selectedItem =>
                              selectedItems.boardId === item.boardId,
                          );
                        }}
                        onChange={e =>
                          handleCheckboxChange(item, e.target.checked)
                        }
                      />
                      <div className="todo-info-wrap">
                        <div className="todo-info">
                          {/* 태그가 없을 때, 있을 때 처리 */}
                          {item.tags ? (
                            <div className="todo-info-tag">1</div>
                          ) : (
                            <div className="todo-info-tag dis-none">2</div>
                          )}
                          <div className="todo-info-title">{item.title}</div>
                        </div>
                        <div className="todo-deadline">
                          <span className="todo-deadline-text">
                            {checkDay(item.dDay)} 마감
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="todo-list-sub-title todo-list-this-month">
                <span className="todo-list-sub-title-text">
                  이번달까지 ({todoTodayListArr.length})
                </span>
              </div>
              <div className="todo-list this-month-todo-list">
                {todoMonthListArr.map((item, index) => {
                  return (
                    <div
                      className="todo this-month-01"
                      style={{ borderLeft: `7px solid ${item.color}` }}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        onClick={() => {
                          selectedItems.some(
                            selectedItem =>
                              selectedItems.boardId === item.boardId,
                          );
                          console.log(item);
                        }}
                        onChange={e =>
                          handleCheckboxChange(item, e.target.checked)
                        }
                      />
                      <div className="todo-info-wrap">
                        <div className="todo-info">
                          {/* 태그가 없을 때, 있을 때 처리 */}
                          {item.tags ? (
                            <div className="todo-info-tag">1</div>
                          ) : (
                            <div className="todo-info-tag dis-none">2</div>
                          )}
                          <div className="todo-info-title">{item.title}</div>
                        </div>
                        <div className="todo-deadline">
                          <span className="todo-deadline-text">
                            {checkDay(item.dDay)} 마감
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="todo-list-sub-title todo-list-next-month">
                <span className="todo-list-sub-title-text">
                  {nextMonth} ({todoNextMonthListArr.length})
                </span>
              </div>
              <div className="todo-list next-month-todo-list">
                {todoNextMonthListArr.map((item, index) => {
                  return (
                    <div
                      className="todo next-month-01"
                      style={{ borderLeft: `7px solid ${item.color}` }}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        onClick={() => {
                          selectedItems.some(
                            selectedItem =>
                              selectedItems.boardId === item.boardId,
                          );
                        }}
                        onChange={e =>
                          handleCheckboxChange(item, e.target.checked)
                        }
                        // checked={} // 체크박스 상태 설정
                      />
                      <div className="todo-info-wrap">
                        <div className="todo-info">
                          {/* 태그가 없을 때, 있을 때 처리 */}
                          {item.tags ? (
                            <div className="todo-info-tag">1</div>
                          ) : (
                            <div className="todo-info-tag dis-none">2</div>
                          )}
                          <div className="todo-info-title">{item.title}</div>
                        </div>
                        <div className="todo-deadline">
                          <span className="todo-deadline-text">
                            {checkDay(item.dDay)} 마감
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoListMenu>
  );
};

export default TodoList;
