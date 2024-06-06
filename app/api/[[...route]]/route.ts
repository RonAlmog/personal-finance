// index.ts
import { Hono } from "hono";
import { handle } from "hono/vercel";
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

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
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
