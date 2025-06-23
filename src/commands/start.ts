import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleStart: CommandHandler = async (chatId, env) => {
    console.log("hitted /start");
    return reply(chatId, "👋 Halo! Gunakan perintah /input untuk mulai mencatat pengeluaran.", env);
};