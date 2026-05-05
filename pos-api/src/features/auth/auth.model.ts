import { Role } from "../../../generated/prisma/enums";

export type RegisterUserRequest = {
    name: string; 
    email: string; 
    password: string; 
    role?: Role
}

export type LoginUserRequest = {
    email: string; 
    password: string;
}