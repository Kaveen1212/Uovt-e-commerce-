/**
 * Check Database Schema Script
 * This script checks the current schema of the users table
 */

const { Client } = require('pg');
require('dotenv').config();

async function checkSchema() {
  const client = new Client({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'root',
    database: process.env.POSTGRES_DB || 'e-commerce',
  });

  try {
    await client.connect();
    console.log('✅ Connected to database:', process.env.POSTGRES_DB || 'e-commerce');

    // Check if users table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ Users table does not exist!');
      console.log('The database should be empty. TypeORM will create tables on next restart.');
      return;
    }

    console.log('✅ Users table exists');

    // Get column information
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position;
    `);

    console.log('\n📋 Current users table schema:');
    console.log('─'.repeat(80));
    columns.rows.forEach(col => {
      console.log(`  ${col.column_name.padEnd(20)} | ${col.data_type.padEnd(20)} | Nullable: ${col.is_nullable}`);
    });
    console.log('─'.repeat(80));

    // Check if the old 'username' column exists
    const hasUsername = columns.rows.some(col => col.column_name === 'username');
    const hasEmail = columns.rows.some(col => col.column_name === 'email');
    const hasName = columns.rows.some(col => col.column_name === 'name');

    console.log('\n🔍 Schema Analysis:');
    if (hasUsername) {
      console.log('❌ OLD SCHEMA: Found "username" column (should be removed)');
    }
    if (hasEmail) {
      console.log('✅ NEW SCHEMA: Found "email" column');
    } else {
      console.log('❌ MISSING: "email" column not found');
    }
    if (hasName) {
      console.log('✅ NEW SCHEMA: Found "name" column');
    } else {
      console.log('❌ MISSING: "name" column not found');
    }

    if (hasUsername) {
      console.log('\n⚠️  ACTION REQUIRED: The old schema is still present!');
      console.log('   Run: node reset-database.js');
      console.log('   Then restart the backend server.');
    } else if (hasEmail && hasName) {
      console.log('\n✅ Schema is correct! You can now register users.');
    }

  } catch (error) {
    console.error('❌ Error checking schema:', error.message);
  } finally {
    await client.end();
  }
}

checkSchema();
