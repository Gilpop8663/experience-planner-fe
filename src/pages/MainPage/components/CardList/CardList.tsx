import { Campaign } from "@/types/campaign";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

interface Props {
  data: Campaign[];
}

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };

export default function CardList({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[360px]  sm:h-[420px] md:h-[460px] lg:h-[510px] my-20">
        <div className="w-[240px] h-[360px] sm:w-[280px] sm:h-[420px]  md:w-[300px] md:h-[460px] lg:w-[330px] lg:h-[510px] rounded-sm shadow-lg py-5 px-4 sm:py-6 md:py-8 md:px-6 lg:py-11 lg:px-7 flex flex-col justify-center items-center bg-gray-200">
          <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-600">
            현재 체험단 일정이 없습니다.
          </span>
          <span className="text-xs md:text-sm lg:text-base text-gray-500 mt-4">
            새로운 체험단 일정을 추가하여 카드 목록을 업데이트해보세요!
          </span>
        </div>
      </div>
    );
  }

  return <EmblaCarousel slides={data} options={OPTIONS} />;
}
