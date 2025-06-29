import { fetchSheetData } from "../services/sheet";
import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

interface RekapSetiapBulanResponse {
    hasil: {
        bulan: string,
        total: number
    }[]
}

export const handleLihatSetiapBulan: CommandHandler = async (chatId, keyword, env) => {

    // const data = await hitungTotalSetiapBulan(chatId, keyword, env);
    const res = await fetchSheetData(keyword, null, env) as RekapSetiapBulanResponse;

    // Message ===========================
    let pesan = "📊 *Rekap Pengeluaran Bulanan*\n\n";

    if (res.hasil.length > 0) {
        for (const item of res.hasil) {
            pesan += `🗓️ ${item.bulan}: *Rp ${item.total.toLocaleString("id-ID")}*\n`;
        }
    } else {
        pesan += '🍃 belum ada pengeluaran apa pun.'
    }


    pesan += `\n✅ Data berhasil diproses.`;
    // End Message ===========================

    return reply(chatId, pesan, env);
};
