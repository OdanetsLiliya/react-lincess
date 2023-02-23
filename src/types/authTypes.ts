export type UserType = {
    id: number;
    username: string | null;
    email: string;
    role: string;
};

export type UserSignUpType = {
    username: string | null;
    email: string;
    password: string | null;
    key: string | null;
};

export type UserSignUpResponseType = {
    id: number;
    username: string | null;
    email: string;
    password: string | null;
    role: string;
};

export type TokensType = {
    accessToken: string;
    refreshToken: string;
    accessExpiryDate: string;
};