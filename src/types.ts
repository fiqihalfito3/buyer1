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

export type CommandHandler = (chatId: string, env: Env) => Promise<Response>;