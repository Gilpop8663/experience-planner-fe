export interface User {
  id: number;
  email: string;
  point: number;
  nickname: string;
  role: "ADMIN" | "USER";
}
