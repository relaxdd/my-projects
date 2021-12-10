interface monthsType {
  key: string;
  text: string;
}

export const months: monthsType[] = [
  {
    key: "01",
    text: "Января",
  },
  {
    key: "02",
    text: "Февраля",
  },
  {
    key: "03",
    text: "Марта",
  },
  {
    key: "04",
    text: "Апреля",
  },
  {
    key: "05",
    text: "Мая",
  },
  {
    key: "06",
    text: "Июня",
  },
  {
    key: "07",
    text: "Июля",
  },
  {
    key: "08",
    text: "Августа",
  },
  {
    key: "09",
    text: "Сентября",
  },
  {
    key: "10",
    text: "Октября",
  },
  {
    key: "11",
    text: "Ноября",
  },
  {
    key: "12",
    text: "Декабря",
  },
];

export function fillArrayFromTo(
  from: number = 0,
  to: number,
  step: number = 1
): number[] {
  return Array.from(
    { length: (to - from) / step + 1 },
    (_, i) => from + i * step
  );
}

/* 
Array.from(
  { length: qtyDaysInMonth },
  (_, i) => i + 1
);
  */
