This is a [Next.js](https://nextjs.org) project created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Dependencies

- Node 20.18.1
- Postgres

## Running the project locally

First, install the dependencies and fill the .env file to run the development server with:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Database

Create a .env file and fill with the following keys:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
POSTGRES_URL_NON_POOLING=
SUPABASE_JWT_SECRET=
POSTGRES_USER=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
SUPABASE_SERVICE_ROLE_KEY=
POSTGRES_HOST=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Then, open [http://localhost:3000/seed](http://localhost:3000/seed) with your browser to create the database tables.

## Deployed on Vercel

Access this [link](https://nextjs-library-ten.vercel.app/) to see the last deployed version of this project on Vercel.
