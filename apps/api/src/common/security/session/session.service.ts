import { randomUUID } from 'crypto';

export class SessionService {
  createSessionId(): string {
    return randomUUID();
  }
}
