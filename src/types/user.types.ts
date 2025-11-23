// src/types/user.types.ts
export interface Role {
    roleName: 'ADMIN' | 'USER';
    description: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar: string | null;
    role: Role;
    active?: boolean;
    createdAt?: string;
}

export type UserStatus = 'ACTIVE' | 'LOCKED';

export interface UserListResponse {
    code: number;
    message: string;
    result: User[];
    totalPages: number;
    totalElements: number;
}