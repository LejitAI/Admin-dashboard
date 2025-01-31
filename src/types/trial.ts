// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You can replace this logic with a database check or any other method
        if (
          credentials?.username === 'admin' &&
          credentials?.password === 'admin'
        ) {
          return { id: '1', name: 'Admin', email: 'admin@example.com' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
})
