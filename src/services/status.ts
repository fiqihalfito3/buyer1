import { Env } from "../types";

export async function getStatuses(env: Env): Promise<string[]> {
    const raw = await env.TELEGRAM_STATE.get("statuses");
    return raw ? JSON.parse(raw) as string[] : [];
}