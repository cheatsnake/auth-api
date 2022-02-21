export enum Roles {
    USER = 1,
    ADMIN,
}

export interface TokenPayload {
    id: number;
    email: string;
    isActivated: boolean;
    role: Roles;
}
