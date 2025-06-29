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


export interface PengeluaranItem {
    kegiatan: string;
    kategori: string; // atau bisa enum 'Duniawi' | 'Kewajiban' | 'Emas' | 'Sedekah' jika ingin ketat
    pengeluaran: number;
}

export interface RekapHariIniResponse {
    tanggal: string; // contoh: "29 Juni 2025"
    total: number;
    data: PengeluaranItem[];
    persentase: {
        [kategori: string]: number; // misal: { Duniawi: 54.32, Sedekah: 10.00, ... }
    };
}
