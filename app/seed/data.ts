// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Admin",
    email: "admin@admin.com",
    password: "123456",
    type: "employee",
  },
  {
    id: "7d761908-8854-45d7-8ce8-451a302aa0ef",
    name: "John Travolta",
    email: "john@jonnis.com",
    password: "123456",
    type: "customer",
  },
];

const genres = [
  {
    id: "a8a3d82d-85ed-4895-ba17-65451b119f6f",
    name: "Fiction",
  },
  {
    id: "0fedf1ad-46e1-4b58-879d-c81630ae1140",
    name: "Drama",
  },
  {
    id: "21703ca9-87cc-4ea2-8385-46c2e57851cd",
    name: "Romance",
  },
  {
    id: "a7d5baf1-3b7a-44f5-b46d-a2321f869d65",
    name: "Horror",
  },
  {
    id: "fb324de3-8b2c-414a-a36b-455d6ebe41bb",
    name: "Suspense",
  },
  {
    id: "b5d0c563-882b-4916-be4e-5fc32555211e",
    name: "Philosophy",
  },
];

const types = [
  {
    id: "00c8b105-25c1-47a3-90f5-5bc416b2a48a",
    name: "Book",
  },
  {
    id: "162d1a36-6365-4b7f-90b1-46d58c303fc4",
    name: "Magazine",
  },
  {
    id: "5eb41a30-05a0-442a-8abb-07d45ccfb614",
    name: "Comic",
  },
  {
    id: "739e6020-2fd0-494a-8b89-d60f628caa6a",
    name: "Article",
  },
  {
    id: "65f21d02-f02e-4272-a3c3-294983949f41",
    name: "Encyclopedia",
  },
];

const customers = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: users[1].name,
    phone: "book@bookbook.com",
    address: "1st Street, 123",
    user_id: users[1].id,
  },
];

const books = [
  {
    id: "12a602d1-0b91-455e-8d7a-f748e95bf873",
    title: "Estoicism",
    author: "Marco Aurélio",
    publication_date: "2022-10-21",
    location: "Corridor 25 Shelf 3",
    genre_id: genres[5].id,
    type_id: types[0].id,
  },
];

const loans = [
  {
    loan_date: "2024-12-06",
    return_date: "2024-12-13",
    status: "returned",
    book_id: books[0].id,
    customer_id: customers[0].id,
  },
];

export { users, genres, types, customers, books, loans };
