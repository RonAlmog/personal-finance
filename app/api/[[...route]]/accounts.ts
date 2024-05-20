// books.ts
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts);

    return c.json({ data });
  })

  .post("/", (c) => c.json("create account", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
