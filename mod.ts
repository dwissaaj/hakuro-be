import { Client, Databases,ID } from "https://deno.land/x/appwrite/mod.ts";

let client: Client = new Client();

client
    .setEndpoint(`${Deno.env.get('DENO_APPWRITE_ENDPOINT')}`)
    .setProject(`${Deno.env.get('DENO_APPWRITE_PROJECT')}`) 
    .setKey(`${Deno.env.get('DENO_APPWRITE_SETKEY')}`) 
    
;
export const database = new Databases(client)

export const IDs = new ID()