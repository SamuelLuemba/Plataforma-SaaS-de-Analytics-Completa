'use server'

import { z } from 'zod'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validated = registerSchema.safeParse({ name, email, password })

  if (!validated.success) {
    return { error: validated.error.errors[0].message }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email já cadastrado' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  redirect('/login?registered=true')
}