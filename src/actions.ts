"use server";

import { PrismaClient } from "@prisma/client"

import { User } from "@prisma/client"

import path from "path"

const prisma = new PrismaClient();
type formState = { 
    message: string;
    type: string;
}


//Recupera o usuário pelo email

export async function getUserByEmail( 
    email: string | null
): Promise<User | null> {
    if (!email) return null;


    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });

    return user;
}

export async function updateUserProfile(
    formState: FormState,
    formData: FormData
): Promise<formState> {
    return {
        message: "Perfil atualizado com sucesso",
        type: "success"
    };
}