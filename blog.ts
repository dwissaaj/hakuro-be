import { Context, Hono } from "hono";


export const book = new Hono()
book.get('/', (c) => 
    c.text('hai')
  )
book.get('/title/:name', (c: Context) => {
    const name = c.req.param('name')
    return c.text(`hai ${name}`)
  })
