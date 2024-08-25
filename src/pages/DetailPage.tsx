import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";

const ExperienceDetailPage = () => {
  const [isBooked, setIsBooked] = useState(false);

  // 예시 데이터
  const experience = {
    id: 1,
    title: "강남 레스토랑 체험",
    site: "강남맛집",
    period: "2024-08-15 ~ 2024-08-30",
    sponsorFee: "50,000원",
    bookingLink: "https://example.com/booking1",
    product: "식사 2인 제공",
    location: "서울 강남구 테헤란로 123",
    detailLink: "https://example.com/detail1",
  };

  const nearbyExperiences = [
    { id: 2, title: "신사동 카페 체험", location: "서울 강남구 신사동 456" },
    {
      id: 3,
      title: "청담동 디저트 맛보기",
      location: "서울 강남구 청담동 789",
    },
    { id: 4, title: "삼성동 와인 시음회", location: "서울 강남구 삼성동 101" },
  ];

  const handleBooking = () => {
    // 실제로는 여기서 예약 API를 호출할 것입니다.
    setIsBooked(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <h1 className="text-3xl font-bold mb-6">{experience.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <p className="flex items-center">
            <MapPin className="mr-2" size={20} />
            {experience.location}
          </p>
          <p className="flex items-center">
            <Calendar className="mr-2" size={20} />
            {experience.period}
          </p>
          <p className="flex items-center">
            <DollarSign className="mr-2" size={20} />
            협찬비: {experience.sponsorFee}
          </p>
          <p className="flex items-center">
            <Package className="mr-2" size={20} />
            제공: {experience.product}
          </p>
        </div>
        <div className="space-y-4">
          <p className="font-semibold">사이트: {experience.site}</p>
          <a
            href={experience.detailLink}
            className="text-blue-500 hover:underline flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon className="mr-2" size={20} />
            자세히 보기
          </a>
          {!isBooked ? (
            <button
              onClick={handleBooking}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              예약하기
            </button>
          ) : (
            <p className="text-green-500 font-semibold">예약 완료</p>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">근처의 다른 체험</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyExperiences.map((exp) => (
            <div key={exp.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
