import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 적용
import "../../styles/calendar.css"; // 커스텀 스타일 적용
import Layout from "@/components/Layout";

export default function MainPage() {
  const [viewMode, setViewMode] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "체험단 1",
      date: new Date(2024, 7, 20),
      dDay: 5,
      detailsLink: "#",
      bookingLink: "#",
    },
    {
      id: 2,
      title: "체험단 2",
      date: new Date(2024, 7, 25),
      dDay: 10,
      detailsLink: "#",
      bookingLink: "#",
    },
    {
      id: 3,
      title: "체험단 3",
      date: new Date(2024, 7, 20),
      dDay: 3,
      detailsLink: "#",
      bookingLink: "#",
    },
  ]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleLinkRegistration = () => {
    console.log("링크로 체험단 등록");
  };

  const handleDirectRegistration = () => {
    console.log("직접 체험단 등록");
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const dailyExperiences = experiences.filter(
        (exp) => exp.date.toDateString() === date.toDateString(),
      );

      return dailyExperiences.length > 0 ? (
        <div className="mt-1 text-xs">
          {dailyExperiences.map((exp) => (
            <div key={exp.id} className="bg-blue-200 p-1 mb-1 rounded-lg">
              {exp.title}
            </div>
          ))}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">체험단 관리</h1>
            <div className="space-x-4">
              <button
                onClick={handleLinkRegistration}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                링크로 체험단 등록
              </button>
              <button
                onClick={handleDirectRegistration}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                직접 체험단 등록
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => handleViewChange("calendar")}
              className={`px-4 py-2 font-semibold rounded-lg ${viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500`}
            >
              달력형 보기
            </button>
            <button
              onClick={() => handleViewChange("cards")}
              className={`px-4 py-2 ml-4 font-semibold rounded-lg ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500`}
            >
              카드형 보기
            </button>
          </div>

          {viewMode === "calendar" ? (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileContent={renderTileContent}
                className="mx-auto"
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experiences
                .sort((a, b) => a.dDay - b.dDay)
                .map((experience) => (
                  <div
                    key={experience.id}
                    className="p-4 bg-white rounded-lg shadow-md"
                  >
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {experience.title}
                    </h3>
                    <p className="mb-4 text-gray-600">
                      D-Day: {experience.dDay}일 남음
                    </p>
                    <div className="flex justify-between">
                      <a
                        href={experience.detailsLink}
                        className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500"
                      >
                        자세히 보기
                      </a>
                      <a
                        href={experience.bookingLink}
                        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
                      >
                        예약하기
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
