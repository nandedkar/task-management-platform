import 'express-serve-static-core';
import { AuthenticatedUser } from "../modules/auth/types/authenticated-user.interface";

declare module 'express-serve-static-core' {
  interface Request {
    requestId?: string;
    auth?: AuthenticatedUser;
  }
}

export {};
