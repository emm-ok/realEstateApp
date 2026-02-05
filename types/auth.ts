export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "agent" | "company_admin" | "admin";
    image?: string | null;
    phone?: string | null;
    location?: string | null;
    createdAt: string;
    updatedAt: string;
    googleId: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}