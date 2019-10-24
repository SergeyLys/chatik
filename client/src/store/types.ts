export interface User {
    id: number;
    createdAt: string;
    updatedAt?: string;
    email: string;
    image?: string;
    firstName?: string;
    lastName?: string;
}

export interface Dialog {
    author: number;
    createdAt: string;
    id: number;
    partner: number;
    updatedAt: string;
}

export interface Message {
    id?: number;
    text: string,
    readed?: boolean,
    author: number,
    dialog: number
    createdAt?: string;
    updatedAt?: string;
}

export interface IError {
    status: number;
    message: string;
}