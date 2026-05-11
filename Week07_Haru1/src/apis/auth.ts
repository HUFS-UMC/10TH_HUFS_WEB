import type { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async(body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);

    return data;
};

export const postSignin = async(body: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post( "/v1/auth/signin", body);

    return data;
};

export const getMyInfo = async() : Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me");

    return data;
};

export const postLogout = async() => {
    const {data} = await axiosInstance.post('/v1/auth/signout');
    
    return data;
};
//내정보수정
export const patchMyInfo = async (body: {
    nickname?: string;
    bio?: string;
    profileImage?: string | null;
}): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.patch("/v1/users/me", body);
    return data;
};
//회원탈퇴
export const withdraw = async (): Promise<void> => {
    await axiosInstance.delete("/v1/users/me");
};