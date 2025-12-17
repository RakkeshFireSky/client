'use server'
import User from "@/models/User";
import connectDB from "@/config/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
    try {
        const name = formData.get('name')
        const email = formData.get('email')

        if (!name || !email) {
            throw new Error('Name and email are required')
        }

        await connectDB()
        await User.create({ name, email })
        revalidatePath('/users')
    } catch (error) {
        console.log(error)
        throw new Error('Failed to create user')
    }
}