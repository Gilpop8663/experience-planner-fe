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
      <div className="flex justify-center items-center h-[510px] my-20">
        <div className="w-[330px] h-[510px] rounded-sm shadow-lg py-11 px-7 flex flex-col justify-center items-center bg-gray-200">
          <span className="text-xl font-semibold text-gray-600">
            현재 체험단 일정이 없습니다.
          </span>
          <span className="text-base text-gray-500 mt-4">
            새로운 체험단 일정을 추가하여 카드 목록을 업데이트해보세요!
          </span>
        </div>
      </div>
    );
  }

  return <EmblaCarousel slides={data} options={OPTIONS} />;
}
