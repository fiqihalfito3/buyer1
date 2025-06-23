import { Hono } from 'hono';
import { handleTelegramUpdate } from './handlers/telegram';
import { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.post('/', async (c) => {
  const body = await c.req.json();
  return handleTelegramUpdate(body, c);
});

export default app;