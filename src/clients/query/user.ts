import db from "..";
import { user } from '@/types/user';

import { hashpassword } from "@/utils/hash_password";

const userauth = async ({ email, password }:any) => {
    console.log(email, password)
    try {
        const existingUser = await db.user.findUnique({
            where: { email }
        });
        console.log(existingUser);
        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid =  hashpassword(password as string) == existingUser.password as string;
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            createdAt: existingUser.createdAt,
            updatedAt: existingUser.updatedAt,
        };
    } catch (error) {
        throw new Error(`Authentication failed: ${(error as Error).message}`);
    }
};

const userinsert = async ({ email, password, username,level }: user) => {
    try {
        const hashedPassword = hashpassword(password as string);

        const newUser = await db.user.create({
            data: {
                email,
                password:hashedPassword,
                name: username as string,
                level:level as any
            }
        });

        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
    } catch (error) {
        throw new Error(`User insertion failed: ${(error as Error).message}`);
    }
};


const deleteuser = async ({ email }: user) => {
    try {
        const deletedUser = await db.user.delete({
            where: {
                email: email, 
            },
        });

        return deletedUser; 
    } catch (error) {
        throw new Error(`User deletion failed: ${(error as Error).message}`);
    }
};


export { userauth, userinsert,deleteuser };
