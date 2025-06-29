import { fetchSheetData } from "../services/sheet";
import { reply } from "../services/telegram";
import { Env } from "../types";

export interface PengeluaranItem {
    kegiatan: string;
    kategori: string;
    pengeluaran: number;
}

export interface KategoriRingkasan {
    nama: string;
    total: number;
    persen: number;
}

export interface RekapHariIniResponse {
    tanggal: string; // contoh: "29 Juni 2025"
    total: number;
    data: PengeluaranItem[];
    kategori: KategoriRingkasan[];
}


export async function handleRekapHariIni(chatId: string, keyword: string, env: Env) {

    // const res = await rekaphariini(chatId, keyword, env)
    const res = await fetchSheetData(keyword, null, env) as RekapHariIniResponse


    let message = `📊 *Rekap Pengeluaran Hari Ini*\n🗓️ ${res.tanggal}\n\n`;

    if (res.data.length === 0) {
        message += `Tidak ada pengeluaran yang tercatat hari ini. 👍`;
    } else {
        res.data.forEach((item, i) => {
            message += `${i + 1}. ${item.kegiatan} — ${item.kategori}: *Rp${item.pengeluaran.toLocaleString()}*\n`;
        });

        message += '\n*% Persentase harian*\n';


        res.kategori.forEach((item, i) => {
            message += `${item.nama} : *${item.persen}%* (Rp${item.total.toLocaleString()})\n`
        })


        message += `\n💰 *Total Pengeluaran:* Rp${res.total.toLocaleString()}`;
    }

    return reply(chatId, message, env)
}