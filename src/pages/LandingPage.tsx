import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.webp";
import step1Image from "@/assets/step1.webp";
import step2Image from "@/assets/step2.webp";
import step3Image from "@/assets/step3.webp";
import step4Image from "@/assets/step4.webp";
import step5Image from "@/assets/step5.webp";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

const testimonials = [
  {
    name: "김영수",
    review:
      "체험단 일정 관리가 정말 간편해졌어요! 디데이 순 정렬 기능이 특히 유용해요.",
  },
  {
    name: "이민지",
    review:
      "무료인데도 다양한 기능을 제공해서, 알차게 체험단을 예약하고 있어요.",
  },
  {
    name: "박준형",
    review:
      "무료로 시작했는데, 다양한 기능 덕분에 시간 관리가 확실히 쉬워졌어요.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center pt-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl w-full">
        <div className="flex flex-col space-y-4 lg:w-1/2 w-full">
          <h1 className="text-5xl font-bold whitespace-pre-line">
            {`체험단 일정 관리, 
            더욱 효율적으로.`}
          </h1>
          <p className="text-gray-600 text-lg">
            다양한 체험단 일정을 한 곳에서 무료로 관리하고, 소중한 시간을
            절약하세요.
          </p>
          <div className="flex flex-col space-y-2">
            <Link to={ROUTES.SIGN_UP}>
              <Button className="w-full lg:w-1/2">무료로 시작하기</Button>
            </Link>
            <p className="text-sm text-gray-500 italic">
              누구나 무료로 사용할 수 있습니다. 지금 바로 시작해보세요!
            </p>
          </div>
          <div className="mt-4 text-gray-500">
            <span>이미 회원이신가요? </span>
            <a className="text-blue-600 hover:underline" href="/login">
              로그인
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
          <img
            src={heroImage}
            alt="체험 일정 관리 서비스 일러스트레이션"
            className="rounded-lg object-cover h-full w-full"
            width={500}
            height={800}
          />
        </div>
      </div>

      {/* Explainer Section */}
      <div className="w-full max-w-6xl mt-16 p-8 border-4 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">이용 방법</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              1
            </div>
            <h3 className="text-2xl font-semibold">체험 일정 확인</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            원하는 체험단 일정을 쉽게 확인하고, 남은 D-Day를 한눈에 확인하세요.
          </p>
          <img
            src={step1Image}
            alt="체험 일정 카드 예시"
            className="rounded-lg object-cover mx-auto border-2 w-full h-full"
          />
          <img
            src={step2Image}
            alt="체험 일정 달력 예시"
            className="rounded-lg object-cover mx-auto border-2 w-full h-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              2
            </div>
            <h3 className="text-2xl font-semibold">간편한 일정 예약</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            선택한 체험단 일정을 클릭만으로 간편하게 예약하세요.
          </p>
          <div className="flex">
            <img
              src={step3Image}
              alt="체험 URL 등록 예약 과정"
              className="rounded-lg object-cover mx-auto w-2/5 border-2 h-full"
            />
            <img
              src={step4Image}
              alt="체험 직접 예약 과정"
              className="rounded-lg object-cover mx-auto w-2/5 border-2 h-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              3
            </div>
            <h3 className="text-2xl font-semibold">체험하고 리뷰 관리</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            체험 후 리뷰를 작성하고, 체계적인 일정 관리를 무료로 누리세요.
          </p>
          <img
            src={step5Image}
            alt="리뷰 작성 및 관리 예시"
            className="rounded-lg object-cover mx-auto border-2 w-full h-full"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mt-16 p-8 bg-white rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">체험 일정 통합 관리</h3>
            <p className="text-sm text-gray-600 mt-4">
              모든 체험단 일정을 한 곳에서 관리하고, 남은 D-Day를 쉽게 확인할 수
              있어요.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">간편한 일정 예약</h3>
            <p className="text-sm text-gray-600 mt-4">
              몇 번의 클릭으로 원하는 체험단 일정을 빠르게 예약할 수 있어요.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">체험단 비용 계산</h3>
            <p className="text-sm text-gray-600 mt-4">
              체험단에서 제공받은 비용과 추가 비용을 월별로 쉽게 계산할 수
              있어요.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">마감기한 관리</h3>
            <p className="text-sm text-gray-600 mt-4">
              등록된 일정을 남은 D-Day 순으로 관리하여 마감 기한을 쉽게 확인할
              수 있어요.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">달력</h3>
            <p className="text-sm text-gray-600 mt-4">
              달력에서 중요한 일정의 마감 기한과 방문 날짜를 확인해보세요.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">여러 사이트의 체험단 관리</h3>
            <p className="text-sm text-gray-600 mt-4">
              여러 플랫폼의 체험단 사이트를 한 곳에서 손쉽게 관리하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl mt-16 mb-16 p-8 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">사용자 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <p className="text-sm text-gray-600">"{testimonial.review}"</p>
              <p className="text-sm font-semibold text-blue-600">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
