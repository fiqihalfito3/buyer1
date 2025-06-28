export interface TelegramMessage {
    message?: {
        chat: { id: number }
        text: string
    }
    callback_query?: {
        id: string
        from: { id: number }
        data: string
    }
}

export interface UserState {
    step?: number;
    kegiatan?: string;
    status?: string;
    tanggal?: string;
    pengeluaran?: number;
}

export interface Env {
    TELEGRAM_TOKEN: string;
    WEB_APP_URL: string;
    TELEGRAM_STATE: KVNamespace;
}

export type CommandHandlerParam = {
    chatId: string,
    keyword: string,
    env: Env
}
export type CommandHandler = (chatId: string, keyword: string, env: Env) => any;


export type Kategori = 'Duniawi' | 'Kewajiban' | 'Emas' | 'Sedekah';

export interface PengeluaranItem {
    kegiatan: string;
    kategori: Kategori;
    pengeluaran: number;
}

export interface RekapHariIniResponse {
    tanggal: string; // contoh: "28 Juni 2025"
    total: number;
    data: PengeluaranItem[];
}