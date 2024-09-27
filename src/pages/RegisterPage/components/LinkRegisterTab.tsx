import { Button } from "@/components/ui/button";
import { useLinkRegister } from "@/hooks/pages/register/useLinkRegister";

export default function LinkRegisterTab() {
  const { siteUrl, error, handleSiteUrlSubmit, loading } = useLinkRegister();

  return (
    <form onSubmit={handleSiteUrlSubmit}>
      <div className="mt-4">
        <label
          htmlFor="siteUrl"
          className="block mb-2 text-xs sm:text-sm md:text-basefont-medium text-gray-700"
        >
          체험단 링크
        </label>
        <input
          type="siteUrl"
          id="siteUrl"
          name="siteUrl"
          value={siteUrl.value}
          onChange={siteUrl.onChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://www.example.com/experience"
          autoFocus
          autoComplete="off"
          required
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          type="submit"
          disabled={loading}
          className="text-xs sm:text-sm md:text-base w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:cursor-not-allowed"
        >
          등록하기
        </Button>
      </div>
      <div className="mt-4 text-red-500">{error}</div>
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-4">
          링크로 등록하기 튜토리얼
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li className="text-gray-700">선정된 체험단 링크로 이동해주세요.</li>
          <li className="text-gray-700">
            선정된 체험단 링크를 복사 붙여넣기를 해줍니다.
          </li>
          <li className="text-gray-700">
            현재는 미블, 레뷰, 리뷰노트만 가능합니다.
          </li>
          <li className="text-gray-700">
            체험단 링크로 등록 시 약간의 시간이 걸릴 수 있습니다.
          </li>
          <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md">
            <span className="block text-blue-600">
              다른 체험단이나 기능이 필요하시면 디스코드나 블로그에 댓글을
              남겨주세요!
            </span>
            <div className="flex justify-around my-2 flex-col md:flex-row">
              <a
                href="https://blog.naver.com/investment-story/223588068176"
                target="_blank"
                className="mt-2 inline-block p-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition"
              >
                블로그 방문하기
              </a>
              <a
                href="https://discord.gg/mdUhEKBku3"
                target="_blank"
                className="mt-2 inline-block p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
              >
                디스코드 방문하기
              </a>
            </div>
          </div>
        </ol>
      </div>
    </form>
  );
}
