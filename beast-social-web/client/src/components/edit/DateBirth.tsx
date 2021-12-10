import { FC, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import useSelect from "../../hooks/useSelect";
import { months } from "./dateBirthUtils";
import { DateTime } from "luxon";
import { fillArrayFromTo } from "./dateBirthUtils";
// locutus
import strtotime from "locutus/php/datetime/strtotime";
import date from "locutus/php/datetime/date";

interface DateBirthProps {
  value: string | null;
  changeDateBirth: (value: string) => void;
}

const DateBirth: FC<DateBirthProps> = ({ value, changeDateBirth }) => {
  const yearNow = Number(DateTime.now().toFormat("y")) - 14;
  const parseDate = value?.split("-");

  const [dayBirth] = useSelect(parseDate ? parseDate[0] : "01");
  const [monthBirth] = useSelect(parseDate ? parseDate[1] : "01");
  const [yearBirth] = useSelect(parseDate ? parseDate[2] : `${yearNow}`);

  const qtyDaysInMonth = useMemo(() => {
    const selectedDate = `${yearBirth.value}-${monthBirth.value}`;
    return date("t", strtotime(date(selectedDate)));
  }, [yearBirth.value, monthBirth.value]);

  const qtyDaysInMonthArrPre = fillArrayFromTo(1, qtyDaysInMonth);
  const yearArr = fillArrayFromTo(yearNow - 60, yearNow);

  const qtyDaysInMonthArr = qtyDaysInMonthArrPre.map((day) => {
    return `${day}`.length < 2 ? `0${day}` : day;
  });

  useEffect(() => {
    changeDateBirth(`${dayBirth.value}-${monthBirth.value}-${yearBirth.value}`);
    // eslint-disable-next-line
  }, [dayBirth.value, monthBirth.value, yearBirth.value]);

  return (
    <div className="mb-3">
      <label className="form-label weight-regular">День рождения</label>
      <Row>
        <Col xs="2">
          <select id="day-birth" className="form-select" {...dayBirth}>
            {qtyDaysInMonthArr.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </Col>
        <Col xs="6">
          <select id="month-birth" className="form-select" {...monthBirth}>
            {months.map((month) => (
              <option value={month.key} key={month.key}>
                {month.text}
              </option>
            ))}
          </select>
        </Col>
        <Col xs="4">
          <select id="year-birth" className="form-select" {...yearBirth}>
            {yearArr.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </Col>
      </Row>
    </div>
  );
};

export default DateBirth;
