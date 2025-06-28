import { rekaphariini } from "../services/sheet";
import { reply } from "../services/telegram";
import { Env } from "../types";

export async function handleRekapHariIni(chatId: string, keyword: string, env: Env) {

    const res = await rekaphariini(chatId, keyword, env)

    let message = `📊 *Rekap Pengeluaran Hari Ini*\n🗓️ ${res.tanggal}\n\n`;

    if (res.data.length === 0) {
        message += `Tidak ada pengeluaran yang tercatat hari ini. 👍`;
    } else {
        res.data.forEach((item, i) => {
            message += `${i + 1}. ${item.kegiatan} — ${item.kategori}: *Rp${item.pengeluaran.toLocaleString()}*\n`;
        });

        message += `\n💰 *Total Pengeluaran:* Rp${res.total.toLocaleString()}`;
    }

    return reply(chatId, message, env)
}