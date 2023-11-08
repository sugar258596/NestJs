import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import type { Request, Response } from 'express';

export const User = (...args: string[]) => SetMetadata('user', args);
