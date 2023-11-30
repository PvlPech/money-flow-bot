export interface IBot {
    processRequest(request: Request): Promise<Response>;    
}