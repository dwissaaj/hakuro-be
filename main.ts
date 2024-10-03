import { Hono } from 'hono'
import { book } from "./blog.ts";

const app = new Hono().basePath('/api')
app.get('/', (c) => c.text('askdjasl'))
app.route('/blog',book)

Deno.serve(app.fetch)
