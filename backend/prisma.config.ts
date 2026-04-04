import "dotenv/config";
import { defineConfig } from "prisma/config";
// @ts-ignore
declare const process: any;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});