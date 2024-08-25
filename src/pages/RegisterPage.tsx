import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    title: "",
    siteName: "",
    reviewPeriod: "",
    sponsorshipFee: "",
    bookingLink: "",
    productDetails: "",
    location: "",
    detailsLink: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Form submission logic
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          체험 등록
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
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
          {/* Site Name */}
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
          {/* Review Period */}
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
          {/* Sponsorship Fee */}
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
          {/* Booking Link */}
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
          {/* Product Details */}
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
          {/* Location */}
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
          {/* Details Link */}
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
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
