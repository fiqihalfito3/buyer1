import { fetchSheetData } from "../services/sheet";
import { reply } from "../services/telegram";
import { Env } from "../types";

export interface RekapBulanIniResponse {
    bulan: string; // contoh: "Juni 2025"
    total: number;
    jumlah: {
        [kategori: string]: number;
    };
    persentase: {
        [kategori: string]: number;
    };
}

export async function handleRekapBulanIni(chatId: string, keyword: string, env: Env) {

    const res = await fetchSheetData(keyword, null, env) as RekapBulanIniResponse


    const { bulan, total, jumlah, persentase } = res;

    const formatRupiah = (num: number) =>
        "Rp" + num.toLocaleString("id-ID");

    let pesan = `📆 Rekap Pengeluaran Bulan ${bulan}\n\n`;
    pesan += `💰 Total: ${formatRupiah(total)}\n\n`;
    pesan += `📊 Rincian per Kategori:\n`;

    for (const kategori of Object.keys(jumlah)) {
        const nominal = formatRupiah(jumlah[kategori]);
        const persen = persentase[kategori].toFixed(2).replace('.', ',');
        pesan += `- ${kategori}: ${nominal} (${persen}%)\n`;
    }

    return reply(chatId, pesan.trim(), env)

}