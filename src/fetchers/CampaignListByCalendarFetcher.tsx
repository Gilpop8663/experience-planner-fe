import "@/styles/calendar.css"; // 커스텀 스타일 적용

import { useGetCalendarCampaignList } from "@/hooks/query/campaign/useGetCalendarCampaignList";
import {
  Calendar,
  DateHeaderProps,
  dayjsLocalizer,
  Event,
  HeaderProps,
} from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useState } from "react";
import { Campaign } from "@/types/campaign";
import { holidayEvents } from "@/constants/holiday";

dayjs.locale("ko");
dayjs().format("YYYY-MM-DD ddd HH:mm:ss");

const localizer = dayjsLocalizer(dayjs);
const now = new Date();

type CampaignType = "deadline" | "reservation" | "holiday";

const formattedCampaign = (campaignList: Campaign[], kind: CampaignType) => {
  if (kind === "reservation") {
    return campaignList.map((item) => {
      const startDate = item.reservationDate
        ? new Date(item.reservationDate)
        : new Date();
      const endDate = new Date(startDate); // startDate를 복사해서 endDate 생성
      endDate.setHours(endDate.getHours() + 2); // endDate에 2시간 추가

      return {
        id: item.id,
        title: item.title,
        start: startDate,
        end: endDate,
        kind,
      };
    });
  }

  return campaignList.map((item) => {
    const startDate = new Date(item.reviewDeadline);
    startDate.setHours(22, 0, 0, 0); // 22시로 설정

    const endDate = new Date(item.reviewDeadline);
    endDate.setHours(23, 59, 0, 0); // 24시로 설정 (다음 날 0시)

    return {
      id: item.id,
      title: item.title,
      start: startDate,
      end: endDate,
      kind,
    };
  });
};

export default function CampaignListByCalendarFetcher() {
  const [date, setDate] = useState(now);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const { data } = useGetCalendarCampaignList({ year, month });

  const deadlineEvents = formattedCampaign(
    data.getCalendarCampaignList.data,
    "deadline",
  );

  const reservationEvents = formattedCampaign(
    data.getCalendarCampaignList.data.filter(
      (item) => item.reservationDate !== null,
    ),
    "reservation",
  );

  const myEvents = [...holidayEvents, ...deadlineEvents, ...reservationEvents];

  return (
    <div>
      <Calendar
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
        date={date}
        localizer={localizer}
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "65vh" }}
        views={["month", "week"]}
        defaultView="month"
        showAllEvents
        messages={{
          next: "다음",
          previous: "이전",
          today: "오늘",
          month: "월",
          week: "주",
          day: "일",
          agenda: "일정",
          noEventsInRange: "이 기간에는 일정이 없습니다.",
          date: "일정",
          time: "시간",
          event: "내용",
          tomorrow: "내일",
        }}
        culture="ko"
        formats={{
          monthHeaderFormat: "YYYY년 MM월 방문 일정",
          dayHeaderFormat: "YYYY년 MM월 DD일",
          dayRangeHeaderFormat: ({ start, end }) =>
            dayjs(start).locale("ko").format("YYYY-MM-DD") +
            " ~ " +
            dayjs(end).locale("ko").format("YYYY-MM-DD"),
        }}
        components={{
          month: {
            header: HeaderCellContent,
            dateHeader: DateCellContent,
          },
          event: EventContent,
        }}
        eventPropGetter={(event: { kind: CampaignType }) => {
          if (event.kind === "deadline") {
            return {
              className: "event_deadline",
            };
          }

          if (event.kind === "holiday") {
            return { className: "event_holiday" };
          }

          return { className: "event_reservation" };
        }}
      />
    </div>
  );
}

function HeaderCellContent({ date, label }: HeaderProps) {
  const dayOfWeek = date.getDay();

  const getClassName = (dayOfWeek: number) => {
    if (dayOfWeek === 0) {
      return "day_sunday";
    }

    if (dayOfWeek === 6) {
      return "day_saturday";
    }

    return "day_working";
  };
  const className = getClassName(dayOfWeek);

  return <span className={className}>{label}</span>;
}

function DateCellContent({ date, label }: DateHeaderProps) {
  const dayOfWeek = date.getDay();

  const getClassName = (dayOfWeek: number) => {
    if (dayOfWeek === 0) {
      return "day_sunday";
    }

    if (dayOfWeek === 6) {
      return "day_saturday";
    }

    return "day_working";
  };
  const className = getClassName(dayOfWeek);

  return <span className={className}>{label}</span>;
}

interface Props extends Event {
  event: {
    kind: CampaignType;
  };
}

function EventContent({ title, event }: Props) {
  const getSubtitle = () => {
    if (event.kind === "reservation") {
      return "[방문] ";
    }

    if (event.kind === "deadline") {
      return "[마감] ";
    }

    if (event.kind === "holiday") {
      return "";
    }
  };

  return <span>{`${getSubtitle()}${title}`}</span>;
}
