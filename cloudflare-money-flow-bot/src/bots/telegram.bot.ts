import { Command } from "../commands/command.class";
import { StartCommand } from "../commands/start.command";
import { ExpenseMessage } from "../messages/expense.message";
import { IStorageService } from "../services/storage/storage.interface";
import { Bot, webhookCallback } from "grammy";
import { Message } from "../messages/message.class";

export class TelegramBot {

    bot: Bot;
    commands: Command[] = [];
    messages: Message[] = [];

    constructor(private readonly storageService: IStorageService, private readonly botToken: string) {
        this.bot = new Bot(botToken);   
        this.init();   
    }

    init() {
        this.initCommands();
        this.initMessages();
    }

    initCommands() {
        this.commands = [new StartCommand(this.bot)];
        for (const command of this.commands) {
            command.handle();
        }
    }

    initMessages() {
        this.messages = [new ExpenseMessage(this.bot)];
        for (const message of this.messages) {
            message.handle();
        }
    }

    webhookCallback(...args: any[]): any {
        return webhookCallback(this.bot, "cloudflare");
    }

}