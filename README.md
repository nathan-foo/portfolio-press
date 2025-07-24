## Documentation

### Startup commands:

- npm run dev
- npx inngest-cli@latest dev

### Prisma database management commands:
- npx prisma migrate reset
- npx prisma migrate dev
- npx prisma studio

### Required .env variables:

- DATABASE_URL
- NEXT_PUBLIC_APP_URL

- OPENAI_API_KEY
- GEMINI_API_KEY

- E2B_API_KEY

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY

- NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
- NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

- NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/"
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/"

- UPLOADTHING_TOKEN