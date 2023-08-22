import { Message, User } from ".";

export interface UserState {
    freinds: User[] | undefined;
    me: User | undefined;
}

export interface AuthState {
    jwt_token: string | undefined;
    jwt_refresh: string | undefined;
    signed: false | boolean;
}

export interface MessageState {
    messages: Message[];
}