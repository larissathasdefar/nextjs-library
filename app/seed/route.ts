import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { users, genres, types, customers, books, loans } from "./data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      type TEXT CHECK (type IN ('employee', 'customer'))
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, type)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.type})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedGenres() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS genres (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedGenres = await Promise.all(
    genres.map(async (genre) => {
      return client.sql`
        INSERT INTO genres (id, name)
        VALUES (${genre.id}, ${genre.name})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedGenres;
}

async function seedBookTypes() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS book_types (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedTypes = await Promise.all(
    types.map(async (type) => {
      return client.sql`
        INSERT INTO book_types (id, name)
        VALUES (${type.id}, ${type.name})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedTypes;
}

async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      user_id UUID REFERENCES users (id)
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => client.sql`
        INSERT INTO customers (id, name, phone, address, user_id)
        VALUES (${customer.id}, ${customer.name}, ${customer.phone}, ${customer.address}, ${customer.user_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedCustomers;
}

async function seedBooks() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS books (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      publication_date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      genre_id UUID REFERENCES genres (id),
      type_id UUID REFERENCES book_types (id)
    );
  `;

  const insertedBooks = await Promise.all(
    books.map(
      (book) => client.sql`
        INSERT INTO books (title, author, publication_date, location, genre_id, type_id)
        VALUES (${book.title}, ${book.author}, ${book.publication_date}, ${book.location}, ${book.genre_id}, ${book.type_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedBooks;
}

async function seedLoans() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS loans (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      loan_date DATE NOT NULL,
      return_date DATE NOT NULL,
      status TEXT CHECK (status IN ('borrowed', 'returned')),
      book_id UUID REFERENCES books (id),
      customer_id UUID REFERENCES customers (id)
    );
  `;

  const insertedLoans = await Promise.all(
    loans.map(
      (loan) => client.sql`
        INSERT INTO loans (loan_date, return_date, status, book_id, customer_id)
        VALUES (${loan.loan_date}, ${loan.return_date}, ${loan.status}, ${loan.book_id}, ${loan.customer_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedLoans;
}

export async function GET() {
  return Response.json({
    message: "Comment this to create your database.",
  });

  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedGenres();
    await seedBookTypes();
    await seedCustomers();
    await seedBooks();
    await seedLoans();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
