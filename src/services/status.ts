import { Env } from "../types";

export async function getStatuses(env: Env): Promise<string[]> {
    const raw = await env.TELEGRAM_STATE.get("statuses");
    return raw ? JSON.parse(raw) as string[] : [];
}

export async function addStatuses(statuses: string[], env: Env) {
    // const arrayStatuses = statuses.split(",").map(item => item.trim());
    await env.TELEGRAM_STATE.put("statuses", JSON.stringify(statuses));
}