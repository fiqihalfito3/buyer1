import { clearState, setState } from "../services/state";
import { addStatuses } from "../services/status";
import { reply } from "../services/telegram";
import { Env, StatusState } from "../types";


export async function initiateStatusTambahFlow(chatId: string, keyword: string, env: Env): Promise<Response> {
    const state: StatusState = { step: 1, command: keyword };
    await setState(chatId, state, env);

    let message = "📝 Masukkan kategori dengan pisahkan pakai koma jika lebih dari satu.\n\n"

    message += `Contoh:\n`
    message += `Duniawi,Emas,Kewajiban,Sedekah`

    return reply(chatId, message, env);
}

export async function handleStatusTambahStep(chatId: string, text: string, state: StatusState, env: Env): Promise<Response> {
    switch (state.step) {
        case 1:
            return handleStatusTambahStep1(chatId, text, state, env);
        default:
            return new Response("Invalid step");
    }
}

async function handleStatusTambahStep1(chatId: string, text: string, state: StatusState, env: Env): Promise<Response> {
    const statuses = text.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0);

    if (statuses.length === 0) {
        return reply(chatId, "⚠️ Masukkan minimal satu kategori yang valid.", env);
    }

    // Process categories (save to database/sheet)
    // const result = await saveCategories(categories, env);
    try {
        await addStatuses(statuses, env)
    } catch (error) {
        throw new Error("Gagal menambahkan status baru");
    }

    await clearState(chatId, env);

    const summary = `✅ Kategori berhasil ditambahkan:\n${statuses.map(cat => `• ${cat}`).join('\n')}`;
    return reply(chatId, summary, env);
}