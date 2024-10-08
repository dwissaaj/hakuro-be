import { Hono } from "hono";
import { database, query, } from "../mod.ts";



const blogFunction = {
  dbId: Deno.env.get('APPWRITE_DATABASEID') as string,
  collectionId: Deno.env.get('APPWRITE_COLLECTION_BLOGPOST') as string
}

export const book = new Hono()
book.get('/', async (c) => {
  
  const name = await database.listDocuments(
    blogFunction.dbId,
    blogFunction.collectionId,
    [
      query.equal("isPublished", [true]),
      query.select(["$id", "title", "content", "snippet", "image", "tags"])
    ]
  ) 
  return c.json({message : name}, {status: 200})
}    
)

book.get('/:id', async (c) => {
  const params = c.req.param('id')

  try {
      const blogpost = await database.getDocument(
        blogFunction.dbId,
        blogFunction.collectionId,
        `${params}`
      )
      if(blogpost) {
        return c.json(blogpost)
      }
  } catch (e) {
    console.log('Error at', e)
    return c.json({message: 'Error'}, {status: 401})
  }
  return c.text(params) 
})
// book.post('/image', async (c) => {
//   try {
//     const image = await storage
//   } catch (error) {
    
//   }
// })
// book.post('/', async (c) => {
//   const data = await c.req.json()
//   const typeData = data as Blogposttype
//   const title = typeData.title
//   const content = typeData.content
//   const image = typeData.image
//   const published = typeData.isPublished
//   const date = typeData.date
//   const tags = typeData.tags
//   const likes = typeData.likes
//   const comment = typeData.comment
//   console.log('data', title)
//   try {
//      const document = await database.createDocument(
//       blogFunction.dbId,
//       blogFunction.collectionId,
//       ID.unique(),
//       {
//         title: data?.title
//       }
    
//     )
//     if(document) {
//       return c.text('Data Success Written')
//     }
//   }
//   catch(e: unknown) {
//     console.log('Error at blog', e)
//     return c.json({message:'error'}, {status: 401})
//   }
// })

// book.delete('/:documentId', async (c) => {
//   const params = c.req.param('documentId')
//   try {
//     const response = await database.deleteDocument(
//       blogFunction.dbId,
//       blogFunction.collectionId,
//       params
//     )
//   }
//   catch(e: unknown) {
//     console.log('Error at blog', e)
//     return c.json({message:'error'}, {status: 401})
//   }
// })


// // Single Document Retrieve

// book.get('/:documentId', async (c) => {
//   const params = c.req.param()
//   try {
//     const data = await database.getDocument(
//       blogFunction.dbId,
//       blogFunction.collectionId,
//       `${params}`
//     )
//     if(data) {
//       return c.json(data)
//     }
//   }
//   catch(e: unknown) {
//     console.log('Error at blog', e)
//     return c.json({message:'error'}, {status: 401})
//   }
 
// })