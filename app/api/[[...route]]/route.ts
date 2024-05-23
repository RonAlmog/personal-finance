// index.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// without rpc
// app.route("/authors", authors);
// app.route("/books", books);
// app.route("/accounts", accounts);

// app.onError((err, c) => {
//   if (err instanceof HTTPException) {
//     return err.getResponse();
//   }

//   return c.json({ error: "Internal server error" }, 500);
// });

// with rpc
const routes = app
  .route("/authors", authors)
  .route("/books", books)
  .route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
