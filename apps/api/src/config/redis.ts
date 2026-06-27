import { createClient } from 'redis';
import { env } from './env';

export const redisClient = createClient({
    // Use RESP2 for compatibility with older Redis servers that do not support HELLO.
    RESP: 2,
    socket: {
        host: env.redisHost,
        port: env.redisPort,
    },
});
