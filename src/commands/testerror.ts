import { testerror } from "../services/sheet";
import { reply } from "../services/telegram";
import { Env } from "../types";

export async function handletesterror(chatId: string, keyword: string, env: Env) {
    const res = testerror

    if (!res) {
        throw new Error("test Error berhasil - data error");
    }

    return reply(chatId, "Test error - data exist", env)
}