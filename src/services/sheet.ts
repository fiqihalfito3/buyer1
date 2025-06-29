import { Env } from '../types';

export async function fetchSheetData(keyword: string, optional: any, env: Env) {
    const res = await fetch(env.WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: keyword, optional: optional })
    });

    if (!res.ok) {
        throw new Error("Gagal mengambil data");
    }

    const data: any = await res.json()

    if ("error" in data) {
        throw new Error(data.error);
    }

    return data
}

export async function testerror(chatId: string, keyword: string, env: Env) {
    const res = false

    return res
}