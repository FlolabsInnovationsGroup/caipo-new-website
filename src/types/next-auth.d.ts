import 'next-auth'
import 'next-auth/jwt'

type UserRole = 'ADMIN'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    role: UserRole
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
  }
} 