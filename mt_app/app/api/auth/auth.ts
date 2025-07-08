// Your auth configuration file (auth.ts or similar)
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        try {
          // Fetch user info directly from Google API
          const response = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${account.access_token}`
          )
          const googleUser = await response.json()
          
          console.log("Google API Response:", googleUser)
          
          // Store the image URL
          token.picture = googleUser.picture
          token.name = googleUser.name
          token.email = googleUser.email
        } catch (error) {
          console.error("Error fetching Google user info:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.image = token.picture as string
      return session
    },
  },
})