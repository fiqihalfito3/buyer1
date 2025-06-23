import { Env, UserState } from '../types';

export async function getState(chatId: string, env: Env): Promise<UserState> {
    const raw = await env.TELEGRAM_STATE.get(chatId);
    return raw ? JSON.parse(raw) : {};
}

export async function setState(chatId: string, state: UserState, env: Env): Promise<void> {
    await env.TELEGRAM_STATE.put(chatId, JSON.stringify(state));
}

export async function clearState(chatId: string, env: Env): Promise<void> {
    await env.TELEGRAM_STATE.delete(chatId);
}