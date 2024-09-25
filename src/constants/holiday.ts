import dayjs from "dayjs";
import KoreanLunarCalendar from "korean-lunar-calendar";

const getHolidays = (year: number) => {
  return [
    { date: dayjs(`${year}-01-01`).format("YYYY-MM-DD"), name: "신정" },
    { date: dayjs(`${year}-03-01`).format("YYYY-MM-DD"), name: "삼일절" },
    { date: dayjs(`${year}-05-05`).format("YYYY-MM-DD"), name: "어린이날" },
    { date: dayjs(`${year}-06-06`).format("YYYY-MM-DD"), name: "현충일" },
    { date: dayjs(`${year}-08-15`).format("YYYY-MM-DD"), name: "광복절" },
    { date: dayjs(`${year}-10-03`).format("YYYY-MM-DD"), name: "개천절" },
    { date: dayjs(`${year}-10-09`).format("YYYY-MM-DD"), name: "한글날" },
    { date: dayjs(`${year}-12-25`).format("YYYY-MM-DD"), name: "성탄절" },
  ];
};

export const HOLIDAYS = [
  ...getHolidays(2024),
  ...getHolidays(2025),
  ...getHolidays(2026),
];

const LUNAR_HOLIDAYS: {
  year: number;
  month: number;
  day: number;
  name: string;
}[] = [];

[2024, 2025, 2026].forEach((year) => {
  [
    { month: 1, day: 1, name: "설날" },
    { month: 1, day: 2, name: "설 연휴" },
    { month: 4, day: 8, name: "부처님 오신 날" },
    { month: 8, day: 15, name: "추석" },
    { month: 8, day: 16, name: "추석 연휴" },
    { month: 8, day: 14, name: "추석 전날" },
  ].forEach((item) => {
    LUNAR_HOLIDAYS.push({
      year,
      ...item,
    });
  });
});

interface Holiday {
  date: string;
  name: string;
}

interface Result {
  id: string;
  title: string;
  start: Date;
  end: Date;
  kind: "holiday";
  resource: string;
}

/**
 *
 * 윤달이 있는 지 계산
 * @param year
 * @returns true면 윤년, false라면 윤년이 아님
 */
const getLeap = (year: number) => {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return true;
  }

  return false;
};

// params : year(년), month(월), day(일), intercalation(윤달여부)
const calendar = new KoreanLunarCalendar();
export const lunarHolidays = LUNAR_HOLIDAYS.map((item) => {
  const isLeap = getLeap(item.year);
  calendar.setLunarDate(item.year, item.month, item.day, isLeap);
  const { day, month, year } = calendar.getSolarCalendar();

  const stringDate = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");

  return { name: item.name, date: stringDate };
});

const formattedHoliday = (holidayList: Holiday[]): Result[] => {
  return holidayList.map((item, index) => {
    const startDate = new Date(item.date);
    startDate.setHours(22, 0, 0, 0); // 22시로 설정

    const endDate = new Date(item.date);
    endDate.setHours(23, 59, 0, 0); // 24시로 설정 (다음 날 0시)

    return {
      id: `h-${index}`,
      title: item.name,
      start: startDate,
      end: endDate,
      kind: "holiday",
      resource: `h-${index}`,
    };
  });
};

export const holidayEvents = [
  ...formattedHoliday(HOLIDAYS),
  ...formattedHoliday(lunarHolidays),
];
