import { useEffect, useState } from "react";
import "../../src/css/commonpage.css";
import Button from "../components/Button";
import {
  getCompleteList,
  patchDeleteCompleteList,
  patchProgressCompleteList,
} from "../apis/etc/apicomplete";

const Complete = () => {
  // 완료된 일정 목록
  const [completeList, setCompleteList] = useState([]);
  // 체크박스 선택된 항목
  const [selectedItems, setSelectedItems] = useState([]);
  // 선택된 항목들의 ID를 저장
  const [selectedBoardId, setSelectBoardId] = useState([]);
  // state 변수
  const [state, setState] = useState(3);

  useEffect(() => {
    getApi();
  }, []);

  // *******의존성 배열 자리에 state가 추가되야할까 아닐까*******
  useEffect(() => {
    console.log("선택항목 : ", selectedItems);

    const boardIds = selectedItems.map(item => ({
      boardId: item.boardId,
      state: state,
    }));
    console.log(boardIds);
    console.log(state);
    setSelectBoardId(boardIds);
  }, [selectedItems, state]);

  const handleCheckboxChange = (item, isChecked) => {
    console.log("item", item);
    console.log("isChecked", isChecked);
    console.log("selectedItems", selectedItems);

    if (isChecked) {
      setSelectedItems(prevItems => [...prevItems, item]);
    } else {
      // isChecked 는 false
      // false 인 item 이 한개
      // item :  3
      // selectedItems = [1,2,3,4,5]
      setSelectedItems(prevItems =>
        prevItems.filter(selectedItem => selectedItem.boardId !== item.boardId),
      );
    }
  };

  // 완료 목록 불러오기
  //******* userid 에 따라 다른 값이 들어와야함 *******
  const getApi = async () => {
    const result = await getCompleteList();
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setCompleteList(result.resultData);
    // console.log(result.resultData);
  };

  // 완료 > 삭제 상태변경 state 2 > 3
  const handleDeleteApi = async () => {
    // 상태 코드 셋팅 (삭제 : 3)
    setState(3);
    // console.log(state);
    console.log(selectedBoardId);
    const result = await patchDeleteCompleteList(selectedBoardId);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setSelectBoardId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
    getApi(); // 완료 목록 갱신
  };

  // 완료 > 진행중 상태변경 state 2 > 1
  const handleProgressApi = async () => {
    // 상태 코드 셋팅 (복원 : 1)
    setState(1);
    const result = await patchProgressCompleteList(selectedBoardId);
    if (result.statusCode !== 2) {
      alert(result.resultMsg);
      return;
    }
    setSelectBoardId([]); // 선택된 항목 ID 초기화
    setSelectedItems([]); // 선택된 항목 초기화
    getApi(); // 완료 목록 갱신
  };

  return (
    <div className="common">
      <div className="common-inner">
        <h1 className="common-title">완료된 일정</h1>
        <div className="common-button">
          <Button
            label="복원"
            onClick={() => {
              handleProgressApi();
            }}
          ></Button>
          <Button
            label="삭제"
            onClick={() => {
              handleDeleteApi();
            }}
          ></Button>
        </div>
        <div className="common-menu">
          <div className="com-sizebox"></div>
          <div className="cmt">
            <span>일정 명</span>
          </div>
          <div className="cmtxt">
            <span> 일정 내용 </span>
          </div>
          <div className="cmdate">
            <span>날짜</span>
          </div>
          <div className="cmcalender">
            <span>캘린더 명</span>
          </div>
        </div>

        <div className="common-list-wrap">
          {completeList.map((item, index) => (
            <ul className="common-list" key={index}>
              <li className="checkbox-area">
                <input
                  type="checkbox"
                  className="com-checkbox"
                  onChange={e => handleCheckboxChange(item, e.target.checked)}
                  checked={selectedItems.some(
                    selectedItem => selectedItem.boardId === item.boardId,
                  )} // 체크박스 상태 설정 ***** 이해해보기 *****
                />
              </li>
              <li className="title-area">
                <span className="com-title">{item.title}</span>
              </li>
              <li className="text-area">
                <span className="com-text">{item.content}</span>
              </li>
              <li className="date-area">
                <span className="com-date">{item.dDay}</span>
              </li>
              <li className="calender-area">
                <span className="com-calender">{item.calendarName}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complete;
