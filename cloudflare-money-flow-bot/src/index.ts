import { TelegramBot } from "./bots/telegram.bot";
import { D1StorageService } from "./services/storage/d1.service";

const storageService = new D1StorageService();

export interface Env {
    DB: D1Database;
    TELEGRAM_BOT_TOKEN: string;
}

export default {
    async fetch(request: Request, env: Env) {
        const bot = new TelegramBot(storageService, env.TELEGRAM_BOT_TOKEN);
        return bot.processRequest(request);
    },
};
