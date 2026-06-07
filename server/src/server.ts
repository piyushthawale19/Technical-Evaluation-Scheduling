import { buildApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function main(): Promise<void> {
  await connectDatabase();
  const app = buildApp();
  app.listen(env.port, () => {
    console.log(`TutorFlow server listening on ${env.port}`);
  });
}

void main();
