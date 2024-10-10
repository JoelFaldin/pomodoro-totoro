import axios from 'axios';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/new`, {
          user
        })
        return true
      } catch (error) {
        console.log("There was an error trying to save authjs user to the database.")
        return false
      }
    }
  }
});

export { handler as GET, handler as POST };
