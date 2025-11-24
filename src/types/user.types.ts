import type { PageResponse } from "@/types/common.types";

export interface Role {
    roleName: 'ADMIN' | 'USER';
    description: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null | undefined;
    role: Role;
    active?: boolean;
    createdAt?: string;
}

export type UserStatus = 'ACTIVE' | 'LOCKED';


export type UserPageResponse = PageResponse<User>;
