import { Env, RekapHariIniResponse } from '../types';
import { reply } from './telegram';

export async function fetchSheetData(keyword: string, optional: any, env: Env) {
    const res = await fetch(env.WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword, optional: optional })
    });

    return res
}

export async function hitungTotalPengeluaran(chatId: string, keyword: string, env: Env): Promise<number> {
    const now = new Date();
    const sheetName = now.toISOString().slice(0, 7); // yyyy-MM
    console.log("sheetname", sheetName);

    const res = await fetchSheetData(keyword, { sheetName }, env)

    if (!res.ok) {
        await reply(chatId, "gagal ambil data", env)
    }
    const data: { total: number } = await res.json();
    return data.total || 0;
}

export async function hitungTotalSetiapBulan(chatId: string, keyword: string, env: Env) {
    const res = await fetchSheetData(keyword, null, env)

    if (!res.ok) {
        await reply(chatId, "gagal ambil data", env)
    }

    const data: { hasil: { bulan: string, total: number }[] } = await res.json()
    return data
}

export async function rekaphariini(chatId: string, keyword: string, env: Env) {
    const res = await fetchSheetData(keyword, null, env)

    if (!res.ok) {
        await reply(chatId, "gagal ambil data", env)
    }



    const data: RekapHariIniResponse = await res.json()

    return data

}

export async function testerror(chatId: string, keyword: string, env: Env) {
    const res = false

    return res
}