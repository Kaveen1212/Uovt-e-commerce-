/**
 * Force Database Reset Script
 * This script forcefully drops all tables and the database
 * Make sure your backend server is STOPPED before running this!
 */

const { Client } = require('pg');
require('dotenv').config();

async function forceReset() {
  const dbName = process.env.POSTGRES_DB || 'e-commerce';

  // First, connect to the e-commerce database to drop all tables
  console.log('🔨 Step 1: Dropping all tables...');
  const dbClient = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: dbName,
  });

  try {
    await dbClient.connect();

    // Drop all tables
    await dbClient.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);

    console.log('✅ All tables dropped successfully');
    await dbClient.end();
  } catch (error) {
    console.log('⚠️  Could not drop tables (database might not exist yet):', error.message);
    try {
      await dbClient.end();
    } catch (e) {}
  }

  // Now connect to postgres database to drop and recreate the entire database
  console.log('\n🔨 Step 2: Recreating database...');
  const pgClient = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: 'postgres',
  });

  try {
    await pgClient.connect();

    // Terminate existing connections
    console.log(`🔄 Terminating connections to "${dbName}"...`);
    await pgClient.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${dbName}'
        AND pid <> pg_backend_pid();
    `);

    // Drop database
    console.log(`🗑️  Dropping database "${dbName}"...`);
    await pgClient.query(`DROP DATABASE IF EXISTS "${dbName}";`);

    // Create database
    console.log(`🔨 Creating fresh database "${dbName}"...`);
    await pgClient.query(`CREATE DATABASE "${dbName}";`);

    console.log(`✅ Database "${dbName}" created successfully`);
    console.log('\n✨ Force reset complete!');
    console.log('\n⚠️  IMPORTANT: Your backend server MUST be stopped!');
    console.log('\nNext steps:');
    console.log('1. Make sure backend server is stopped');
    console.log('2. Start backend: cd backend && npm run start:dev');
    console.log('3. Wait for "Nest application successfully started"');
    console.log('4. Try registration again');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pgClient.end();
  }
}

forceReset();
