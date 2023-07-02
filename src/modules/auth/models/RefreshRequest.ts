import { Administrator } from '@/domain/administrators/entity/administrator';
import { Request } from 'express';

export interface RefreshRequest extends Request {
  user: Administrator;
  refreshToken: string;
}
