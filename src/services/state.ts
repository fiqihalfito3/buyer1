import { Env, StepState, InputState } from '../types';

export async function getState(chatId: string, env: Env) {
    const raw = await env.TELEGRAM_STATE.get(chatId);
    return raw ? JSON.parse(raw) : {};
}

export async function setState(chatId: string, state: StepState, env: Env): Promise<void> {
    await env.TELEGRAM_STATE.put(chatId, JSON.stringify(state));
}

export async function clearState(chatId: string, env: Env): Promise<void> {
    await env.TELEGRAM_STATE.delete(chatId);
}