const todolistHtml = `              <div class="todo-list-menu-div">
<div class="todo-list-wrap">
  <div class="todo-list-btn-wrap">
    <button type="button" class="todo-create-btn">
      + 추가
    </button>
  </div>

  <!-- todo-list-box : start -->
  <div class="todo-list-box">
    <!-- today -->
    <div class="todo-list-sub-title todo-list-today">
      <span class="todo-list-sub-title-text">오늘까지 (1)</span>
    </div>
    <div class="todo-list today-todo-list">
      <div class="todo today-01">
        <input type="checkbox" class="todo-checkbox" />
        <div class="todo-info-wrap todo-info-no-01">
          <div class="todo-info">
            <div class="todo-info-tag">태그</div>
            <div class="todo-info-title">개인 일정 1</div>
          </div>
          <div class="todo-deadline">
            <span class="todo-deadline-text">6월 3일 마감</span>
          </div>
        </div>
      </div>
    </div>

    <!-- this-month -->
    <div class="todo-list-sub-title todo-list-this-month">
      <span class="todo-list-sub-title-text"
        >이번달까지 (3)</span
      >
    </div>
    <div class="todo-list this-month-todo-list">
      <div class="todo this-month-01">
        <input type="checkbox" class="todo-checkbox" />
        <div class="todo-info-wrap">
          <div class="todo-info">
            <div class="todo-info-tag dis-none">태그</div>
            <div class="todo-info-title">A팀 일정</div>
          </div>
          <div class="todo-deadline">
            <span class="todo-deadline-text"
              >6월 13일 마감</span
            >
          </div>
        </div>
      </div>
      <div class="todo this-month-02">
        <input type="checkbox" class="todo-checkbox" />
        <div class="todo-info-wrap todo-info-no-02">
          <div class="todo-info">
            <div class="todo-info-tag dis-none">태그</div>
            <div class="todo-info-title">B팀 일정</div>
          </div>
          <div class="todo-deadline">
            <span class="todo-deadline-text"
              >6월 14일 마감</span
            >
          </div>
        </div>
      </div>
      <div class="todo this-month-03">
        <input type="checkbox" class="todo-checkbox" />
        <div class="todo-info-wrap todo-info-no-03">
          <div class="todo-info">
            <div class="todo-info-tag dis-none">태그</div>
            <div class="todo-info-title">개인 일정 2</div>
          </div>
          <div class="todo-deadline">
            <span class="todo-deadline-text"
              >6월 29일 마감</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- next-month -->
    <div class="todo-list-sub-title todo-list-next-month">
      <span class="todo-list-sub-title-text"
        >2024년 7월 (1)</span
      >
    </div>
    <div class="todo-list next-month-todo-list">
      <div class="todo next-month-01">
        <input type="checkbox" class="todo-checkbox" />
        <div class="todo-info-wrap todo-info-no-01">
          <div class="todo-info">
            <div class="todo-info-tag">태그</div>
            <div class="todo-info-title">개인 일정 3</div>
          </div>
          <div class="todo-deadline">
            <span class="todo-deadline-text">7월 5일 마감</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- todo-list-box : end -->
</div>
</div>`;

const todolist = document.querySelector(".todo-list-menu-wrap");

todolist.innerHTML = todolistHtml;

// <div class="todo-list-menu-div">
//                 <div class="todo-list-wrap">
//                   <div class="todo-list-btn-wrap">
//                     <button type="button" class="todo-create-btn">
//                       + 추가
//                     </button>
//                   </div>

//                   <div class="todo-list-box">
//                     <div class="todo-list-sub-title todo-list-today">
//                       <span class="todo-list-sub-title-text">오늘까지 (1)</span>
//                     </div>
//                     <div class="todo-list today-todo-list">
//                       <div class="todo today-01">
//                         <input type="checkbox" class="todo-checkbox" />
//                         <div class="todo-info-wrap todo-info-no-01">
//                           <div class="todo-info">
//                             <div class="todo-info-tag">태그</div>
//                             <div class="todo-info-title">개인 일정 1</div>
//                           </div>
//                           <div class="todo-deadline">
//                             <span class="todo-deadline-text">6월 3일 마감</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div class="todo-list-sub-title todo-list-this-month">
//                       <span class="todo-list-sub-title-text"
//                         >이번달까지 (3)</span
//                       >
//                     </div>
//                     <div class="todo-list this-month-todo-list">
//                       <div class="todo this-month-01">
//                         <input type="checkbox" class="todo-checkbox" />
//                         <div class="todo-info-wrap">
//                           <div class="todo-info">
//                             <div class="todo-info-tag dis-none">태그</div>
//                             <div class="todo-info-title">A팀 일정</div>
//                           </div>
//                           <div class="todo-deadline">
//                             <span class="todo-deadline-text"
//                               >6월 13일 마감</span
//                             >
//                           </div>
//                         </div>
//                       </div>
//                       <div class="todo this-month-02">
//                         <input type="checkbox" class="todo-checkbox" />
//                         <div class="todo-info-wrap todo-info-no-02">
//                           <div class="todo-info">
//                             <div class="todo-info-tag dis-none">태그</div>
//                             <div class="todo-info-title">B팀 일정</div>
//                           </div>
//                           <div class="todo-deadline">
//                             <span class="todo-deadline-text"
//                               >6월 14일 마감</span
//                             >
//                           </div>
//                         </div>
//                       </div>
//                       <div class="todo this-month-03">
//                         <input type="checkbox" class="todo-checkbox" />
//                         <div class="todo-info-wrap todo-info-no-03">
//                           <div class="todo-info">
//                             <div class="todo-info-tag dis-none">태그</div>
//                             <div class="todo-info-title">개인 일정 2</div>
//                           </div>
//                           <div class="todo-deadline">
//                             <span class="todo-deadline-text"
//                               >6월 29일 마감</span
//                             >
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div class="todo-list-sub-title todo-list-next-month">
//                       <span class="todo-list-sub-title-text"
//                         >2024년 7월 (1)</span
//                       >
//                     </div>
//                     <div class="todo-list next-month-todo-list">
//                       <div class="todo next-month-01">
//                         <input type="checkbox" class="todo-checkbox" />
//                         <div class="todo-info-wrap todo-info-no-01">
//                           <div class="todo-info">
//                             <div class="todo-info-tag">태그</div>
//                             <div class="todo-info-title">개인 일정 3</div>
//                           </div>
//                           <div class="todo-deadline">
//                             <span class="todo-deadline-text">7월 5일 마감</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
