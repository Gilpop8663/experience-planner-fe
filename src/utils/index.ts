export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const timeAgo = (date: string) => {
  const now = Number(new Date());
  const past = Number(new Date(date));
  const diffInSeconds = Math.floor((now - past) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 60 * 60;
  const secondsInDay = 60 * 60 * 24;
  const secondsInWeek = 60 * 60 * 24 * 7;
  const secondsInMonth = 60 * 60 * 24 * 30;
  const secondsInYear = 60 * 60 * 24 * 365;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}분 전`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}시간 전`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}일 전`;
  } else if (diffInSeconds < secondsInMonth) {
    const weeks = Math.floor(diffInSeconds / secondsInWeek);
    return `${weeks}주 전`;
  } else if (diffInSeconds < secondsInYear) {
    const months = Math.floor(diffInSeconds / secondsInMonth);
    return `${months}개월 전`;
  } else {
    const years = Math.floor(diffInSeconds / secondsInYear);
    return `${years}년 전`;
  }
};

/**
 *
 * @param dateString
 * @returns 2024년 9월 22일 일요일
 */
export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "없음";
  }
  const utcDate = new Date(dateString);

  const localDate = utcDate.toLocaleString("ko-KR", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = utcDate.getDay();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const [year, month, date] = localDate
    .split("오후")[0]
    .split(".")
    .map((item) => item.trim());

  return `${year}년 ${month}월 ${date}일 ${dayNames[day]}요일`;
};

/**
 * @param dateString
 * @returns 2024-09-04
 */
export const formatInputDate = (dateString?: string) => {
  if (!dateString) {
    return "없음";
  }

  const utcDate = new Date(dateString);

  // 로컬 시간으로 변환
  const localDateString = utcDate.toLocaleString("ko-KR", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 'YYYY-MM-DD' 형식으로 변환
  const [year, month, day] = localDateString
    .split(".")
    .map((item) => item.trim());

  return `${year}-${month}-${day}`;
};

export const getKoreanWeekday = (dateString: string | Date) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return ""; // 유효하지 않은 날짜일 경우 빈 문자열 반환
  }

  return date.toLocaleDateString("ko-KR", { weekday: "long" });
};

/**
 *
 * @param utcDate
 * @returns 2024-09-20T09:00
 */
export const convertToLocalTime = (utcDate: string | null) => {
  if (!utcDate) {
    return "";
  }

  const date = new Date(utcDate);

  // 클라이언트의 시간대 사용
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 로컬 시간으로 변환
  const localDateString = date.toLocaleString("ko-KR", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간 형식
  });

  // 날짜와 시간 분리
  const datePart = localDateString.split(". ");
  const timePart = datePart.pop();
  const [year, month, day] = datePart.map((item) => item.trim());

  // 'YYYY-MM-DDTHH:mm' 형식으로 변환
  return `${year}-${month}-${day}T${timePart?.trim()}`;
};

export const formatDateTime = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const utcDate = new Date(dateString); // UTC로 저장된 시간
  const localDateString = utcDate.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const datePart = localDateString.split(". ");
  const timePart = datePart.pop();
  const [year, month, date] = datePart.map((item) => item.trim());

  // 요일 구하기
  const day = utcDate.getDay();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  return `${year}년 ${month}월 ${date}일 ${dayNames[day]}요일  ${timePart?.trim()}`;
};
