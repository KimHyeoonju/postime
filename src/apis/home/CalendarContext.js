import React, { createContext, useState } from "react";

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [checkedCalendars, setCheckedCalendars] = useState([]);

  return (
    <CalendarContext.Provider value={{ checkedCalendars, setCheckedCalendars }}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
