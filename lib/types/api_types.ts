export  interface APIresponse<E> {
    data: E | null,
    error: string | null,
    status: number,
}

export class APIerror extends Error {
    status: number;
    constructor(message: string, status: number)     {
        super(message);
        this.status = status;
    }
}