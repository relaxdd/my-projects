import { DateTime } from "luxon";

export function enumerate({num, dec,}: {num: number; dec: string[];}): string {
  if (num > 100) num = num % 100;
  if (num <= 20 && num >= 10) return dec[2];
  if (num > 20) num = num % 10;

  return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
}

export const toFormatDate = (date: DateTime, format: string) => {
  return date.setLocale("ru").toFormat(format);
};

const formatPostDate: Function = (date: string): string | null => {
  const minuteEnum = ["минуту", "минуты", "минут"];
  const hourseEnum = ["час", "часа", "часов"];

  const fromISO = DateTime.fromISO(date);
  const now = DateTime.now();

  const day = Number(toFormatDate(fromISO, "d"));
  const today = Number(toFormatDate(now, "d"));

  const hour = now.diff(fromISO).as("hours");
  const minut = hour * 60;

  // Если прошло больше суток
  if (hour >= 24) {
    return toFormatDate(fromISO, "d MMM y в HH:mm");
  }
  // Если прошло от 12 часов до 1 суток
  else if (hour < 24 && hour >= 12) {
    const whenWasDay = day === today ? "Сегодня" : "Вчера";
    return `${whenWasDay} в ${toFormatDate(fromISO, "HH:mm")}`;
  }
  // Если прошло от 12 часов до суток
  else if (hour < 12 && hour >= 1) {
    const hours = Math.floor(hour);
    const minute = Math.floor((hour % 1) * 60);

    return `${hours} ${enumerate({
      num: hours,
      dec: hourseEnum,
    })} и ${minute} ${enumerate({ num: minute, dec: minuteEnum })} назад`;
  }
  // Если прошло от минуты до часа
  else if (hour < 1 && Math.floor(minut) >= 1) {
    const minute = Math.floor(minut);
    return `${minute} ${enumerate({ num: minute, dec: minuteEnum })} назад`;
  }
  // Если прошло меньше минуты
  else if (minut < 1) {
    return "Только что";
  }
  // Иначе
  else return null;
};

export default formatPostDate;
