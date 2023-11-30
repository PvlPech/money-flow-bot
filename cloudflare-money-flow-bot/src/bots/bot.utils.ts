export class BotUtils {

    public static async getRequestBody(request: Request): Promise<string> {
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
}