import { Request } from "express";

// function to get the IP address
const getIpAddressFN = (req: Request): string | undefined => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
        const ipArray = Array.isArray(xForwardedFor) ? xForwardedFor : xForwardedFor.split(',');
        return ipArray[0].trim();
    }
    return req.socket.remoteAddress;
}

export { getIpAddressFN }