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

export interface Env {
    TELEGRAM_TOKEN: string;
    WEB_APP_URL: string;
    KV: KVNamespace;
}


export interface StepState {
    step: number;
    command: string;
}

export interface InputState extends StepState {
    kegiatan?: string;
    status?: string;
    tanggal?: string;
    pengeluaran?: number;
}

export interface StatusState extends StepState {
    statuses?: string
}

export interface StepCommandConfig {
    initiate: (chatId: string, keyword: string, env: Env) => Promise<Response>;
    handleStep: (chatId: string, text: string, state: StepState, env: Env) => Promise<Response>;
    handleCallback?: (chatId: string, data: string, state: StepState, env: Env) => Promise<Response>;
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
