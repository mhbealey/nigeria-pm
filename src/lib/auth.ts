import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: "HOMEOWNER" | "CONTRACTOR" | "VENDOR" | "INSPECTOR" | "ADMIN";
    phone: string | null;
    state: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "HOMEOWNER" | "CONTRACTOR" | "VENDOR" | "INSPECTOR" | "ADMIN";
      phone: string | null;
      state: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: "HOMEOWNER" | "CONTRACTOR" | "VENDOR" | "INSPECTOR" | "ADMIN";
    phone: string | null;
    state: string | null;
  }
}

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const [salt, storedHash] = hashedPassword.split(":");
  if (!salt || !storedHash) return false;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(plainPassword),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: hexToBuffer(salt) as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const derivedHash = bufferToHex(new Uint8Array(derivedBits));
  return derivedHash === storedHash;
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Demo users for development without database
const DEMO_USERS = [
  {
    id: "demo-1",
    email: "daniel@buildng.com",
    name: "Daniel Bealey",
    password: "demo:demo",
    role: "ADMIN" as const,
    phone: "+2348012345678",
    state: "Lagos",
  },
  {
    id: "demo-2",
    email: "chioma@buildng.com",
    name: "Chioma Okafor",
    password: "demo:demo",
    role: "HOMEOWNER" as const,
    phone: "+2348023456789",
    state: "Lagos",
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const email = credentials.email.toLowerCase().trim();

        // Try database first
        try {
          const { db } = await import("@/lib/db");
          if (db) {
            const user = await db.user.findUnique({
              where: { email },
              select: {
                id: true,
                email: true,
                name: true,
                password: true,
                role: true,
                phone: true,
                state: true,
              },
            });

            if (user?.password) {
              const isValid = await verifyPassword(
                credentials.password,
                user.password
              );
              if (isValid) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  role: user.role as any,
                  phone: user.phone,
                  state: user.state,
                };
              }
            }
          }
        } catch {
          // Database not available, fall through to demo users
        }

        // Demo mode: accept any email with password "demo"
        const demoUser = DEMO_USERS.find((u) => u.email === email);
        if (demoUser && credentials.password === "demo") {
          return {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
            role: demoUser.role,
            phone: demoUser.phone,
            state: demoUser.state,
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.name = user.name!;
        token.role = user.role;
        token.phone = user.phone;
        token.state = user.state;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        phone: token.phone,
        state: token.state,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "dev-secret-change-in-production",
  debug: process.env.NODE_ENV === "development",
};
