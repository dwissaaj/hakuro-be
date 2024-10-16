import { Hono } from "hono";
import { database, query } from "../mod.ts";
import { ErrorAppwrite } from "../appwrite/ErrorAppwrite.ts";
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
  } catch (e) {
    const error = e as ErrorAppwrite;
    console.log("Error at fetch single Id", error);
    return c.json({ message: error.message }, { status: error.code });
  }
});
