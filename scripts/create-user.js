// Test script to create a user - run with: node scripts/create-user.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  const email = 'test@example.com'
  const password = 'password123'
  const name = 'Test User'

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('User already exists!')
      return
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

    console.log('Test user created successfully:')
    console.log(`Email: ${user.email}`)
    console.log(`Password: ${password}`)
    console.log(`Name: ${user.name}`)
  } catch (error) {
    console.error('Error creating user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()