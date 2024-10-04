import { Context, Hono } from "hono";
import { database, IDs } from "../mod.ts";
import { ID } from "https://deno.land/x/appwrite@12.1.0/mod.ts";
import * as dateUtility from "jsr:@utility/date";
import { Blogposttype } from "./type.ts";


const blogFunction = {
  dbId: Deno.env.get('DENO_APPWRITE_DATABASEID') as string,
  collectionId: Deno.env.get('DENO_APPWRITE_COLLECTION_BLOGPOST') as string
}

export const book = new Hono()
book.get('/', async (c) => {
  const name = await database.listDocuments(
    blogFunction.dbId,
    blogFunction.collectionId,
  ) 

  console.log('Hit!!', name)
  return c.json({message : name}, {status: 200})
}
    
)
book.post('/', async (c) => {
  const data = await c.req.json()
  const typeData = data as Blogposttype
  const title = typeData.title
  console.log('data', title)
  try {
     const document = await database.createDocument(
      blogFunction.dbId,
      blogFunction.collectionId,
      ID.unique(),
      {
        title: data?.title
      }
      
    )
    if(document) {
      return c.text('Data Success Written')
    }
  }
  catch(e: unknown) {
    console.log('Error at blog', e)
    return c.json({message:'error'}, {status: 401})
  }
})

book.delete('/:documentId', async (c) => {
  const params = c.req.param('documentId')
  try {
    const response = await database.deleteDocument(
      blogFunction.dbId,
      blogFunction.collectionId,
      params
    )
  }
  catch(e: unknown) {
    console.log('Error at blog', e)
    return c.json({message:'error'}, {status: 401})
  }
})


// Single Document Retrieve

book.get('/:documentId', async (c) => {
  const params = c.req.param()
  try {
    const data = await database.getDocument(
      blogFunction.dbId,
      blogFunction.collectionId,
      `${params}`
    )
    if(data) {
      return c.json(data)
    }
  }
  catch(e: unknown) {
    console.log('Error at blog', e)
    return c.json({message:'error'}, {status: 401})
  }
 
})