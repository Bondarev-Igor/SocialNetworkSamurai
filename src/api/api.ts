import axios from "axios";
import {ProfileType} from "../components/Profile/ProfileContainer";

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
            `follow/${userId}`,{})
    },
    unfollow(userId: number) {
        return instance.delete<any>(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/`+userId)
    },
}

export const authAPI = {
    me () {
        return instance.get<any>(`auth/me`)
    }
}


