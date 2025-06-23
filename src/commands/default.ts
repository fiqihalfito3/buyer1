import { reply } from "../services/telegram";
import type { CommandHandler, Env } from "../types";

export const handleDefault = async (chatId: string, env: Env) => {
    console.log("perintah tidak dikenali");

    return reply(chatId, "Perintah tidak dikenali. Ketik /input untuk mulai.", env);
};