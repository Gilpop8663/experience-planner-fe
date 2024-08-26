import { useRef, useState } from "react";
import Card from "./Card/Card";
import Slider, { Settings } from "react-slick";

interface Props {
  data: [
    {
      title: string;
      reservationDate: string;
      serviceDetails: string;
      location: string;
      detailedViewLink: string;
      reviewDeadline: string;
    },
  ];
}

const numbers = [0, 1, 2];

export default function CardList({ data }: Props) {
  const sliderRef = useRef<Slider>(null);
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings} className="relative left-24">
        {data.map((item, index) => (
          <div key={index} className="inline-block relative">
            <div className="mb-5">
              {numbers.includes(index) && (
                <span className="absolute text-5xl text-black -top-9">
                  {index + 1}
                </span>
              )}
            </div>
            <Card {...item} />
          </div>
        ))}
      </Slider>
      <div className="absolute left-0 bottom-60">
        <SamplePrevArrow
          onClick={() => {
            if (!sliderRef.current) return;

            sliderRef.current.slickPrev();
          }}
        />
      </div>
      <div className="absolute right-0 bottom-60">
        <SampleNextArrow
          onClick={() => {
            if (!sliderRef.current) return;

            sliderRef.current.slickNext();
          }}
        />
      </div>
    </div>
  );
}

function SampleNextArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="relative"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px",
        background: "black",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        transition: "background 0.3s ease",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props: { onClick: () => void }) {
  const { onClick } = props;
  return (
    <div
      className="relative"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50px",
        height: "50px",
        background: "black",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        transition: "background 0.3s ease",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
      </svg>
    </div>
  );
}
