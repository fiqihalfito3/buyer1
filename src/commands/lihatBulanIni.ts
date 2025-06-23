import { hitungTotalPengeluaran } from "../services/sheet";
import { reply } from "../services/telegram";
import type { CommandHandler } from "../types";

export const handleLihatBulanIni: CommandHandler = async (chatId, env) => {
    const now = new Date();
    const namaBulanTahun = now.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
    });

    const total = await hitungTotalPengeluaran(chatId, env);
    return reply(chatId, `💰 Total pengeluaran bulan ini *${namaBulanTahun}*: Rp${total.toLocaleString("id-ID")}`, env);
    // return reply(chatId, `💰 Total pengeluaran bulan ini tes dulu`, env);
};
