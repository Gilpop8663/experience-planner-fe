import { User } from "./user"; // User 인터페이스의 경로를 지정합니다.

export interface Campaign {
  id: number;
  title: string;
  user: User; // User 인터페이스와의 관계를 나타냅니다.
  platformName?: string;
  thumbnailUrl?: string;
  isReserved: boolean;
  reservationDate?: string; // nullable 필드는 선택적 프로퍼티로 정의합니다.
  reviewDeadline: string;
  serviceDetails?: string;
  serviceAmount?: number;
  extraAmount?: number;
  location?: string;
  detailedViewLink?: string;
}
