import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";

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
  // Uses Web Crypto API (available in Node 18+ and Edge runtime)
  const encoder = new TextEncoder();

  // The hashed password is stored as "salt:hash"
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
      salt: hexToBuffer(salt),
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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  providers: [
    // Uncomment to enable Google OAuth:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   allowDangerousEmailAccountLinking: true,
    // }),

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

        const user = await db.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
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

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as
            | "HOMEOWNER"
            | "CONTRACTOR"
            | "VENDOR"
            | "INSPECTOR"
            | "ADMIN",
          phone: user.phone,
          state: user.state,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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
      // Allow relative URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl + "/dashboard";
    },
  },

  events: {
    async signIn({ user }) {
      // Update last login timestamp
      try {
        await db.user.update({
          where: { id: user.id },
          data: { updatedAt: new Date() },
        });
      } catch {
        // Non-critical, don't block sign in
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
