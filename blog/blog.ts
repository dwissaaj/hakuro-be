import { Hono } from "hono";
import { database, query } from "../mod.ts";

const blogFunction = {
  dbId: Deno.env.get("APPWRITE_DATABASEID") as string,
  collectionId: Deno.env.get("APPWRITE_COLLECTION_BLOGPOST") as string,
};

export const book = new Hono();
book.get("/", async (c) => {
  const name = await database.listDocuments(
    blogFunction.dbId,
    blogFunction.collectionId,
    [
      query.equal("isPublished", [true]),
      query.select(["$id", "title", "content", "snippet", "image", "tags"]),
    ],
  );
  return c.json({ message: name }, { status: 200 });
});

book.get("/:id", async (c) => {
  const params = c.req.param("id");

  try {
    const blogpost = await database.getDocument(
      blogFunction.dbId,
      blogFunction.collectionId,
      `${params}`,
    );
    if (blogpost) {
      return c.json(blogpost);
    }
  } catch (e: any) {
    console.log("Error at", e);

    return c.json({ message: e["message"] }, { status: e["code"] });
  }
});