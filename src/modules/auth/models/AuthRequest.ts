import { Administrator } from '@/domain/administrators/entity/administrator';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: Administrator;
}
