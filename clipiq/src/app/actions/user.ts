"use server";
import { currentUser } from "@clerk/nextjs/server";
import { stat } from "fs";

export const onAuthenticated = async () => {
    try{
        const user = await currentUser();
        if (!user) {
            return {status:403}
        }
    }catch (error) {
        console.error("Error fetching current user:", error);
        throw new Error("Failed to fetch current user");
    }
}

