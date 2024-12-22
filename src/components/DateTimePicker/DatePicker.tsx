import React, { FC, useEffect, useState } from "react";
import { days } from "../../utils/constants/days";
import { getWeek } from "../../utils/getWeak";
import Arrow from "../UI/Icons/ArrowsIcons";
import { compareDate } from "../../utils/compareDate";

type Props = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const today = new Date();

const DatePicker: FC<Props> = ({ date, setDate }) => {
  const [week, setWeek] = useState(0);
  const changeDate = (weekDate:Date) => {
    if (compareDate(weekDate, today) >= 0)
    setDate(weekDate);
  };

  const getDateStyle = (weekDate: Date, electDate: Date): string => {
    if (compareDate(weekDate, today) < 0) {
      return "text-gray-500";
    } else if (compareDate(weekDate, electDate) === 0) {
      return "bg-violet-500 text-white";
    } else {
      return "text-violet-700";
    }
  };

  let electWeek: Date[] = getWeek(today, week);
  useEffect(() => {
    electWeek = getWeek(today, week);
  }, [week]);

  return (
    <div className="flex justify-center items-center gap-5">
      <div
        className="arrowContainer"
        onClick={() => compareDate(electWeek[0], today) > 0 && setWeek(week - 1)}
      >
        <Arrow direction="left" />
      </div>
      <div className="w-full rounded-xl max-w-xl border border-slate-300 overflow-hidden">
        <div className="flex text-center box-content">
          {electWeek?.map((weekDate, index) => {
            return (
              <div className="w-full text-xl" key={index*Number(weekDate)}>
                <div className="bg-slate-200 border-b border-slate-300 py-3 text-slate-600">
                  {days[index]}
                </div>
                <div
                  onClick={() => changeDate(weekDate)}
                  className={`py-5 cursor-pointer ${getDateStyle(
                    weekDate,
                    date
                  )}`}
                >
                  <div className="text-3xl">{weekDate.getDate()}</div>
                  <div>
                    {weekDate
                      .toLocaleString("en-US", { month: "long" })
                      .slice(0, 3)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="arrowContainer"
        onClick={() => setWeek(week + 1)}
      >
        <Arrow direction="right" />
      </div>
    </div>
  );
};

export default DatePicker;