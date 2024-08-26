import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/MainPage/components/Card",
  component: Card,
  parameters: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: "냥토피아 건대점",
    reviewDeadline: "2024-08-24",
    serviceDetails:
      "제철 재료로 만든 우리 음식을 사계절 새롭게 선보이는 한식 컨셉의 레스토랑, 자연별곡!!",
    reservationDate: "2024-08-24 오후 2시 30분",
    detailedViewLink: "",
    location: "서울 송파구 충민로 66 (가든파이브라이프)",
  },
};
