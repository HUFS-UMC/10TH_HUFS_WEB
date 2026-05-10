import type { CommonResponse } from "./common";
// 요청 타입
export type RequestSignupDto = {
  email: string;
  password: string;
};

export type RequestSigninDto = {
  email: string;
  password: string;
};

// 로그인 응답
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 회원가입 응답
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;