// src/types/express/index.d.ts
import { AuthPayload } from '../../interfaces/auth';

declare global {
  namespace Express {
    export interface Request {
      user?: AuthPayload;
    }
  }
}
