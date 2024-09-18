import {
  Calendar,
  DateHeaderProps,
  Event,
  HeaderProps,
} from "react-big-calendar";
import { CampaignType, useCalendar } from "@/hooks/pages/main/useCalendar";

export default function CampaignListByCalendarFetcher() {
  const {
    costData,
    date,
    month,
    year,
    handleNavigateDate,
    localizer,
    myEvents,
    handleDayRangeHeaderFormat,
  } = useCalendar();

  return (
    <div>
      <div className="py-2 text-sm">
        <div className="flex gap-2">
          <span>
            {year}년 {month}월 협찬 비용:
          </span>
          <span>
            {costData.getSponsorshipCostAndConsumption.sponsorshipCost.toLocaleString(
              "ko-KR",
            )}
            원
          </span>
        </div>
        <div className="flex gap-2 my-2">
          <span>
            {year}년 {month}월 소비한 비용:
          </span>
          <span>
            {costData.getSponsorshipCostAndConsumption.consumptionCost.toLocaleString(
              "ko-KR",
            )}
            원
          </span>
        </div>
      </div>
      <Calendar
        onNavigate={handleNavigateDate}
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
          dayRangeHeaderFormat: handleDayRangeHeaderFormat,
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
