import { HearsContext, Context, InlineKeyboard, CallbackQueryContext } from "grammy";
import { Message } from "./message.class";
import { InlineKeyboardCallback } from "./utils/inline.keyboard.callback";
import { Expense } from "./utils/expense";

export class ExpenseMessage extends Message {
    private readonly expenseRegexp: RegExp = /^(\d*\.?\d*)\s+(\S+)\s*(\S*)$/;
    private readonly parsedExpenseRegexp: RegExp = /^Amount: "(\d*\.?\d*)", Category: "(\S+)", Description: "(\S*)"$/;

    private getExpense(chatId: number | undefined, messageId: number | undefined, text: string | undefined): Expense {
        const match = text?.match(this.parsedExpenseRegexp);   
        const expense: Expense = new Expense(chatId, messageId, parseFloat(match?.[1] ?? "0"),  match?.[2] ?? "undefined", match?.[3]);        
        console.log(`Expense object: ${JSON.stringify(expense)}`);
        return expense;            
    }

    subCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => {
        console.log("sub expense");
        const expense: Expense = this.getExpense(ctx.chat?.id, ctx.update.callback_query.message?.message_id, ctx.callbackQuery.message?.text);
        return ctx.editMessageText(ctx.callbackQuery.message?.text ?? "undefined");
    }
    addCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => { 
        console.log("add expense");
        const expense: Expense = this.getExpense(ctx.chat?.id, ctx.update.callback_query.message?.message_id, ctx.callbackQuery.message?.text);
        return ctx.editMessageText(ctx.callbackQuery.message?.text ?? "undefined");
    }
    cancelCallback = (ctx: CallbackQueryContext<Context>) : Promise<any> => {   
        console.log("cancel expense");     
        return ctx.deleteMessage();
    }

    getInlineKeyboardCallbacks(): InlineKeyboardCallback[] {
        return [ new InlineKeyboardCallback("sub", this.subCallback) 
                , new InlineKeyboardCallback("add", this.addCallback) 
                , new InlineKeyboardCallback("cancel", this.cancelCallback)]
    }
    getTriggerMessage(): string | RegExp {
        return this.expenseRegexp;
    }
    getCallback(ctx: HearsContext<Context>): Promise<any> { 
        ctx.deleteMessage(); 
        const match = (ctx.message?.text ?? "undefined").match(this.expenseRegexp);                                                                                           
        return ctx.reply(`Amount: "${parseFloat(match?.[1] ?? "0")}", Category: "${match?.[2]}", Description: "${match?.[3]}"`, {
            reply_markup: new InlineKeyboard()
                .text("-", "sub")
                .text("+", "add")
                .text("cancel", "cancel"),                
          });
    }
}