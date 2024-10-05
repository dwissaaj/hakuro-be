import { Hono } from 'hono'
import { book } from "./blog/blog.ts";
import "jsr:@std/dotenv/load";
const app = new Hono().basePath('/api')
app.route('/blog',book)
console.log('Running Server🔥!!!')
Deno.serve(app.fetch)
