import { hitungTotalPengeluaran, hitungTotalSetiapBulan } from "../services/sheet";
import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleLihatSetiapBulan: CommandHandler = async (chatId, keyword, env) => {

    const data = await hitungTotalSetiapBulan(chatId, keyword, env);

    // Message ===========================
    let pesan = "📊 *Rekap Pengeluaran Bulanan*\n\n";

    for (const item of data.hasil) {
        pesan += `🗓️ ${item.bulan}: *Rp ${item.total.toLocaleString("id-ID")}*\n`;
    }

    pesan += `\n✅ Data berhasil diproses.`;
    // End Message ===========================

    return reply(chatId, pesan, env);
};
