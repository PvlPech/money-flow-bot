import { Bot, CommandContext, Context, HearsContext } from "grammy";
import { InlineKeyboardCallback } from "./inline.keyboard.callback";

export abstract class Message {
    constructor(public bot: Bot) { }

    handle(): void {
        this.bot.hears(this.getTriggerMessage(), async (ctx) => this.getCallback(ctx));
        
        for (const inlineKeyboardCallback of this.getInlineKeyboardCallbacks()) {
            this.bot.callbackQuery(inlineKeyboardCallback.callbackName, async (ctx) => inlineKeyboardCallback.callback(ctx));
        }
    } 

    abstract getInlineKeyboardCallbacks(): InlineKeyboardCallback[];
    abstract getTriggerMessage(): string | RegExp;
    abstract getCallback(ctx: HearsContext<Context>): Promise<any>;
}