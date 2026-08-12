import { neon } from "@neondatabase/serverless";

// Fallback ("") sayesinde dosya içe aktarıldığında (import) build aşamasında çökmez.
// Gerçek veritabanı sorgusu atıldığı an canlı bağlantıyı kurar.
export const sql = neon(process.env.DATABASE_URL || "");