export type PostType = {
    id: number
    message: string
    likesCount: number
}
export interface KeyContactsType  {
    [key: string]: string
}
export interface ContactsType extends KeyContactsType{
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string|null
    large: string|null
}
export type ProfileType ={
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export type UserType = {
    id: number,
    photos: PhotosType,
    name: string,
    followed: boolean,
    status: string,
    location: LocationType
}
export type LocationType = {
    city: string,
    country: string
}