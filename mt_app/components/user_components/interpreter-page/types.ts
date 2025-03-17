export interface Interpreter {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    reviews: number;
    age?: number;
    deals?: number;
    experience?: string;
    country?: string;
    email?: string;
    bio?: string;
    languages?: { name: string; level: number }[];
    skills?: string[];
    education?: { institution: string; degree: string }[];
  }
  