// next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image: string;
      provider?: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image: string;
    name?: string | null;
    email?: string | null;
    provider?: string;
  }
}
