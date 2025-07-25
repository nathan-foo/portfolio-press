## Documentation

Portfolio Press is an agentic web builder designed to generate portfolio websites from resume PDFs. Made for both students and professionals, it highlights key achievements, projects, and skills with sleek, responsive layouts. No coding required. Just upload your resume, customize your design with natural language, and launch a standout personal brand in minutes.

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

### Notes

- Tech stack inspired by Code With Antonio.
- Project idea inspired by Andrew W.