import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleDefault: CommandHandler = async (chatId, env) => {
    return reply(chatId, "Perintah tidak dikenali. Ketik /input untuk mulai.", env);
};