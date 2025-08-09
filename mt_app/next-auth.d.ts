// next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      provider: string;
      role: string;
    };
    exp: number;
    expires: Date;
    authMethod: string;
    timeLeft: number;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    picture: string;
    provider: string;
    authMethod: string;
    role: string;
    exp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image: string;
    name?: string | null;
    email?: string | null;
    provider?: string;
    role?: string;
  }
}


