import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function createUser(email: string, password: string, name?: string) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name
    }
  })

  return { id: user.id, email: user.email, name: user.name }
}