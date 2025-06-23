import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleDefault: CommandHandler = async (chatId, env) => {
    console.log("perintah tidak dikenali");

    return reply(chatId, "Perintah tidak dikenali. Ketik /input untuk mulai.", env);
};