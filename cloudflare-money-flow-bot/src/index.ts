import { TelegramBot } from "./bots/telegram.bot";
import { D1StorageService } from "./services/storage/d1.service";

const storageService = new D1StorageService();
const bot = new TelegramBot(storageService, TELEGRAM_BOT_TOKEN);

addEventListener("fetch", bot.webhookCallback());
