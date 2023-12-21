import { Bot, Context, HearsContext } from "grammy";
import { InlineKeyboardCallback } from "./utils/inline.keyboard.callback";
import { IStorageService } from "../services/storage/storage.interface";

export abstract class Message {
	constructor(
		protected readonly bot: Bot,
		protected readonly storageService: IStorageService,
	) {}

	handle(): void {
		this.bot.hears(this.getTriggerMessage(), async (ctx) =>
			this.getCallback(ctx),
		);

		for (const inlineKeyboardCallback of this.getInlineKeyboardCallbacks()) {
			this.bot.callbackQuery(inlineKeyboardCallback.callbackName, async (ctx) =>
				inlineKeyboardCallback.callback(ctx),
			);
		}
	}

	abstract getInlineKeyboardCallbacks(): InlineKeyboardCallback[];
	abstract getTriggerMessage(): string | RegExp;
	abstract getCallback(ctx: HearsContext<Context>): Promise<any>;
}
