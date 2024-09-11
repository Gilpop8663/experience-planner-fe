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

export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "없음";
  }

  return dateString.split("T")[0];
};

export const formatDateTime = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  const formattedDate = date
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace("AM", "오전") // 오전
    .replace("PM", "오후"); // 오후

  const formattedArray = formattedDate.split(".").map((item) => item.trim());
  const last = formattedArray.pop();

  const result = formattedArray.join("-") + " " + last;

  return result;
};

export const convertToKST = (utcDate: string | null) => {
  if (!utcDate) {
    return "";
  }

  const date = new Date(utcDate);
  // KST (UTC+9)로 변환
  date.setHours(date.getHours() + 9);
  return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm' 형식으로 반환
};
