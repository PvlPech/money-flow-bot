import { IStorageService } from "../services/storage/storage.interface";
import { IBot } from "./bot.interface";
import { BotUtils } from "./bot.utils";

export class TelegramBot implements IBot {

    constructor(private readonly storageService: IStorageService, private readonly botToken: string) {          
    }

    async processRequest(request: Request): Promise<Response> {
        if (request.method !== "POST") {
            return this.processErrorRequest(request);
        } else {
            return this.processPostRequest(request);
        }
    }

    private async processErrorRequest(request: Request): Promise<Response> {
        return new Response(`${request.method} requests are not supported`, {
            headers: {
                "content-type": "application/text;charset=UTF-8",
            },
            status: 400,
        });
    }

    private async processPostRequest(request: Request): Promise<Response> {
        const body = JSON.parse(await BotUtils.getRequestBody(request));
        await this.deleteMessage(body?.message?.chat?.id, body?.message?.message_id);
    
        const answer = {
            // method: "editMessageText",
            method: "sendMessage",
            // method: "deleteMessage",
            chat_id: body?.message?.chat?.id,
            // message_id: body?.message?.message_id,
            // message_id: 36,
            // reply_to_message_id: body?.message?.message_id,
            // inline_message_id: body?.message?.message_id,
            text: body?.message?.text,
            reply_markup: this.getInlineKeyboard(),
        };
        return new Response(JSON.stringify(answer), {
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            status: 200,
        });
    }

    private async deleteMessage(chatId: string, messageId: string): Promise<Response> {
        return await fetch(
            `https://api.telegram.org/bot${this.botToken}/deleteMessage?chat_id=${chatId}&message_id=${messageId}`, {
            method: 'POST',
        });        
    }

    private getInlineKeyboard(): string {
        return JSON.stringify({
            inline_keyboard: [[
                { text: '+', callback_data: 'like' },
                { text: '-', callback_data: 'dislike' },
                { text: 'cancel', callback_data: 'dislike' }
            ]]
        });
    }

}