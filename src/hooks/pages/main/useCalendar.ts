import { holidayEvents } from "@/constants/holiday";
import { useGetCalendarCampaignList } from "@/hooks/query/campaign/useGetCalendarCampaignList";
import { useGetSponsorshipCostAndConsumption } from "@/hooks/query/campaign/useGetSponsorshipCostAndConsumption";
import { Campaign } from "@/types/campaign";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useState } from "react";
import { dayjsLocalizer } from "react-big-calendar";

dayjs.locale("ko");
dayjs().format("YYYY-MM-DD ddd HH:mm:ss");

const localizer = dayjsLocalizer(dayjs);
const now = new Date();

export type CampaignType = "deadline" | "reservation" | "holiday";

interface Result {
  id: number;
  title: string;
  start: Date;
  end: Date;
  kind: CampaignType;
  resource: number;
}

const formattedCampaign = (
  campaignList: Campaign[],
  kind: CampaignType,
): Result[] => {
  if (kind === "reservation") {
    return campaignList.map((item) => {
      const startDate = item.reservationDate
        ? new Date(item.reservationDate)
        : new Date();
      const endDate = new Date(startDate); // startDate를 복사해서 endDate 생성
      endDate.setHours(endDate.getHours() + 2); // endDate에 2시간 추가

      return {
        resource: item.id,
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
      resource: item.id,
      id: item.id,
      title: item.title,
      start: startDate,
      end: endDate,
      kind,
    };
  });
};

export const useCalendar = () => {
  const [date, setDate] = useState(now);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const { data } = useGetCalendarCampaignList({ year, month });
  const { data: costData } = useGetSponsorshipCostAndConsumption({
    year,
    month,
  });

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

  const handleNavigateDate = (date: Date) => {
    setDate(new Date(date));
  };

  const handleDayRangeHeaderFormat = ({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }) => {
    return (
      dayjs(start).locale("ko").format("YYYY-MM-DD") +
      " ~ " +
      dayjs(end).locale("ko").format("YYYY-MM-DD")
    );
  };

  return {
    date,
    costData,
    year,
    month,
    handleNavigateDate,
    localizer,
    myEvents,
    handleDayRangeHeaderFormat,
  };
};
