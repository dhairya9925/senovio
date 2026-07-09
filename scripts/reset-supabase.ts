import fs from "fs";
import { Pool } from "pg";
import { getPayload } from "payload";

for (const envFile of [".env", ".env.local"]) {
  if (fs.existsSync(envFile)) {
    process.loadEnvFile(envFile);
  }
}

const connectionString = process.env.DATABASE_URI;

if (!connectionString) {
  throw new Error("DATABASE_URI is required to reset Supabase.");
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("sslmode=require") ? undefined : { rejectUnauthorized: false },
});

async function resetSupabasePublicSchema() {
  console.log("Dropping Supabase public schema...");

  await pool.query(`
    drop schema if exists public cascade;
    create schema public;
    alter schema public owner to postgres;

    grant usage on schema public to postgres, anon, authenticated, service_role;
    grant all on schema public to postgres, anon, authenticated, service_role;

    alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
    alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;
    alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
  `);

  console.log("Public schema reset. Recreating Payload tables...");
}

async function main() {
  await resetSupabasePublicSchema();
  await pool.end();

  const { default: config } = await import("../payload.config");
  const payload = await getPayload({ config });
  await payload.destroy();

  console.log("Supabase reset complete. Payload tables were recreated from the current config.");
  process.exit(0);
}

main().catch(async (error: unknown) => {
  await pool.end().catch(() => undefined);
  console.error("Supabase reset failed:", error);
  process.exit(1);
});
