// index.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// without rpc
// app.route("/authors", authors);
// app.route("/books", books);
// app.route("/accounts", accounts);

// with rpc
const routes = app
  .route("/authors", authors)
  .route("/books", books)
  .route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
