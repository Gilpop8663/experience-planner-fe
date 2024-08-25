import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Link,
  Calendar as CalendarIcon,
} from "lucide-react";

// 가상의 캠페인 데이터
const campaigns = [
  {
    id: 1,
    title: "서울 맛집 체험",
    endDate: "2024-09-01",
    location: "서울",
    siteUrl: "https://example.com/1",
    status: "active",
  },
  {
    id: 2,
    title: "부산 해변 호텔 체험",
    endDate: "2024-08-15",
    location: "부산",
    siteUrl: "https://example.com/2",
    status: "active",
  },
  {
    id: 3,
    title: "제주 올레길 트래킹",
    endDate: "2024-07-30",
    location: "제주",
    siteUrl: "https://example.com/3",
    status: "ended",
  },
  // 더 많은 캠페인 데이터...
];

const MainPage2: React.FC = () => {
  const [viewMode, setViewMode] = useState<"calendar" | "card">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cardIndex, setCardIndex] = useState(0);

  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "active",
  );
  const endedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "ended",
  );

  const nextCard = () => {
    setCardIndex((prevIndex) => (prevIndex + 1) % activeCampaigns.length);
  };

  const prevCard = () => {
    setCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + activeCampaigns.length) % activeCampaigns.length,
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">달력형 보기</TabsTrigger>
          <TabsTrigger value="card">카드형 보기</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>캠페인 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                className="rounded-md border"
              />
              {/* 여기에 선택된 날짜의 캠페인 목록을 표시할 수 있습니다 */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="card">
          <Card>
            <CardHeader>
              <CardTitle>진행 중인 캠페인</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Button onClick={prevCard}>
                  <ChevronLeft />
                </Button>
                <div className="flex-1 px-4">
                  {activeCampaigns[cardIndex] && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {activeCampaigns[cardIndex].title}
                      </h3>
                      <p className="flex items-center justify-center mt-2">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        마감일: {activeCampaigns[cardIndex].endDate}
                      </p>
                      <p className="flex items-center justify-center mt-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        {activeCampaigns[cardIndex].location}
                      </p>
                      <Button variant="link" className="mt-2">
                        <Link className="mr-2 h-4 w-4" />
                        사이트 바로가기
                      </Button>
                      <Button className="mt-2 w-full">일정 예약</Button>
                    </div>
                  )}
                </div>
                <Button onClick={nextCard}>
                  <ChevronRight />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>종료된 캠페인</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {endedCampaigns.map((campaign) => (
                  <li
                    key={campaign.id}
                    className="flex justify-between items-center"
                  >
                    <span>{campaign.title}</span>
                    <span className="text-sm text-gray-500">
                      {campaign.endDate}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainPage2;
