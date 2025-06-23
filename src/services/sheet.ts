import { Env } from '../types';

export async function hitungTotalPengeluaran(env: Env): Promise<number> {
    const now = new Date();
    const sheetName = now.toISOString().slice(0, 7); // yyyy-MM

    const res = await fetch(env.WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheet: sheetName })
    });

    if (!res.ok) throw new Error('Gagal mengambil data dari Sheet.');
    const data: { total: number } = await res.json();
    return data.total || 0;
}