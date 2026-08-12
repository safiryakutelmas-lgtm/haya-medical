import { neon } from "@neondatabase/serverless";

// neon() boş string kabul etmez. 
// Derleme (build) anı için sembolik bir URL veriyoruz.
// Canlıda gerçek sorgu atıldığında Vercel'deki DATABASE_URL kullanılır.
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export const sql = neon(connectionString);