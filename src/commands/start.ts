import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleStart: CommandHandler = async (chatId, env) => {
    return reply(chatId, "👋 Halo! Gunakan perintah /input untuk mulai mencatat pengeluaran.", env);
};