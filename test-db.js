(async () => {
  try {
    const { sql } = await import("./src/lib/neondb.js");

    const result = await sql`SELECT 1 AS connected`;

    console.log("Database connection successful.");
    console.log("Result:", result);
    process.exit(0);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();
