import { Command } from "../commands/command.class";
import { StartCommand } from "../commands/start.command";
import { IStorageService } from "../services/storage/storage.interface";
import { Bot, webhookCallback } from "grammy";

export class TelegramBot {

    bot: Bot;
    commands: Command[] = [];

    constructor(private readonly storageService: IStorageService, private readonly botToken: string) {
        this.bot = new Bot(botToken);   
        this.init();   
    }

    init() {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
    }

    webhookCallback(...args: any[]): any {
        return webhookCallback(this.bot, "cloudflare");
    }

}