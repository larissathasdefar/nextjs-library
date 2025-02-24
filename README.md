This is a [Next.js](https://nextjs.org) project created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

[Preview this project here.](https://nextjs-library-ten.vercel.app/login)

## Dependencies

- Node 20.18.1
- Postgres

## Architecture

- Using App Router (/app instead of /pages)

  - So no, no `getServerSideProps` and similars

- `/actions` has the mutation data actions like creating, editing and deleting data
- `/admin/[YOUR-CRUD]`
  - `page.tsx` will render the page
  - `List[CRUD].tsx` has the data table for listing the data already in our database
  - `[CRUD]Form.tsx` has the form used for the creation and edition screens
  - `/create` or `/(update)/[id]` will have the same pattern:
    - First, we need to answer a question: **Will I need to load infos to fill the select inputs options?**
      - **YES**
        - `page.tsx` will be a server component that will load the info from the db
        - `Form.tsx` will call the [CRUD]Form.tsx and pass the props correctly to render the page
      - **NO**
        - `page.tsx` will call the [CRUD]Form.tsx and pass the props correctly to render the page
- `/components` have the custom components used in most screens
- `/queries` has the queries definitions
- `/seed` set the database
- `/theme` have the theme setup
- `/types` have all the types declarations

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
