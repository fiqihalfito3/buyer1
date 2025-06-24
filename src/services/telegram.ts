import { Env } from '../types';

export async function reply(chatId: string, text: string, env: Env): Promise<Response> {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" })
    });
    return new Response('OK');
}

export async function sendInlineKeyboard(chatId: string, text: string, keyboard: any, env: Env): Promise<Response> {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            reply_markup: { inline_keyboard: keyboard },
        })
    });
    return new Response('OK');
}