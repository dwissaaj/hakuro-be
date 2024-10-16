import {
  Client,
  Databases,
  ID,
  Query,
} from "https://deno.land/x/appwrite/mod.ts";

let client: Client = new Client();

client
  .setEndpoint(`${Deno.env.get("APPWRITE_ENDPOINT")}`)
  .setProject(`${Deno.env.get("APPWRITE_PROJECT")}`)
  .setKey(`${Deno.env.get("APPWRITE_SETKEY")}`);

export const database = new Databases(client);
export const IDs = new ID();
export const query = Query;
