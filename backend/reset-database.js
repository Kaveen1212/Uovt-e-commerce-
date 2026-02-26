/**
 * Database Reset Script
 * This script drops and recreates the e-commerce database
 * Run this with: node reset-database.js
 */

const { Client } = require('pg');
require('dotenv').config();

async function resetDatabase() {
  // Connect to PostgreSQL (to the postgres database, not e-commerce)
  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: 'postgres', // Connect to default postgres database
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    const dbName = process.env.POSTGRES_DB || 'e-commerce';

    // Terminate existing connections to the database
    console.log(`🔄 Terminating existing connections to "${dbName}"...`);
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '${dbName}'
        AND pid <> pg_backend_pid();
    `);

    // Drop the database
    console.log(`🗑️  Dropping database "${dbName}"...`);
    await client.query(`DROP DATABASE IF EXISTS "${dbName}";`);
    console.log(`✅ Database "${dbName}" dropped successfully`);

    // Create the database
    console.log(`🔨 Creating database "${dbName}"...`);
    await client.query(`CREATE DATABASE "${dbName}";`);
    console.log(`✅ Database "${dbName}" created successfully`);

    console.log('\n✨ Database reset complete!');
    console.log('\nNext steps:');
    console.log('1. Stop your backend server (Ctrl+C)');
    console.log('2. Remove "dropSchema: true" from backend/src/app.module.ts');
    console.log('3. Start your backend server again: npm run start:dev');
    console.log('4. The new schema will be created automatically by TypeORM');

  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

resetDatabase();
