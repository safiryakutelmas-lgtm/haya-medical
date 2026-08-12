
import { neon } from '@neondatabase/serverless';

async function testConnection() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error('❌ HATA: .env.local dosyasında DATABASE_URL bulunamadı!');
    process.exit(1);
  }

  try {
    console.log('⏳ Neon veritabanına bağlanılıyor...');
    const sql = neon(dbUrl);
    const result = await sql`SELECT NOW() as current_time, version();`;
    
    console.log('✅ Bağlantı Başarılı!');
    console.log('📅 Veritabanı Saati:', result[0].current_time);
    console.log('🐘 PostgreSQL Sürümü:', result[0].version.split(' ')[0] + ' ' + result[0].version.split(' ')[1]);
  } catch (error) {
    console.error('❌ Bağlantı Başarısız!');
    console.error('Hata Detayı:', error.message);
  }
}

testConnection();