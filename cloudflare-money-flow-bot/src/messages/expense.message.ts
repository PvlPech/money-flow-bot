import { HearsContext, Context, InlineKeyboard, CallbackQueryContext } from "grammy";
import { Message } from "./message.class";
import { InlineKeyboardCallback } from "./inline.keyboard.callback";

export class ExpenseMessage extends Message {
    private readonly messageRegexp: RegExp = /^(\d*\.?\d*)\s+(.+)\s+(.*)$/;

    subCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => {
        return ctx.editMessageText("sub");
    }
    addCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => {
        return ctx.editMessageText("add");
    }
    cancelCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => {
        return ctx.deleteMessage();
    }

    getInlineKeyboardCallbacks(): InlineKeyboardCallback[] {
        return [ new InlineKeyboardCallback("sub", this.subCallback) 
                , new InlineKeyboardCallback("add", this.addCallback) 
                , new InlineKeyboardCallback("cancel", this.cancelCallback)]
    }
    getTriggerMessage(): string | RegExp {
        return this.messageRegexp;
    }
    getCallback(ctx: HearsContext<Context>): Promise<any> {  
        ctx.deleteMessage(); 
        return ctx.reply(ctx.message?.text ?? "undefined", {
            reply_markup: new InlineKeyboard()
                .text("-", "sub")
                .text("+", "add")
                .text("cancel", "cancel"),
          });
    }
}