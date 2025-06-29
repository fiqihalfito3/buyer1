import { testerror } from "../services/sheet";
import { reply } from "../services/telegram";
import { Env } from "../types";

export async function handletesterror(chatId: string, keyword: string, env: Env) {
    const res = await testerror(chatId, keyword, env)

    if (!res) {
        throw new Error("test Error berhasil - data error");
    }

    throw new Error("test Error berhasil - data exist");
}