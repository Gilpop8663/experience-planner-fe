import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGangnamRegister } from "@/hooks/pages/register/useGangnamRegister";

export default function ContentPasteTab() {
  const { handleSiteContentSubmit, loading, siteContent, error } =
    useGangnamRegister();

  return (
    <form onSubmit={handleSiteContentSubmit}>
      <div className="mt-4">
        <label
          htmlFor="siteContent"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          체험단 본문 내용
        </label>
        <Textarea
          id="siteContent"
          name="siteContent"
          value={siteContent.value}
          onChange={siteContent.onChange}
          rows={40}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="체험단 본문 내용을 여기에 붙여넣어 주세요."
          autoFocus
          autoComplete="off"
          required
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:cursor-not-allowed"
        >
          등록하기
        </Button>
      </div>
      <div className="mt-4 text-red-500">{error}</div>
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          본문 내용 등록하기 튜토리얼
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li className="text-gray-700">
            강남맛집 선정된 체험 페이지로 이동합니다.
          </li>
          <li className="text-gray-700">
            컨트롤 A로 전부 선택하고, 컨트롤 C로 복사합니다.
          </li>
          <li className="text-gray-700">
            체험단 플래너 사이트로 돌아와, 컨트롤 V로 붙여넣습니다.
          </li>
          <li className="text-gray-700">본문 내용을 등록합니다.</li>
          <li className="text-gray-700">
            본문 내용을 등록하면 약간의 시간이 걸릴 수 있습니다.
          </li>
        </ol>
      </div>
    </form>
  );
}
