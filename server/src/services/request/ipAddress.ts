import { Request } from "express";

// function to get the IP adress
const getIPaddress = (req: Request): string | undefined => {

    const forwarded = req.headers['x-forwarded-for'] as string;
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.connection.remoteAddress || req.socket.remoteAddress;
}

export default getIPaddress;