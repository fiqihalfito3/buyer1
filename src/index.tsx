import { Hono } from 'hono';
import { handleTelegramUpdate } from './handlers/telegram';
import { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.render('Hello Cloudflare Workers!'))

app.post('/', async (c) => {
  const body = await c.req.json();
  console.log("hitted hono");

  return handleTelegramUpdate(body, c);
});

export default app;