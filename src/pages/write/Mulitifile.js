import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { deleteURLFile } from "../../apis/create/createApi";

const Mulitifile = ({
  sendFiles,
  setSendFiles,
  calendarId,
  boardId,
  sendUrlFiles,
  setSendUrlFiles,
}) => {
  // 파일 선택 태그
  const fileBt = useRef(null);

  // File 객체를 관리

  // 이미지 미리보기 URL 관리
  const [previewUrlFiles, setPreviewUrlFiles] = useState([]);
  // 사용자가 새로 올린 파일 미리보기 관리
  const [previewFiles, setPreviewFiles] = useState([]);

  // useEffect(() => {
  //   setSendFiles(sendFiles);
  // }, [sendFiles]);

  useEffect(() => {
    setPreviewUrlFiles(sendUrlFiles);
  }, [sendUrlFiles]);

  // 이미지 미리보기 JSX
  const makeUrlThumbnail = () => {
    return previewUrlFiles?.map((item, index) => (
      <div className="write-img-contain" key={index}>
        <AiFillCloseSquare
          className="img-delete"
          onClick={() => {
            console.log("여기니?");
            deleteUrlFile(index);
          }}
        />
        <img
          src={`http://112.222.157.156:5113/pic/calendar/${calendarId}/board/${boardId}/${item.fileName}`}
          alt={`preview-${index}`}
        />
      </div>
    ));
  };
  //  사용자가 업로드 한 경우의 이미지 미리보기
  const makeThumbnail = () => {
    console.log("============= previewFiles ", previewFiles);
    return previewFiles.map((item, index) => (
      <div className="write-img-contain" key={index}>
        <AiFillCloseSquare
          className="img-delete"
          onClick={() => {
            deleteFile(index);
          }}
        />
        <img src={item} alt={`preview-${index}`} />
      </div>
    ));
  };

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    fileBt.current.click();
  };

  // 파일 목록
  const handleFileChange = e => {
    const filesArr = Array.from(e.target.files);
    setSendFiles([...sendFiles, ...filesArr]);

    const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
    setPreviewFiles([...previewFiles, ...imgUrlArr]);
  };

  // URL 파일 삭제 처리
  const deleteUrlFile = async _index => {
    const previewUrlFilesData = previewUrlFiles[_index];
    const sendUrlData = {
      boardId,
      calendarId,
      fileId: previewUrlFilesData.fileId,
      fileName: previewUrlFilesData.fileName,
    };
    await deleteURLFile(sendUrlData);

    const tempPreviewArr = previewUrlFiles.filter(
      (item, index) => index !== _index,
    );
    // console.log("deleteUrlFile : ", _index);
    // console.log("tempPreviewArr : ", tempPreviewArr);
    setPreviewUrlFiles(tempPreviewArr);
    const tempFileArr = sendFiles.filter((item, index) => index !== _index);
    setSendUrlFiles(tempFileArr);
  };

  // 파일 목록에서 특정 항목 삭제
  const deleteFile = _index => {
    const tempPreviewArr = previewFiles.filter(
      (item, index) => index !== _index,
    );
    setPreviewFiles(tempPreviewArr);
    const tempFileArr = sendFiles.filter((item, index) => index !== _index);
    setSendFiles(tempFileArr);
  };

  useEffect(() => {
    console.log(sendFiles);
    console.log(previewUrlFiles);
  }, [sendFiles, previewUrlFiles]);

  return (
    // 이미지 전체 영역
    <div className="write-img">
      {/* 이미지 보여지는 곳 */}
      <div className="write-img-inner">
        <div className="write-img-contain">
          {makeUrlThumbnail()}
          {makeThumbnail()}
        </div>
      </div>
      <button className="img-upload" type="button">
        <label htmlFor="input-file" onClick={handleFileClick}>
          <span>이미지 업로드</span>
          <input
            type="file"
            className="img-upload-bt"
            accept="image/*"
            required
            multiple
            ref={fileBt}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </button>
    </div>

    //     <div className="write-img">
    //       <div className="write-img-warp">
    //         <div className="write-img-inner">
    //           <button className="img-upload" type="button">
    //             <label htmlFor="input-file" onClick={handleFileClick}>
    //               <span>이미지 업로드</span>
    //               <input
    //                 type="file"
    //                 className="img-upload-button"
    //                 accept="image/*"
    //                 required
    //                 multiple
    //                 ref={fileBt}
    //                 onChange={handleFileChange}
    //               />
    //             </label>
    //           </button>

    //           {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
    //           <div className="write-img-contain">{makeThumbnail()}</div>
    //         </div>
    //       </div>
    //     </div>

    // <fieldset>
    // <legend>파일정보</legend>
    // <div>{makeThumbnail()}</div>
    // <div
    //   style={{
    //     width: 50,
    //     height: 50,
    //     background: "red",
    //     cursor: "pointer",
    //     color: "#fff",
    //   }}
    //   onClick={() => handleFileClick()}
    // >
    //   파일을 선택
    // </div>
    // <input
    //   id="filebt_id"
    //   ref={fileBt}
    //   type="file"
    //   accept="image/jpeg, image/png, image/gif"
    //   multiple
    //   onChange={e => handleFileChange(e)}
    //   style={{ display: "none" }}
    // />
    // </fieldset>
  );
};

export default Mulitifile;
