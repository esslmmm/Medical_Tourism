// Your auth configuration file (auth.ts or similar)
// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           scope: "openid email profile",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account?.access_token) {
//         try {
//           // Fetch user info directly from Google API
//           const response = await fetch(
//             `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${account.access_token}`
//           )
//           const googleUser = await response.json()
          
//           console.log("Google API Response:", googleUser)
          
//           // Store the image URL
//           token.picture = googleUser.picture
//           token.name = googleUser.name
//           token.email = googleUser.email
//         } catch (error) {
//           console.error("Error fetching Google user info:", error)
//         }
//       }
//       return token
//     },
//     async session({ session, token }) {
//       session.user.image = token.picture as string
//       return session
//     },
//   },
// })



import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import {
  findUserByEmail,
  updateUserVerification,
  createOrUpdateUser,
  updateUserProfile
} from "../../../utils/database"; // Adjust path as needed

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
    {
      id: "otp",
      name: "Email OTP",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials: any) {
        try {
          const { email, otp } = credentials || {};

          if (!email || !otp) return null;

          let user = await findUserByEmail(email);

          if (!user) {
            user = await createOrUpdateUser({
              email,
              name: null,
              image: null,
              otp: null,
              otpExpiry: null,
              isEmailVerified: false,
            });

            if (!user) {
              console.warn("Failed to create new user");
              return null;
            }
          }

          if (!user.otp || !user.otp_expiry) {
            console.warn("OTP or expiry not found for user.");
            return null;
          }

          const now = new Date();
          const expiry = new Date(user.otp_expiry);

          if (now > expiry) {
            console.warn("OTP expired");
            return null;
          }

          if (user.otp !== otp) {
            console.warn("Invalid OTP");
            return null;
          }

          // Clear OTP after successful verification
          await updateUserVerification(email, true);
          
          // Clear the OTP from database after successful verification
          await createOrUpdateUser({
            email: user.email,
            name: user.name,
            image: user.image,
            otp: null,
            otpExpiry: null,
            isEmailVerified: true,
          });
          console.log("Returning user:", user)

          return {
            id: String(user.id),
            email: user.email,
            name: user.name || email.split("@")[0],
            image: user.image || null,
          };
        } catch (error) {
          console.error("Error in authorize() for OTP:", error);
          return null;
        }
      },
    },
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "google" && account.access_token) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${account.access_token}`
          );
          const googleUser = await response.json();
          console.log("Google user info:", googleUser);
          token.picture = googleUser.picture;
          token.name = googleUser.name;
          token.email = googleUser.email;
          token.provider = "google";

          let existingUser = await findUserByEmail(googleUser.email);

          if (existingUser) {
            token.id = String(existingUser.id);
            // Update only if missing name or image
            if (!existingUser.name || !existingUser.image) {
              await updateUserProfile({
                email: googleUser.email,
                name: googleUser.name,
                image: googleUser.picture,
              });
              existingUser = await findUserByEmail(googleUser.email);
            }
          } else {
            // Create user without OTP fields, as Google users won't have OTP
            const newUser = await createOrUpdateUser({
              email: googleUser.email,
              name: googleUser.name,
              image: googleUser.picture,
              otp: null,
              otpExpiry: null,
              isEmailVerified: true,
            });
            token.id = String(newUser?.id);
          }
        } catch (error) {
          console.error("Error fetching/updating Google user info:", error);
        }
      } else if (user) {
        // OTP login flow: user object comes from authorize()
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.provider = "otp";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.provider = token.provider as string;
      }
      return session;
    }
  },

  pages: {
    signIn: "/auth/signin",
  },
  
  // Add these for better debugging
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
});
