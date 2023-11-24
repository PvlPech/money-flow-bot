import worker from "../src/index";
import { test, expect } from "@jest/globals";

test("GET /", async () => {
	const result = await worker.fetch?.(
		new Request("http://falcon", { method: "GET" }),
		{ TELEGRAM_BOT_TOKEN: "TEST_TELEGRAM_BOT_TOKEN" },
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		{} as any,
	);
	expect(result?.status).toBe(400);

	const text = await result?.text();
	expect(text).toBe("GET requests are not supported");
});
