import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "7add98d9-734d-4189-972a-5d1bc689d34f"
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<any>(
            `users?page=${currentPage}&count=${pageSize}`,
        )
            .then(response => {
                return response.data
            });
    },
    follow(userId: number) {
        return instance.post<any>(
            `follow/${userId}`,{});
    },
    unfollow(userId: number) {
        return instance.delete<any>(`follow/${userId}`);
    },
    getProfile(userId: number) {
        console.warn('Please use profileAPI');
        return profileAPI.getProfile(userId);
    },
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/`+userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/`+userId);
    },
    updateStatus(status: string) {
        return instance.put (`profile/status/`, { status: status });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put (`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        } )
    },
    saveProfile(profile: ProfileType) {
        return instance.put (`profile/`, profile);
    },
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10,
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodeEnum | ResultCodesForCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}

export const authAPI = {
    me () {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login (email: string, password: string, rememberMe = false, captcha: string|null = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    logout () {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    }
}


