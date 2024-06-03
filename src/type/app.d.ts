import { string } from "joi";

export interface IRegister {
    username: string;
    password: string;
    email: string;
    fullname: string;
}

export type AuthMiddlewareData = {
    id: string;
}

export enum Estaus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface IProfile {
    bio? : string;
    avatar?: string;
    cover?: string;
    userId?: number;
}

export interface IThread {
    id?: number
    content?: string;
    userId: number;
    threadId?: number;
}

export interface IEditProfile {
    bio? : string;
    avatar?: string;
    cover?: string;
    username?: string;
    fullname?: string;
}