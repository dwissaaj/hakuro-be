import { Hono } from "hono";
import { book } from "./blog/blog.ts";
import "jsr:@std/dotenv/load";
const app = new Hono().basePath("/api");
app.get("/", (c) => {
  return c.json({ message: "Hai running on home" }, { status: 200 });
});
app.route("/blog", book);
console.log("Running Server🔥!!!");
Deno.serve(app.fetch);
