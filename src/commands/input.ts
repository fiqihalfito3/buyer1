import type { Env } from "../types";
import type { UserState } from "../types";
import { reply, sendInlineKeyboard } from "../services/telegram";
import { getState, setState, clearState } from "../services/state";
import { fetchSheetData } from "../services/sheet";

export async function handleInputCommand(chatId: string, keyword: string, env: Env) {
    const state: UserState = { step: 1 };
    await setState(chatId, state, env);
    return reply(chatId, "📝 Apa kegiatan hari ini?", env);
}

export async function handleInputStep(chatId: string, text: string, state: UserState, env: Env): Promise<Response> {
    if (state.step === 1) {
        state.kegiatan = text;
        state.step = 2;
        await setState(chatId, state, env);
        return sendInlineKeyboard(chatId, "📍 Pilih status kegiatan:", [
            [
                { text: "✅ Kewajiban", callback_data: "status:Kewajiban" },
                { text: "💚 Sedekah", callback_data: "status:Sedekah" }
            ],
            [
                { text: "🟨 Emas", callback_data: "status:Emas" },
                { text: "🌍 Duniawi", callback_data: "status:Duniawi" }
            ],
        ], env);
    }

    if (state.step === 3) {
        const amount = parseInt(text.replace(/[^\d]/g, ""), 10);
        if (isNaN(amount)) {
            return reply(chatId, "⚠️ Masukkan jumlah angka yang valid, contoh: 15000", env);
        }

        state.pengeluaran = amount;

        const payload = {
            kegiatan: state.kegiatan,
            status: state.status,
            tanggal: state.tanggal,
            pengeluaran: state.pengeluaran,
        };

        const res = await fetchSheetData("/input", { payload }, env)

        await clearState(chatId, env);

        const summary = `
        ✅ Data berhasil disimpan!

        📆 Tanggal: ${state.tanggal}
        📝 Kegiatan: ${state.kegiatan}
        📍 Status: ${state.status}
        💰 Pengeluaran: Rp${state.pengeluaran?.toLocaleString("id-ID")}
        `;

        return reply(chatId, res.ok ? summary : "❌ Gagal menyimpan data ke Sheet.", env);
    }

    return new Response("OK");
}

export async function handleInputCallback(chatId: string, data: string, env: Env): Promise<Response> {
    const state = await getState(chatId, env);

    if (data.startsWith("status:")) {
        state.status = data.split(":")[1];
        state.step = 3;
        state.tanggal = new Date().toISOString().split("T")[0];
        await setState(chatId, state, env);

        await reply(chatId, `Status: ${state.status}`, env);
        return reply(chatId, "💰 Berapa jumlah pengeluaran?", env);
    }

    return new Response("OK");
}
