import { Hono } from 'hono';
import { handleTelegramUpdate } from './handlers/telegram';
import { Env } from './types';
import { reply } from './services/telegram';
import { Variables } from 'hono/types';

const app = new Hono<{
  Bindings: Env,
  Variables: {
    "chatId": string
  }
}>();

app.get('/', (c) => c.render('Hello Cloudflare Workers!'))

app.post('/', async (c) => {
  const body = await c.req.json();
  console.log("hitted hono");

  return handleTelegramUpdate(body, c);
});

app.post('testerror', async (c) => {
  const body = await c.req.json();
  const chatId = body.chatId ?? "dummy"
  c.set("chatId", chatId)
  throw new Error("Test Error Success");
})

app.onError(async (err, c) => {
  const chatId = c.get("chatId")

  await reply(chatId, err.message, c.env)

  // not working below because reply return responds
  return c.json({
    chatId: chatId,
    error: err.message
  })
})

export default app;