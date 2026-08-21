export type UserRole = 'Freelancer' | 'Client';

export interface AuthUserPayload {
  id: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export {};
