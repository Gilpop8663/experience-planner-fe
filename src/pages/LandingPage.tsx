import { Button } from "@/components/ui/button";

// 이미지 import (실제 프로젝트에 맞는 이미지로 교체 필요)
import heroImage from "@/assets/hero.jpg";
import step1Image from "@/assets/step1.jpg";
import step2Image from "@/assets/step2.jpg";
import step3Image from "@/assets/step3.jpg";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

// 후기 데이터
const testimonials = [
  {
    name: "김영수",
    review:
      "체험단 일정 관리가 정말 간편해졌어요! 특히 디데이 순 정렬 기능이 매우 유용합니다.",
  },
  {
    name: "이민지",
    review:
      "프리미엄 요금제를 사용 중인데, 위치 기반 추천 기능 덕분에 알차게 체험단 일정을 예약하고 있어요.",
  },
  {
    name: "박준형",
    review:
      "무료 체험 후 바로 프로 요금제로 업그레이드 했습니다. 팀 기능 덕분에 같이 일하는 사람들이랑 효율적으로 일정 관리가 가능해요.",
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
            더 효율적으로.`}
          </h1>
          <p className="text-gray-600 text-lg">
            다양한 체험단 일정을 한 곳에서 확인하고, 간편하게 예약하고 관리하여
            소중한 시간을 더욱 알차게 활용하세요.
          </p>
          <div className="flex flex-col space-y-2">
            <Link to={ROUTES.SIGN_UP}>
              <Button className="w-full lg:w-1/2">회원가입 하기</Button>
            </Link>
            <p className="text-sm text-gray-500 italic">
              전국의 다양한 체험단이 이미 함께하고 있습니다.
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
            className="rounded-lg object-cover"
            width={500}
            height={300}
          />
        </div>
      </div>

      {/* Explainer Section */}
      <div className="w-full max-w-6xl mt-16 p-8 bg-gray-100 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">이용 방법</h2>

        {/* Step 1: 체험 일정 확인 */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              1
            </div>
            <h3 className="text-2xl font-semibold">체험 일정 확인</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            원하는 체험단 일정을 쉽게 확인하고, 남은 D-Day를 한눈에 파악하세요.
          </p>
          <img
            src={step1Image}
            alt="체험 일정 확인 예시"
            className="rounded-lg object-cover mx-auto"
            width={800}
          />
        </div>

        {/* Step 2: 간편한 일정 예약 */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              2
            </div>
            <h3 className="text-2xl font-semibold">간편한 일정 예약</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            선택한 체험단 일정을 몇 번의 클릭만으로 손쉽게 예약하세요.
          </p>
          <img
            src={step2Image}
            alt="체험 일정 예약 과정"
            className="rounded-lg object-cover mx-auto"
            width={400}
            height={300}
          />
        </div>

        {/* Step 3: 체험하고 리뷰 관리 */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-3xl font-bold text-blue-600 bg-white border-2 border-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
              3
            </div>
            <h3 className="text-2xl font-semibold">체험 및 리뷰 관리</h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            체험 후 리뷰를 작성하고, 일정과 리뷰를 체계적으로 관리하세요.
          </p>
          <img
            src={step3Image}
            alt="리뷰 작성 및 관리 예시"
            className="rounded-lg object-cover mx-auto"
            width={400}
            height={300}
          />
        </div>
      </div>

      {/* Featured Experiences Section
      <div className="w-full max-w-6xl mt-16 mb-16 p-8 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">추천 체험 일정</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map((experience, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <h3 className="text-xl font-semibold">{experience.title}</h3>
              <p className="text-sm text-gray-600">{experience.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-bold">
                  {experience.price}
                </span>
                <a href={`/experience/${experience.id}`}>
                  <Button variant="outline">자세히 보기</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Pricing Section
      <div className="w-full max-w-6xl mt-16 p-8 bg-gray-100 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">구독 요금제</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">기본 요금제 (Basic Plan)</h3>
            <p className="text-3xl font-bold text-blue-600">무료</p>
            <ul className="text-sm text-gray-600 space-y-2 mt-4">
              <li>최대 10개의 체험단 일정 관리</li>
              <li>달력 기반 일정 관리</li>
              <li>체험단 카드 목록 확인 (디데이 순)</li>
              <li>체험단 일정 예약 알림</li>
              <li>제한된 이메일 지원</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">
              프리미엄 요금제 (Premium Plan)
            </h3>
            <p className="text-3xl font-bold text-blue-600">2,900원/월</p>
            <ul className="text-sm text-gray-600 space-y-2 mt-4">
              <li>최대 50개의 체험단 일정 관리</li>
              <li>달력 기반 일정 관리 및 고급 필터 기능</li>
              <li>체험단 카드 목록 확인 (디데이 순, 사용자 정의 정렬)</li>
              <li>체험단 일정 예약 알림 및 리마인더</li>
              <li>위치 기반 추천 체험단 기능</li>
              <li>전용 이메일 및 채팅 지원</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">프로 요금제 (Pro Plan)</h3>
            <p className="text-3xl font-bold text-blue-600">4,900원/월</p>
            <ul className="text-sm text-gray-600 space-y-2 mt-4">
              <li>무제한 체험단 일정 관리</li>
              <li>팀 계정 지원 (최대 5명)</li>
              <li>달력 기반 일정 관리 및 고급 필터 및 공유 기능</li>
              <li>체험단 카드 목록 확인 (디데이 순, 사용자 정의 정렬)</li>
              <li>체험단 일정 예약 알림, 리마인더, 및 카카오톡 알림 연동</li>
              <li>위치 기반 추천 체험단 기능</li>
              <li>전용 이메일, 채팅, 전화 지원</li>
              <li>협찬 상품 비용 및 광고 협찬 비용 추적 기능</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl mt-16 mb-16 p-8 rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-center mb-8">이용자 후기</h2>
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
