import { CommandContext, Context } from "grammy";
import { Command } from "./command.class";

export class StartCommand extends Command {
    getCommand(): string {
        return "start";
    }
    getCallback(ctx: CommandContext<Context>): Promise<any> {
        return ctx.reply("The Bot descriptiond to be done");
    }

}