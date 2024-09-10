import { Campaign } from "@/types/campaign";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

interface Props {
  data: Campaign[];
}

const OPTIONS: EmblaOptionsType = { slidesToScroll: "auto" };

export default function CardList({ data }: Props) {
  return <EmblaCarousel slides={data} options={OPTIONS} />;
}
