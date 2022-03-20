import { Request } from 'express';

export interface TokenData {
  email: string,
  iat: number,
}

export interface RequestEmail extends Request {
  email?: string;
}
