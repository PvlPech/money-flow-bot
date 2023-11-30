import { TelegramBot } from "./bots/telegram.bot";
import { D1StorageService } from "./services/storage/d1.service";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
	TELEGRAM_BOT_TOKEN: string;
}

const worker = {
	async fetch(
		request: Request,
		env: Env,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		ctx: ExecutionContext,
	): Promise<Response> {
		const bot = new TelegramBot(new D1StorageService(), env.TELEGRAM_BOT_TOKEN);
		return bot.processRequest(request);
	},
};

export default worker;
