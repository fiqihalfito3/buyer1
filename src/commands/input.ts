import type { Env, StepState } from "../types";
import type { InputState } from "../types";
import { reply, sendInlineKeyboard } from "../services/telegram";
import { getState, setState, clearState } from "../services/state";
import { fetchSheetData } from "../services/sheet";
import { getStatuses } from "../services/status";
import { getTanggalHariIniWIB } from "../lib/utils";

export async function initiateInputFlow(chatId: string, keyword: string, env: Env): Promise<Response> {
    const state: InputState = { step: 1, command: keyword };
    await setState(chatId, state, env);
    return reply(chatId, "📝 Apa kegiatan hari ini?", env);
}

export async function handleInputStep(chatId: string, text: string, state: InputState, env: Env): Promise<Response> {
    switch (state.step) {
        case 1:
            return handleInputStep1(chatId, text, state, env);
        case 3:
            return handleInputStep3(chatId, text, state, env);
        default:
            return new Response("Invalid step");
    }
}

// export async function handleInputStep(chatId: string, text: string, state: UserState, env: Env): Promise<Response> {

//     const statuses = await getStatuses(env)

//     if (state.step === 1) {
//         state.kegiatan = text;
//         state.step = 2;
//         await setState(chatId, state, env);
//         return sendInlineKeyboard(chatId, "📍 Pilih status kegiatan:",
//             //     [
//             //     // [
//             //     //     { text: "✅ Kewajiban", callback_data: "status:Kewajiban" },
//             //     //     { text: "💚 Sedekah", callback_data: "status:Sedekah" }
//             //     // ],
//             //     // [
//             //     //     { text: "🟨 Emas", callback_data: "status:Emas" },
//             //     //     { text: "🌍 Duniawi", callback_data: "status:Duniawi" }
//             //     // ],            
//             // ]
//             statuses.map((status, i) => {
//                 return [{ text: status, callback_data: `status:${status}` }]
//             })
//             , env);
//     }

//     if (state.step === 3) {
//         const amount = parseInt(text.replace(/[^\d]/g, ""), 10);
//         if (isNaN(amount)) {
//             return reply(chatId, "⚠️ Masukkan jumlah angka yang valid, contoh: 15000", env);
//         }

//         state.pengeluaran = amount;

//         const payload = {
//             kegiatan: state.kegiatan,
//             status: state.status,
//             tanggal: state.tanggal,
//             pengeluaran: state.pengeluaran,
//         };

//         const res: { success: boolean } = await fetchSheetData("/input", { payload }, env)

//         await clearState(chatId, env);

//         let summary = `✅ Data berhasil disimpan!\n\n`
//         summary += `📆 Tanggal: ${state.tanggal}\n`
//         summary += `📝 Kegiatan: ${state.kegiatan}\n`
//         summary += `📍 Status: ${state.status}\n`
//         summary += `💰 Pengeluaran: Rp${state.pengeluaran?.toLocaleString("id-ID")}`

//         return reply(chatId, res.success ? summary : "❌ Gagal menyimpan data ke Sheet.", env);
//     }

//     return new Response("OK");
// }

async function handleInputStep1(chatId: string, text: string, state: InputState, env: Env): Promise<Response> {
    const statuses = await getStatuses(env);

    state.kegiatan = text;
    state.step = 2;
    await setState(chatId, state, env);

    const statusButtons = statuses.map(status => [
        { text: status, callback_data: `status:${status}` }
    ]);

    return sendInlineKeyboard(chatId, "📍 Pilih status kegiatan:", statusButtons, env);
}

async function handleInputStep3(chatId: string, text: string, state: InputState, env: Env): Promise<Response> {
    const amount = parseInt(text.replace(/[^\d]/g, ""), 10);
    if (isNaN(amount)) {
        return reply(chatId, "⚠️ Masukkan jumlah angka yang valid, contoh: 15000", env);
    }

    const payload = {
        kegiatan: state.kegiatan,
        status: state.status,
        tanggal: state.tanggal,
        pengeluaran: amount,
    };

    const res: { success: boolean } = await fetchSheetData("/input", { payload }, env);
    await clearState(chatId, env);

    const summary = buildInputSummary(state, amount);
    return reply(chatId, res.success ? summary : "❌ Gagal menyimpan data ke Sheet.", env);
}

export async function handleInputCallback(chatId: string, data: string, state: InputState, env: Env): Promise<Response> {
    if (data.startsWith("status:")) {
        const status = data.split(":")[1];
        state.status = status;
        state.step = 3;
        state.tanggal = getTanggalHariIniWIB()
        await setState(chatId, state, env);

        await reply(chatId, `Status: ${status}`, env);
        return reply(chatId, "💰 Berapa jumlah pengeluaran?", env);
    }
    return new Response("OK");
}

function buildInputSummary(state: InputState, amount: number): string {
    let summary = `✅ Data berhasil disimpan!\n\n`;
    summary += `📆 Tanggal: ${state.tanggal}\n`;
    summary += `📝 Kegiatan: ${state.kegiatan}\n`;
    summary += `📍 Status: ${state.status}\n`;
    summary += `💰 Pengeluaran: Rp${amount.toLocaleString("id-ID")}`;
    return summary;
}
