import { CallbackQueryContext, Context } from "grammy";

export class InlineKeyboardCallback {

    constructor(public callbackName: string
        , public callback: (ctx: CallbackQueryContext<Context>) => Promise<any>) {

    }
}