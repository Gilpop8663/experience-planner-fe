import { DotButton } from "../EmblaCarousel/EmblaCarouselDotButton";
import {
  NextButton,
  PrevButton,
} from "../EmblaCarousel/EmblaCarouselArrowButtons";
import CardLoading from "./CardLoading";

const numbers = [0, 1, 2];

const slides = Array.from({ length: 5 }, (__, index) => index);
const scrollSnaps = Array.from({ length: 5 }, (__, index) => index);

export default function CardListLoading() {
  return (
    <section className="embla">
      <div className="embla__viewport">
        <div className="embla__container  items-end gap-4 justify-start ">
          {slides.map((item, index) => (
            <div key={item} className="">
              <div className="mb-5">
                {numbers.includes(index) && (
                  <span className="text-5xl text-black">{index + 1}</span>
                )}
              </div>
              <CardLoading />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton />
          <NextButton />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              className={"embla__dot".concat(
                index === 0 ? " embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
