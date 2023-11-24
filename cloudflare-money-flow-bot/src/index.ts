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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		request: Request,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		env: Env,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		ctx: ExecutionContext,
	): Promise<Response> {
		return processRequest(request);
	},
};

async function processErrorRequest(request: Request): Promise<Response> {
	return new Response(`${request.method} requests are not supported`, {
		headers: {
			"content-type": "application/text;charset=UTF-8",
		},
		status: 400,
	});
}

async function processPostRequest(request: Request): Promise<Response> {
	const body = JSON.parse(await readRequestBody(request));

	const answer = {
		method: "sendMessage",
		chat_id: body?.message?.chat?.id,
		reply_to_message_id: body?.message?.message_id,
		text: JSON.stringify(body?.message),
	};
	return new Response(JSON.stringify(answer), {
		headers: {
			"content-type": "application/json;charset=UTF-8",
		},
		status: 200,
	});
}

async function processRequest(request: Request): Promise<Response> {
	if (request.method !== "POST") {
		return processErrorRequest(request);
	} else {
		return processPostRequest(request);
	}
}

async function readRequestBody(request: Request): Promise<string> {
	console.log("Reading Request Body...");
	const { headers } = request;
	const contentType = headers.get("content-type") || "";
	let res: string;

	console.log(`Content Type: ${contentType}`);

	if (contentType.includes("application/json")) {
		res = JSON.stringify(await request.json());
	} else if (contentType.includes("application/text")) {
		res = await request.text();
	} else if (contentType.includes("text/html")) {
		res = await request.text();
	} else {
		const blob = await request.blob();
		res = await blob.text();
	}

	console.log(`Body: ${res}`);
	return res;
}

export default worker;
