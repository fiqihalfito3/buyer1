import { Context } from 'hono';
import { CommandHandler, Env, TelegramMessage } from '../types';
import { getState } from '../services/state';
import { handleStart } from '../commands/start';
import { handleInputCommand, handleInputStep, handleInputCallback } from '../commands/input';
import { handleLihatBulanIni } from '../commands/lihatBulanIni';
import { handleDefault } from '../commands/default';
import { handleLihatSetiapBulan } from '../commands/lihatsetiapbulan';
import { handleRekapHariIni } from '../commands/rekaphariini';
import { handletesterror } from '../commands/testerror';
import { handleRekapBulanIni } from '../commands/rekapbulanini';

const commandMap: Record<string, CommandHandler> = {
    '/start': handleStart,
    '/input': handleInputCommand,
    '/totalbulanini': handleLihatBulanIni,
    '/rekapsetiapbulan': handleLihatSetiapBulan,
    '/rekaphariini': handleRekapHariIni,
    '/rekapbulanini': handleRekapBulanIni,
    // '/rekapkategorisetiapbulan'
    // '/pengeluaranterbesar'
    // '/listhariini'
    // '/persentasekategori'
    '/testerror': handletesterror
};

export async function handleTelegramUpdate(body: TelegramMessage, c: Context) {
    console.log("hitted telegram handler");

    const env = c.env;

    // Handle callback (inline keyboard)
    if (body.callback_query) {
        const chatId = body.callback_query.from.id.toString();
        const data = body.callback_query.data;
        return handleInputCallback(chatId, data, env); // delegasikan ke input.ts
    }

    console.log(JSON.stringify(body));

    // Handle message teks biasa
    if (body.message?.text) {
        const chatId = body.message.chat.id.toString();
        const text = body.message.text.trim();
        const state = await getState(chatId, env);

        // save chat id in whole code
        c.set("chatId", chatId)

        // Jika pesan adalah command dan terdaftar
        const commandHandler = commandMap[text.toLowerCase()];
        if (commandHandler) {
            return commandHandler(chatId, text.toLowerCase(), env);
        }

        // Jika sedang dalam proses input
        if (state?.step) {
            return handleInputStep(chatId, text, state, env); // delegasikan ke input.ts
        }

        return handleDefault(chatId, env); // fallback
    }

    return c.text('OK');
}
