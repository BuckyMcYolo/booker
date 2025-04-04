import { betterAuth, type BetterAuthOptions } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
  admin,
  organization,
  apiKey,
  openAPI,
  emailOTP,
  bearer,
} from "better-auth/plugins"
import { db } from "@workspace/db"
// import { env } from "@workspace/env-config"

export const auth = betterAuth({
  appName: "Booker",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("User created", user)
        },
      },
    },
  },

  plugins: [
    admin(),
    apiKey(),
    openAPI(),
    organization(), //not currently working with typescript
    bearer(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
      },
    }),
  ],
})
