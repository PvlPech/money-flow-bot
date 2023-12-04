import { Bot } from "grammy";
import { Command } from "./command.class";

export class StartCommand extends Command {

    constructor(bot: Bot) {
        super(bot);
    }

    handle(): void {
        this.bot.command("start", async (ctx) => {
            await ctx.reply("The Bot descriptiond to be done");
        });
    }
}