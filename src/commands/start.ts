import { reply } from "../services/telegram";
import type { CommandHandler, Env } from "../types";

export async function handleStart(chatId: string, keyword: string, env: Env) {
    console.log("hitted start");
    return reply(chatId, "👋 Halo! Gunakan perintah /input untuk mulai mencatat pengeluaran.", env);
};