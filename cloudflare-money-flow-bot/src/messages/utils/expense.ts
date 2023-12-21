import { decode, encode } from "punycode";

export class Expense {
	constructor(
        public readonly chatId: number | undefined,
        public readonly messageId: number | undefined,
		public readonly amount: number,
		public readonly category: string,
		public readonly description: string | undefined,
	) {}
}
