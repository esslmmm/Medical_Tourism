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
} from "../../../utils/database";
import { redirect } from "next/navigation";

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
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 5 * 60, // Update session every 5 minutes
  },
  jwt: {
    maxAge: 60 * 60, 
  },
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
            if (!existingUser.name || !existingUser.image) {
              await updateUserProfile({
                email: googleUser.email,
                name: googleUser.name,
                image: googleUser.picture,
              });
              existingUser = await findUserByEmail(googleUser.email);
            }
          } else {
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

          // Set session expiry for Google login (1 hour)
          const currentTimeSeconds = Math.floor(Date.now() / 1000);
          token.exp = currentTimeSeconds + (60 * 60); // 1 hour
          token.authMethod = "google";
          
        } catch (error) {
          console.error("Error fetching/updating Google user info:", error);
          const currentTimeSeconds = Math.floor(Date.now() / 1000);
          token.exp = currentTimeSeconds + (60 * 60); // 1 hour
          token.authMethod = "google";
        }
      } else if (user) {
        // OTP login flow
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.provider = "otp";
        
        // Set session expiry for OTP login (1 hour)
        const currentTimeSeconds = Math.floor(Date.now() / 1000);
        token.exp = currentTimeSeconds + (60 * 60); // 1 hour
        token.authMethod = "otp";
        
        console.log('🔑 OTP login expiry set:', {
          currentTimeSeconds,
          exp: token.exp,
          expDate: new Date(token.exp * 1000)
        });
      }

      // Ensure exp is always set with current time
      if (!token.exp) {
        const currentTimeSeconds = Math.floor(Date.now() / 1000);
        token.exp = currentTimeSeconds + (60 * 60); // Default 1 hour
        console.log('🔑 Default expiry set:', {
          currentTimeSeconds,
          exp: token.exp,
          expDate: new Date(token.exp * 1000)
        });
      }

      // Check if token needs refresh with proper threshold
      const currentTimeSeconds = Math.floor(Date.now() / 1000);
      const refreshThreshold = 10 * 60; // 10 minutes before expiry
      
      if (token.exp && (token.exp - currentTimeSeconds) < refreshThreshold) {
        console.log('🔄 Token needs refresh - less than 10 minutes remaining');
        if (token.provider === "google") {
          token.exp = currentTimeSeconds + (60 * 60); // Extend by 1 hour
          console.log('🔄 Google token refreshed:', {
            newExp: token.exp,
            newExpDate: new Date(token.exp * 1000)
          });
        }
        // Note: OTP users don't get automatic refresh - they need to login again
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
        
        const currentTimeSeconds = Math.floor(Date.now() / 1000);
        const expiry = token.exp || (currentTimeSeconds + (60 * 60));
        
        (session as any).authMethod = token.authMethod || 'unknown';
        (session as any).expiresAt = expiry * 1000; // Convert to milliseconds
        (session as any).timeLeft = expiry - currentTimeSeconds;
        
        // console.log('📊 Session callback triggered');
        // console.log('📊 Session data set:', {
        //   authMethod: token.authMethod,
        //   expiresAt: expiry * 1000,
        //   expiresAtDate: new Date(expiry * 1000),
        //   timeLeft: expiry - currentTimeSeconds,
        //   currentTime: new Date(),
        //   currentTimeSeconds: currentTimeSeconds,
        //   isExpired: (expiry - currentTimeSeconds) <= 0
        // });
      }
      
      return session;
    }
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});

// export async function requireAuth() {
//   const session = await auth()
//   if (!session?.user) {
//     redirect('/api/auth/signin')
//   }
//   return session.user
// }

// // You rarely need this if you remove IDs from URLs
// export async function requireOwnership(resourceUserId: string) {
//   const user = await requireAuth()
  
//   if (user.id !== resourceUserId && user.role !== 'admin') {
//     redirect('/unauthorized')
//   }
  
//   return user
// }
