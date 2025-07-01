import { getStatuses } from "../services/status";
import { reply } from "../services/telegram";
import { Env } from "../types";


export async function handleStatusLihat(chatId: string, keyword: string, env: Env) {
    const statuses = await getStatuses(env)

    let message = `📃Berikut status yang terdaftar:\n\n`
    message += `${statuses}`

    return reply(chatId, message, env);
};