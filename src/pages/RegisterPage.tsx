import TabContent from "@/components/Tabs/TabContent";
import Tabs from "@/components/Tabs/Tabs";
import { useCreateCampaignDirectly } from "@/hooks/mutation/campaign/useCreateCampaignDirectly";
import { useCreateCampaignFromLink } from "@/hooks/mutation/campaign/useCreateCampaignFromLink";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { useState } from "react";

export default function RegisterPage() {
  const { user } = useMyProfile();

  const [formData, setFormData] = useState({
    title: "",
    siteName: "",
    reviewPeriod: "",
    sponsorshipFee: "",
    bookingLink: "",
    productDetails: "",
    location: "",
    detailsLink: "",
    siteUrl: "",
  });

  const [activeTab, setActiveTab] = useState(0);

  const { handleCreateCampaignFromLink } = useCreateCampaignFromLink();
  const { handleCreateCampaignDirectly } = useCreateCampaignDirectly();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSiteUrlSubmit = (e) => {
    e.preventDefault();

    handleCreateCampaignFromLink({
      detailedViewLink: formData.siteUrl,
      userId: user.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log(formData);

    // handleCreateCampaignDirectly({});
  };

  const tabs = ["링크로 추가", "직접 입력"];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-12">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          체험 등록
        </h2>

        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <TabContent activeTab={activeTab} index={0}>
          <form onSubmit={handleSiteUrlSubmit}>
            <div className="mt-4">
              <label
                htmlFor="siteUrl"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                체험단 링크
              </label>
              <input
                type="siteUrl"
                id="siteUrl"
                name="siteUrl"
                value={formData.siteUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.example.com/experience"
                required
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                등록하기
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                링크로 등록하기 튜토리얼
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                <li className="text-gray-700">
                  선정된 체험단 링크로 이동해주세요.
                </li>
                <li className="text-gray-700">
                  선정된 체험단 링크를 복사 붙여넣기를 해줍니다.
                </li>
                <li className="text-gray-700">
                  현재는 강남맛집, 미블, 레뷰, 리뷰노트만 가능합니다.
                  <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md">
                    <code className="block text-blue-600">
                      다른 체험단이나 기능을 원하신다면 디스코드나 블로그에
                      댓글로 달아주세요!
                    </code>
                  </div>
                </li>
              </ol>
            </div>
          </form>
        </TabContent>
        <TabContent activeTab={activeTab} index={1}>
          <form onSubmit={handleSubmit}>
            {/* 기본 정보 */}
            <div className="mt-4">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="체험 제목을 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="siteName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                사이트명
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="사이트명을 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="reviewPeriod"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                리뷰 등록 기간
              </label>
              <input
                type="date"
                id="reviewPeriod"
                name="reviewPeriod"
                value={formData.reviewPeriod}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* 추가 정보 */}
            <div className="mb-4">
              <label
                htmlFor="sponsorshipFee"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                협찬비
              </label>
              <input
                type="number"
                id="sponsorshipFee"
                name="sponsorshipFee"
                value={formData.sponsorshipFee}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="협찬비를 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="bookingLink"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                예약 링크
              </label>
              <input
                type="url"
                id="bookingLink"
                name="bookingLink"
                value={formData.bookingLink}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예약 링크를 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productDetails"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                상품 제공 내역
              </label>
              <textarea
                id="productDetails"
                name="productDetails"
                value={formData.productDetails}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="상품 제공 내역을 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                위치
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="위치를 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="detailsLink"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                자세히 보기 링크
              </label>
              <input
                type="url"
                id="detailsLink"
                name="detailsLink"
                value={formData.detailsLink}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="자세히 보기 링크를 입력하세요"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
              >
                등록하기
              </button>
            </div>
          </form>
        </TabContent>
      </div>
    </div>
  );
}
