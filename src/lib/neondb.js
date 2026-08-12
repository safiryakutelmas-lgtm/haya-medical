import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined. Please set it in your environment.");
  }
  return databaseUrl;
}

export function getSql() {
  return neon(getDatabaseUrl());
}

export const sql = getSql();
