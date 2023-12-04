import { Bot, CommandContext, Context } from "grammy";

export abstract class Command {
    constructor(public bot: Bot) { }

    handle(): void {
        this.bot.command(this.getCommand(), async (ctx) => this.getCallback(ctx));
    }

    abstract getCommand(): string;
    abstract getCallback(ctx: CommandContext<Context>): Promise<any>;
}